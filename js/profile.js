
// CHECKOUT LOGIN
if (localStorage.getItem('accessToken') === null) {
    alert('Bạn không có quyền truy cập vào trang này')
    window.location.replace('index.html')
} else {
}

// GET POSTS 
let token = localStorage.getItem('accessToken');
const getPosts = async (token, page) => {
    let urlGet = `http://38.242.142.81:5001/posts?page=${page}`;
    let respone = await fetch(urlGet, {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: `Bearer ${JSON.parse(token)}` }
    })
    let data = await respone.json();
    return data
}


// PAGINATION

getPosts(token, 1).then(data => {
    console.log(data)
    let arrData = [...data.posts]

    var current_page = 1;
    let rows = 10;
    let total_page = data.total_page
    const pagination_element = document.getElementById('pagination');
    var table = document.getElementById('table-body')


    function buildTable(data) {
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].description}</td>
                        <td>${data[i].tags.toString()}</td>
                        <td>
                            <button><i class="fa fa-edit"></i></button>
                            <button onclick='delPosts(${JSON.stringify(data[i].id)})'><i class="fa fa-trash"></i></button>
                        </td>
					  </tr>`
            console.log(data[i].id)
            table.innerHTML += row
        }
    }

    function SetupPagination(page, wrapper) {
        wrapper.innerHTML = "";
        for (let i = 1; i < page + 1; i++) {
            let btn = PaginationButton(i, page);
            wrapper.appendChild(btn);
        }
    }

    function PaginationButton(page) {
        let button = document.createElement('button');
        button.innerText = page;
        if (current_page == page) button.classList.add('active');
        button.addEventListener('click', function () {
            getPosts(token, page).then(data => {
                arrData = [...data.posts];
                console.log(data)
                $('#table-body').empty();
                buildTable(arrData)
                let current_btn = document.querySelector('.pagenumbers button.active');
                current_btn.classList.remove('active');
                button.classList.add('active');
            });
        });

        return button;
    }

    buildTable(arrData)
    SetupPagination(total_page, pagination_element);
}
).catch(error => {
    console.log('request failed', error)
}
);;





// LOGOUT
const logOut = async () => {
    let token = localStorage.getItem('accessToken');
    console.log(token)
    let urlDelToken = 'http://38.242.142.81:5001/auth/logout';
    await fetch(urlDelToken, {
        method: 'DELETE',
        headers: { accept: '*/*', Authorization: `Bearer ${JSON.parse(token)}` }
    })
        .then(resp => resp.json())
        .then(json => {
            console.log('Success:', JSON.stringify(json))
            localStorage.removeItem('accessToken')
            window.location.replace('index.html')
        }
        ).catch(error => console.error('Error:', error))

}


// DELETE POST

const delPosts = async (id) => {
    let token = localStorage.getItem('accessToken');
    let urlDelPosts = `http://38.242.142.81:5001/posts/${id}`;
    let respone = await fetch(urlDelPosts, {
        method: 'DELETE',
        headers: { accept: 'application/json, text/plain, */*', Authorization: `Bearer ${JSON.parse(token)}` }
    })
        .then(json => {
            console.log('Success:', JSON.stringify(json))
            window.location.reload()
        }
        ).catch(error => console.error('Error:', error))
}


// MODAL