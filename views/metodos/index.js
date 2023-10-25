async function logedUser() {
    const modal = document.getElementById('modal-login')
    try {
        const user = await axios.get('/api/infouser/user');
        console.log('userda', user);
    } catch (error) {
        if (error.response.data === 'Unauthorized') {
            modal.classList.remove('nonee');
            modal.classList.add('d-flex')
        }
    }
}

logedUser();