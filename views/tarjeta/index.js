

// selects
const emailInput = document.getElementById('input-email');
const numberInput = document.getElementById('input-numbercard');

const nameInput = document.getElementById('input-name');
const adressInput = document.getElementById('input-adress');
const cityInput = document.getElementById('input-city');
const stateInput = document.getElementById('input-state');
const codeInput = document.getElementById('input-code');
const nameCardInput = document.getElementById('input-name-card');
const monthInput = document.getElementById('input-month');
const expireInput = document.getElementById('input-expire');
const cvvInput = document.getElementById('input-cvv');

const modal = document.getElementById('modal-done');

const formBtn = document.getElementById('form-btn');
const button = document.getElementById('button-text');
const spinner = document.getElementById('spinner-container');

// REGEX
const NAME_VALIDATION = /^[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1\s]*)$/;
const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NUMBER_VALIDATION = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

// Validations 
let nameValidation = false;
let emailValidation = false;
let numberValidation = false;
let adressValidation = false;
let cityValidation = false;
let stateValidation = false;
let codeValidation = false;
let nameCardValidation = false;
let monthValidation = false;
let expireValidation = false;
let cvvValidation = false;

function spinnerShow() {
    button.innerHTML = '';
    spinner.style.display = 'flex';
  }
  
  function spinnerHidden() {
    spinner.style.display = 'none';
    button.innerHTML = 'Realizar pago';
  }

const validation = (input, regexValidation) => {
    formBtn.disabled = nameValidation && emailValidation && numberValidation && adressValidation && cityValidation && stateValidation && codeValidation && nameCardValidation && monthValidation && expireValidation && cvvValidation ? false : true;
    
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

nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation)
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation)
});

numberInput.addEventListener('input', e => {
    console.log(numberInput.value);
    numberValidation = NUMBER_VALIDATION.test(e.target.value);
    validation(numberInput, numberValidation)
})

adressInput.addEventListener('input', e => {
    if (adressInput.value.length > 0) {
        adressValidation = true
        validation(adressInput, adressValidation)
    } else {
        adressValidation = false
        validation(adressInput, adressValidation)
    }
})

cityInput.addEventListener('input', e => {
    if (cityInput.value.length > 0) {
        cityValidation = true
        validation(cityInput, cityValidation)
    } else {
        cityValidation = false
        validation(cityInput, cityValidation)
    }
})

stateInput.addEventListener('input', e => {
    if (stateInput.value.length > 0) {
        stateValidation = true
        validation(stateInput, stateValidation)
    } else {
        stateValidation = false
        validation(stateInput, stateValidation)
    }
})

codeInput.addEventListener('input', e => {
    if (codeInput.value.length > 0) {
        codeValidation = true
        validation(codeInput, codeValidation)
    } else {
        codeValidation = false
        validation(codeInput, codeValidation)
    }
})

nameCardInput.addEventListener('input', e => {
    nameCardValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameCardInput, nameCardValidation)
})

monthInput.addEventListener('input', e => {
    if (monthInput.value.length > 0) {
        monthValidation = true
        validation(monthInput, monthValidation)
    } else {
        monthValidation = false
        validation(monthInput, monthValidation)
    }
})

expireInput.addEventListener('input', e => {
    if (expireInput.value.length > 0) {
        expireValidation = true
        validation(expireInput, expireValidation)
    } else {
        expireValidation = false
        validation(expireInput, expireValidation)
    }
})

cvvInput.addEventListener('input', e => {
    if (cvvInput.value.length > 0) {
        cvvValidation = true
        validation(cvvInput, cvvValidation)
    } else {
        cvvValidation = false
        validation(cvvInput, cvvValidation)
    }
})

formBtn.addEventListener('click', e => {
    e.preventDefault()
    spinnerShow();
    setTimeout(() => {
        modal.style.display = 'flex'
    }, 3000);
    setTimeout(() => {
        window.location.pathname = '/home';
    }, 8000);
})