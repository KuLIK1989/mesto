// получить элементы
const popeupOpenButton = document.querySelector('.profile__open-popup');
const popup = document.querySelector('.popup');
const popUpCloseButton = popup.querySelector('.popup__close-button');
const popeupSaveButton = popup.querySelector('.form__save-button');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#status');
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__status');

//получить функцию
function openPopup() {
   popup.classList.add('popup__opened');
}
function closePopup() {
   popup.classList.remove('popup__opened');
}
function savePopup() {
   popup.classList.remove('popup__opened');
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   aboutUser.textContent = jobInput.value;
}

// добавить слушатели 
popeupOpenButton.addEventListener('click', openPopup);
popUpCloseButton.addEventListener('click', closePopup);
popeupSaveButton.addEventListener('click', savePopup);
formElement.addEventListener('submit', formSubmitHandler);

