const login = async () => {
    event.preventDefault();
    let userName = document.querySelector('#username').value;
    let url = 'http://38.242.142.81:5001/auth/login';
    console.log(userName)

    let response = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName }),
    }).then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
            console.log(response)
            localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
            window.location.replace('index.html')
        }
        )
        .catch(error => console.error('Error:', error))
}

