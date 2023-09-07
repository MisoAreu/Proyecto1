const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
// Obtén una referencia al elemento del spinner
const spinner = document.querySelector('#spinner-container');
const button = document.getElementById('button-text');

// Regex Validation
const NAME_VALIDATION = /^[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1\s]*)$/;
const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;

// Validations 
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

function spinnerShow() {
    button.innerHTML = '';
    spinner.style.display = 'flex';
  }
  
  function spinnerHidden() {
    spinner.style.display = 'none';
    button.innerHTML = 'Registrar';
  }

const validation = (input, regexValidation) => {
    formBtn.disabled = nameValidation && emailValidation && passwordValidation && matchValidation ? false : true;
    
    if (input.value === ''){
        input.classList.remove('input-incorrect');
        input.classList.remove('input-correct');
        input.classList.add('input-empty');
    } else if (regexValidation){
        input.classList.remove('input-incorrect');
        input.classList.remove('input-empty');
        input.classList.add('input-correct');
    } else if (!regexValidation) {
        input.classList.remove('input-empty');
        input.classList.remove('input-correct');
        input.classList.add('input-incorrect');
    }
};

// Events
nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation)
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation)
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation)
    validation(matchInput, matchValidation)
});

matchInput.addEventListener('input', e => {
    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation)
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    try {
       spinnerShow();
       const newUser = {
           name: nameInput.value, 
           email: emailInput.value.toLowerCase(),
           password: passwordInput.value,
        }
       const { data } = await axios.post('/api/users', newUser);
       nameInput.value = '';
       emailInput.value = '';
       passwordInput.value = '';
       matchInput.value = '';
       validation(nameInput, false)
       validation(emailInput, false)
       validation(passwordInput, false)
       validation(matchInput, false)
       spinnerHidden();
    } catch (error) {
       spinnerHidden();

    }
   });