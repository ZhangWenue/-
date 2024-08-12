const token = localStorage.getItem('token')
if(!token) {
    location.href = '../login/index'
}

axios({
    url: '/v1_0/user/profile'
}).then((result) => {
    const username = result.data.name
    document.querySelector('.nick-name').innerHTML = username
}).catch((err) => {
    
});