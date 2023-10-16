const inputUsername = document.getElementById('input-username')
const inputEmail = document.getElementById('input-email')

const btnForm = document.getElementById('btn-form')

async function completeFills() {
    const user = await axios.get('/api/infouser')
    console.log('frontend dio', user.data);
    
    const reName = inputUsername.value = user.data.name
    const reEmail = inputEmail.value = user.data.email
}

completeFills()

btnForm.addEventListener('click', async () => {
    const inputUser = inputUsername.value
    const inputMail = inputEmail.value
    const inputs = {
        name: inputUser,
        email: inputMail
    }
    console.log(inputUser);
    console.log(inputMail);
    const updateData = await axios.patch('/api/infouser', inputs);
    console.log('data me dio en front', updateData);
});
