// SLIDE SHOW
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {

    let slides = document.querySelectorAll(".carousel-item");
    let slidesArr = Array.from(slides);
    let dots = document.querySelectorAll(".dot");
    let dotArr = Array.from(dots);

    if (n > slidesArr.length) {
        slideIndex = 1;
    }
    else if (n < 1) {
        slideIndex = slidesArr.length;
    }

    slidesArr.map(el => el.style.display = "none");
    dotArr.map(el => el.className = el.className.replace(" active_dot", ""));
    slidesArr[slideIndex - 1].style.display = "flex";
    dotArr[slideIndex - 1].className += " active_dot";
}

// LOGIN SUCCESS

if (localStorage.getItem('accessToken') === null) {
    document.querySelector('#sign-in').style.display = 'inline';
    document.querySelector('#log-out').style.display = 'none';
    document.querySelector('#profile').style.display = 'none';
} else {
    document.querySelector('#sign-in').style.display = 'none';
    document.querySelector('#log-out').style.display = 'inline';
    document.querySelector('#profile').style.display = 'inline';
}


// LOGOUT
const logOut = async () => {
    event.preventDefault();
    let token = localStorage.getItem('accessToken');
    console.log(token)
    let urlDel = 'http://38.242.142.81:5001/auth/logout';
    await fetch(urlDel, {
        method: 'DELETE',
        headers: { accept: '*/*', Authorization: `Bearer ${JSON.parse(token)}` }
    })
        .then(resp => resp.json())
        .then(json => {
            console.log('Success:', JSON.stringify(json))
            localStorage.removeItem('accessToken')
            location.reload()
        }
        ).catch(error => console.error('Error:', error))

}

