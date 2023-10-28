// selects
const emailInput = document.getElementById('input-email');
const numberInput = document.getElementById('input-numbercard');

const nameInput = document.getElementById('input-name');
const adressInput = document.getElementById('input-adress');
const cityInput = document.getElementById('input-city');
const stateInput = document.getElementById('input-state');
const codeInput = document.getElementById('input-code');

const formBtn = document.getElementById('form-btn');

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

const validation = (input, regexValidation) => {
    formBtn.disabled = nameValidation && emailValidation && numberValidation && adressValidation && cityValidation && stateValidation && codeValidation ? false : true;
    
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
    numberValidation = NUMBER_VALIDATION.test(e.target.value);
    validation(numberInput, numberValidation)
})

adressInput.addEventListener('input', e => {
    console.log(adressInput.length > 0);
    if (adressInput.length > 0) {
        numberValidation = true
        validation(numberInput, numberValidation)
    } else {
        numberValidation = false
        validation(numberInput, numberValidation)
    }
})
