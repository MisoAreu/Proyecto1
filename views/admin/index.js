//selectores
const nameProductInput = document.querySelector('#nameAdded');
const descriptionProductInput = document.getElementById('descriptionAdded');
const valueProductInput = document.getElementById('valueAdded');
const existProductInput = document.getElementById('existAdded');
const imageProductInput = document.getElementById('imageAdded');

const btn = document.querySelector('#btnAdded');

let nameValidation = false;
let descriptionValidation = false;
let valueValidation = false;
let existValidation = false;
let imageValidation = false;

const validation = (input, regexValidation) => {
    btn.disabled = nameValidation && descriptionValidation && valueValidation && existValidation && imageValidation ? false : true;
    
    if (input.value === ''){
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('outline-gren-700', 'outline-2', 'outline');
        input.classList.add('focus:outline-indigo-700');
    } else if (regexValidation){
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('focus:outline-indigo-700');
        input.classList.add('outline-green-700', 'outline-2', 'outline');
    } else if (!regexValidation) {
        input.classList.remove('focus:outline-indigo-700');
        input.classList.remove('outline-green-700', 'outline-2', 'outline');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
    }
};

// eventos

nameProductInput.addEventListener('input', e => {
    if (nameProductInput.value.length === 0) {
        nameValidation = false
        validation(nameProductInput, nameValidation) 
    } else {
        nameValidation = true
        validation(nameProductInput, nameValidation)
    }
});

descriptionProductInput.addEventListener('input', e => {
    if (descriptionProductInput.value.length === 0) {
        descriptionValidation = false
        validation(descriptionProductInput, descriptionValidation)
    } else {
        descriptionValidation = true
        validation(descriptionProductInput, descriptionValidation)
    }
});

valueProductInput.addEventListener('input', e => {
    if (valueProductInput.value.length === 0) {
        valueValidation = false;
        validation(valueProductInput, valueValidation)
    } else {
        valueValidation = true
        validation(valueProductInput, valueValidation)
    }
});

existProductInput.addEventListener('input', e => {
    if (existProductInput.value.length === 0) {
        existValidation = false
        validation(existProductInput, existValidation)
    } else {
        existValidation = true
        validation(existProductInput, existValidation)
    }
});

imageProductInput.addEventListener('input', e => {
    if (imageProductInput.value.length === 0) {
        imageValidation = false
        validation(imageProductInput, imageValidation)
    } else {
    imageValidation = true
    validation(imageProductInput, imageValidation)
    }
});

btn.addEventListener('click', async e => {
    e.preventDefault();
    try {
        const newItem = {
            name: nameProductInput.value,
            description: descriptionProductInput.value,
            value: valueProductInput.value,
            exist: existProductInput.value,
            image: imageProductInput.value,
        }
        const { data } = await axios.post('/api/items', newItem);
        console.log(data);
    } catch (error) {
        
    }
});

