const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');
const spinner = document.querySelector('#spinner-container');
const button = document.getElementById('button-text');
//movernos entre paginas
const btnBlog = document.getElementById('btn-blog')
const btnHome = document.getElementById('btn-home')
const btnSignup = document.getElementById('btn-signup')

function spinnerShow() {
    button.innerHTML = '';
    spinner.style.display = 'flex';
  }

function spinnerHidden() {
    spinner.style.display = 'none';
    button.innerHTML = 'Iniciar sesion';
 }

 form.addEventListener('submit', async e => {
    e.preventDefault();
    spinnerShow();
    try {
      const user = {
        email: emailInput.value.toLowerCase(),
        password: passwordInput.value
      };
      const { data } = await axios.post('/api/login', user);
      if (data) {
        window.location.pathname = `/admin/`;
      } else {
        window.location.pathname = `/home/`;
      }
      // window.location.pathname = `/agenda/`;
    
      spinnerHidden();
    } catch (error) {
      console.log(error);
      errorText.innerHTML = error.response.data.error
      spinnerHidden();
    }
  });

btnHome.addEventListener('click', () => {
    window.location.pathname = '/';
  })

btnSignup.addEventListener('click', () => {
    window.location.pathname = '/signup';
  })

btnBlog.addEventListener('click', () => {
    window.location.pathname = '/blog';
  })