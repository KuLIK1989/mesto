import { setting } from "../utils/setting.js"
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js"
import { Card } from "../components/Card.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { initialCards } from "../utils/initialCards.js";

import './index.css';
//! рендер карточек из массива
const cardList = new Section({
   items: initialCards,
   renderer: data => {
      cardList.addItem(createNewCard(data));
   }
},
   '.cards'
);
cardList.renderItem();
//! инстанс попапа картинки
const popupBigPhoto = new PopupWithImage('.popup_type_image');
popupBigPhoto.setEventListeners();
function handleCardClick(data) { popupBigPhoto.open(data) };
//! функция создания карточки
function createNewCard(data) {
   return new Card(data, setting.templateCardSelector, handleCardClick).generateCard();
};
//! создание карточки через попап
const popupAddCard = new PopupWithForm('.popup_type_cards', function callBackSubmitForm(inputs) {
   cardList.addItem(createNewCard({
      name: inputs.name,
      link: inputs.link
   }))
   popupAddCard.close()
});
popupAddCard.setEventListeners();
//! слушатель на кнопку открытия попапа карточки
const buttonOpenAddCard = document.querySelector('.profile__add-button');
buttonOpenAddCard.addEventListener('click', () => {
   cardValidation.hideActiveBtn();
   popupAddCard.open()
});
const cardPopup = document.querySelector('.popup_type_cards');
const cardForm = cardPopup.querySelector('.form');
//! Попап профияля
const userInfo = new UserInfo({ userNameSelector: '.profile__name', aboutUserSelector: '.profile__status' });
const popupEditProfile = new PopupWithForm('.popup_type_profile', function callBackSubmitForm(inputs) {
   userInfo.setUserInfo({
      username: inputs.name,
      aboutuser: inputs.status
   });
   popupEditProfile.close();
});
popupEditProfile.setEventListeners();
//! Изменение аватара профиля
const btnOpenPopupAvatar = document.querySelector('.profile__edit-avatar');
btnOpenPopupAvatar.addEventListener('click',()=>{
   popupChangeAvatar.open()
})
const popupChangeAvatar = new PopupWithForm ('.popup_type_avatar')
popupChangeAvatar.setEventListeners()

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form')
const inputProfileName = popupProfileForm.querySelector('.form__item_type_name');
const inputProfileStatus = popupProfileForm.querySelector('.form__item_type_status');
const profile = document.querySelector('.profile');
const btnOpenProfile = profile.querySelector('.profile__edit-button');
//! слушатель на кнопку редактирования профиля
btnOpenProfile.addEventListener('click', () => {
   const profileInfo = userInfo.getUserInfo();
   inputProfileName.value = profileInfo.username;
   inputProfileStatus.value = profileInfo.aboutuser;
   profileValidation.hideActiveBtn();
   popupEditProfile.open();
});

const profileValidation = new FormValidator(setting, popupProfileForm);
const cardValidation = new FormValidator(setting, cardForm);
profileValidation.enableValidation();
cardValidation.enableValidation();
