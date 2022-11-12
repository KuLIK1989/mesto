import { Card } from "./Card.js"
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js"
import { setting } from "./setting.js"

//!все popup 
const popUps = document.querySelectorAll('.popup');

//!данные popup карточек
const cardsPopup = document.querySelector('#popup-cards');
const inputCardName = cardsPopup.querySelector('#name-place');
const inputCardLink = cardsPopup.querySelector('#link-place');
const cardsForm = document.forms['cards-form'];

//!данные popup профиля
const profileOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup-profile');
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('#name');
const jobInput = profileForm.querySelector('#status');
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__status');
const popupOpenBtnCard = document.querySelector('.profile__add-button');

//!Рендер карточек из обьекта intitialCards
const render = () => {
   initialCards.forEach((item) => {
      const card = new Card(item, '.template_type_deafault');
      const container = document.querySelector('.cards')
      card.renderCard(container)

   });
};
render();

//!Создание карточки через popup
function handleSubmitItem(evt) {
   evt.preventDefault();
   const card = new Card({ name: inputCardName.value, link: inputCardLink.value }, '.template_type_deafault');
   card.renderCard(document.querySelector('.cards'))
   evt.target.reset()
   closePopup(cardsPopup);
};

//!Изменение имя пользователя и статуса
function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   aboutUser.textContent = jobInput.value;
   evt.target.reset()
   closePopup(profilePopup)
}

//!Создание экземпляра класса
const profileValidation = new FormValidator(setting, profileForm);
const cardValidation = new FormValidator(setting, cardsForm);

profileValidation.enableValidation();
cardValidation.enableValidation();

//!Слушатели на формы карточек и профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardsForm.addEventListener('submit', handleSubmitItem);

//!Общие функции
popUps.forEach((popup) => {
   popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
         closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
         closePopup(popup)
      }
   })
})
///
export function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupByEscape);
};

popupOpenBtnCard.addEventListener('click', () => { openPopup(cardsPopup) });
profileOpenButton.addEventListener('click', () => {
   openPopup(profilePopup)
   nameInput.value = userName.textContent;
   jobInput.value = aboutUser.textContent;

});
function closePopup(popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closePopupByEscape);
}
function closePopupByEscape(evt) {
   if (evt.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'))
   }
}
