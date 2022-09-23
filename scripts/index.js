// получить элементы
const popeupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popUpCloseButton = popup.querySelector('.popup__close-button');
const popeupSaveButton = popup.querySelector('#form-save-btn');
let formElement = popup.querySelector('#form-edit');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#status');
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__status');
console.log(formElement);

//получить функцию
function openPopup() {
   popup.classList.add('popup_opened');
}
function closePopup() {
   popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   aboutUser.textContent = jobInput.value;
   closePopup()
}

// добавить слушатели 
popeupOpenButton.addEventListener('click', openPopup);
popUpCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

