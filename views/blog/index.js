const btnSignup = document.getElementById('btn-signup')
const btnHome = document.getElementById('btn-home')
const btnLogin = document.getElementById('btn-login')

btnHome.addEventListener('click', () => {
    window.location.pathname = '/';
  })

btnLogin.addEventListener('click', () => {
    window.location.pathname = '/login';
  })

btnSignup.addEventListener('click', () => {
    window.location.pathname = '/signup';
  })