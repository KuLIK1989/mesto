import { setting } from "../utils/setting.js"
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js"
import { Card } from "../components/Card.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { initialCards } from "../utils/initialCards.js";



//!все popup 
const popUps = document.querySelectorAll('.popup');

//!данные popup карточек
const cardsPopup = document.querySelector('#popup-cards');
const inputCardName = cardsPopup.querySelector('#name-place');
const inputCardLink = cardsPopup.querySelector('#link-place');
const cardsForm = document.forms['cards-form'];
// const container = document.querySelector('.cards')

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

const popupBigPhoto = new PopupWithImage('.popup_type_image');
popupBigPhoto.setEventListeners();

function handleCardClick(data) { popupBigPhoto.open(data) };

function createNewCard(data) {
   return new Card(data, setting.templateCardSelector, handleCardClick).generateCard();
};
function addCard(card) {
   cardsList.prepend(card);
}
const popupAddCard = new PopupWithForm('.popup_type_cards', handleSubmitCard);
function handleSubmitCard(evt, data) {
   evt.preventDefault();
   console.log(data)
   addCard(createNewCard(data));
   popupAddCard.close();
}
popupAddCard.setEventListeners();

function openPopupCard() {
   popupAddCard.open();
}
const buttonOpenAddCard = document.querySelector('.profile__add-button');
buttonOpenAddCard.addEventListener('click', openPopupCard);




const userInfo = new UserInfo('.profile__name', '.profile__status');
const popupEditProfile = new PopupWithForm('.popup_type_profile', submitProfile);

function submitProfile(evt, data) {
   evt.preventDefault();
   userInfo.setUserInfo(data)
   profileValidation.hideActiveBtn();
   popupEditProfile.close();
}
popupEditProfile.setEventListeners();

//todo доделатьпеременные
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form')

const inputProfileName = popupProfileForm.querySelector('.form__item_type_name');
const inputProfileStatus = popupProfileForm.querySelector('.form__item_type_status');



function openPopupProfile() {
   const profileInfo = userInfo.getUserInfo()
   inputProfileName.value = profileInfo.username;
   inputProfileStatus.value = profileInfo.aboutuser;
   popupEditProfile.open()
};




const profile = document.querySelector('.profile');
const btnOpenProfile = profile.querySelector('.profile__edit-button')
btnOpenProfile.addEventListener('click', openPopupProfile);


const cardPopup = document.querySelector('.popup_type_cards');
const cardForm = cardPopup.querySelector('.form')



const profileValidation = new FormValidator(setting, popupProfileForm);
const cardValidation = new FormValidator(setting, cardForm);

profileValidation.enableValidation();
cardValidation.enableValidation();
