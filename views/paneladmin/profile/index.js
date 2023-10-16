const inputUsername = document.getElementById('input-username')
const inputEmail = document.getElementById('input-email')

async function completeFills() {
    const user = await axios.get('/api/infouser')
    console.log('frontend dio', user.data);
    
    const reName = inputUsername.value = user.data.name
    const reEmail = inputEmail.value = user.data.email
}

completeFills()