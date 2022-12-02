import { Card } from "../components/Card.js"
import { initialCards } from "../utils/initialCards.js";
import { FormValidator } from "../components/FormValidator.js"
import { setting } from "../utils/setting.js"
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"

// import "../pages/index.css";

//!все popup 
const popUps = document.querySelectorAll('.popup');

//!данные popup карточек
const cardsPopup = document.querySelector('#popup-cards');
const inputCardName = cardsPopup.querySelector('#name-place');
const inputCardLink = cardsPopup.querySelector('#link-place');
const cardsForm = document.forms['cards-form'];
const container = document.querySelector('.cards')

//!данные popup профиля
const profileOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup-profile');
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('#name');
const jobInput = profileForm.querySelector('#status');
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__status');
const popupOpenBtnCard = document.querySelector('.profile__add-button');

//!Данные popup картинок
export const popupImage = document.querySelector('#popup-image');
export const imageOpen = popupImage.querySelector('.popup__image');
export const imageTitle = popupImage.querySelector('.popup__description')

const cardsList = document.querySelector('.cards');

const cardList = new Section({
   items: initialCards,
   renderer: data => {
      cardList.addItem(createNewCard(data));
   }
},
'.cards'
);
cardList.renderItem();

const popupFullScreen = new PopupWithImage('.popup_type_image');
popupFullScreen.setEventListeners();

function handleCardClick (data) {popupFullScreen.open(data)};

function createNewCard(data) {
   return new Card(data, setting.templateCardSelector, handleCardClick).generateCard();
};
function addCard(card) {
   cardsList.prepend(card);
}
const popupAddCard = new PopupWithForm(handleSubmitCard, '.popup_type_cards');
function handleSubmitCard(evt, data) {
   evt.preventDafault();
   addCard(createNewCard(data));
   popupAddCard.close();
}
popupAddCard.setEventListeners();

function openPopupCard(){
   popupAddCard.open();
}
const buttonOpenAddCard = document.querySelector('.profile__add-button');
buttonOpenAddCard.addEventListener('click', openPopupCard);






// //!Рендер карточек из обьекта intitialCards
// const initialCardsList = new Section({
//    items: initialCards,
//    renderer: data => {
//       initialCardsList.addItem(createNewCard(data));
//    }
// }, '.cards'
// );
// initialCardsList.renderItem();

// function handleCardClick(data) { popupBigPic.open(data) }
// function createNewCard(data) {
//    return new Card(data, setting.templateCardSelector, handleCardClick).generateCard();
// }

// //!экземпляр попапа картинки
// const popupBigPic = new PopupWithImage('.popup_type_image');
// popupBigPic.setEventListeners();

// // const render = () => {
// //    initialCards.forEach((item) => {
// //       const card = new Card(item, '.template_type_deafault');
// //       card.renderCard(container)

// //    });
// // };
// // render();
// //!
// const cardsList = document.querySelector('.cards');

// function addcard(card) {
//    cardsList.prepend(card)
// }
// //!Экземпляр попапа cards и создание карточки через него
// const popupAddCards = new PopupWithForm('.popup_type_cards',
// function callBackSubmitForm (inputValues) {
//    initialCardsList.addItem(createNewCard({
//       name:inputValues.
//    }))   
// }
// );
// // function handleSubmitItem(evt, data) {
// //    evt.preventDefault();
// //    addcard(createNewCard(data));
// //    popupAddCards.close();
// // };
// popupAddCards.setEventListeners();

// //!Изменение имя пользователя и статуса
// function handleProfileFormSubmit(evt) {
//    evt.preventDefault();
//    userName.textContent = nameInput.value;
//    aboutUser.textContent = jobInput.value;
//    evt.target.reset();
//    profileValidation.hideActiveBtn();
//    closePopup(profilePopup);
// }

// //!Создание экземпляра класса
// const profileValidation = new FormValidator(setting, profileForm);
// const cardValidation = new FormValidator(setting, cardForm);

// profileValidation.enableValidation();
// cardValidation.enableValidation();

// //!Слушатели на формы карточек и профиля
// const cardPopup = document.querySelector('.popup_type_cards');
// const cardForm = cardPopup.querySelector('.form');
// // profileForm.addEventListener('submit', handleProfileFormSubmit);
// // cardsForm.addEventListener('submit', handleSubmitItem);

// //!Общие функции
// // popUps.forEach((popup) => {
// //    popup.addEventListener('mousedown', (evt) => {
// //       if (evt.target.classList.contains('popup_opened')) {
// //          closePopup(popup)
// //       }
// //       if (evt.target.classList.contains('popup__close-button')) {
// //          closePopup(popup)
// //       }
// //    })
// // })
// ///
// // export function openPopup(popup) {
// //    popup.classList.add('popup_opened');
// //    document.addEventListener('keydown', closePopupByEscape);
// // };
// function openPopupCard(){
//    popupAddCards.open()
// }

// popupOpenBtnCard.addEventListener('click', openPopupCard);
// // profileOpenButton.addEventListener('click', () => {
// //    openPopup(profilePopup)
// //    nameInput.value = userName.textContent;
// //    jobInput.value = aboutUser.textContent;

// // });
// // function closePopup(popup) {
// //    popup.classList.remove('popup_opened');
// //    document.removeEventListener('keydown', closePopupByEscape);
// // }
// // function closePopupByEscape(evt) {
// //    if (evt.key === "Escape") {
// //       closePopup(document.querySelector('.popup_opened'))
// //    }
// // }
