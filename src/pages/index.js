import { setting } from "../utils/setting.js"
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js"
import { Card } from "../components/Card.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { initialCards } from "../utils/initialCards.js";
import config from "../utils/config.js"
import { Api } from "../components/Api.js";
import { renderLoading } from "../utils/renderLoading.js";
import './index.css';
import { data } from "autoprefixer";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const userInfo = new UserInfo(
   setting.profileNameSelector,
   setting.profaleAboutSelector,
   setting.profaleAvatarSelector
);
const cardsList = document.querySelector(setting.listCardsSelector)
//! рендер карточек из массива
const cardList = new Section({
   renderer: data => {
      cardList.addItem(createNewCard(data));
   }
},
   '.cards'
);

const api = new Api(config);
api.getInitialData()
   .then((data) => {
      userInfo.renderUserInfo({
         name: data[0].name,
         about: data[0].about,
         myId: data[0]._id,
         avatar: data[1].avatar
      })
      cardList.renderItems({
         cards: data[1]
      })
   })
.catch((error) => { console.log(`возникла ошибка ,${error}`) })
//! инстанс попапа картинки
const popupBigPhoto = new PopupWithImage('.popup_type_image');
popupBigPhoto.setEventListeners();
function handleCardClick(data) { popupBigPhoto.open(data) };
//! функция создания карточки
function createNewCard(data) {
   return new Card(data, setting.templateCardSelector, handleCardClick, handleToggleLike, handleOpenPopupWithConfirm, userInfo.getUserInfo().myId).generateCard();
};
function handleOpenPopupWithConfirm(card) {
   popupConfirmDeleteCard.open(card)
}
//! Функция добавления карточки
function addCard(card) {
   cardsList.prepend(card)
}
//! создание карточки через попап
const popupAddCard = new PopupWithForm(handleSubmitCard, '.popup_type_cards');

function handleSubmitCard(evt, data, buttonSubmitText) {
   evt.preventDefault();
   renderLoading(cardPopup, true, buttonSubmitText);
   api.setCard(data)
      .then((data) => {
         addCard(createNewCard(data))
      })
      .then(() => {
         popupAddCard.close();
         renderLoading(cardPopup, false, buttonSubmitText)
      })
   .catch((error) => { console.log(`возникла ошибка попап карточки ,${error}`) })
}
popupAddCard.setEventListeners();
// const popupAddCard = new PopupWithForm('.popup_type_cards', function callBackSubmitForm(inputs) {
//    cardList.addItem(createNewCard({
//       name: inputs.name,
//       link: inputs.link
//    }))
//    popupAddCard.close()
// });

//! слушатель на кнопку открытия попапа карточки
function openPopupCard() {
   // formValidateCard.hideActiveBtn();
   popupAddCard.open()
}
const buttonOpenAddCard = document.querySelector('.profile__add-button');
buttonOpenAddCard.addEventListener('click', openPopupCard);
const cardPopup = document.querySelector('.popup_type_cards');
const cardForm = cardPopup.querySelector('.form');
//! функция удаления карточки
const popupConfirmDeleteCard = new PopupWithConfirm(
   handleDeleteCard, setting.popupConfirmSelector
)
popupConfirmDeleteCard.setEventListeners();

function handleDeleteCard(evt, card) {
   evt.preventDefault();
   api.deleteCard(card._idCard)
      .then((response) => {
         if (response.message = "Пост удален") {
            card.deleteCard();
         }
      })
      .then(() => {
         popupConfirmDeleteCard.close()
      })
      .catch((error) => { console.log(`возникла ошибка удаления карточки ,${error}`) })

}
//! Попап профияля
const popupEditProfile = new PopupWithForm(handleSubmitProfile, '.popup_type_profile');
function handleSubmitProfile(evt, data, buttonSubmitText) {
   evt.preventDefault();
   renderLoading(popupProfile, true, buttonSubmitText);
   api.setUserInfo(data)
      .then((data) => {
         userInfo.setUserInfo(data)
      })
      .then(() => {
         popupEditProfile.close();
         renderLoading(popupProfile, false, buttonSubmitText)
      })
      // .catch((error) => { console.log(`возникла ошибка профиля,${error}`) })
}
popupEditProfile.setEventListeners();

function handleToggleLike(data) {
   api.toggleLikeCard(data)
      .then((response) => {
         data.card.setLikes(response.likes);
         data.card._setLike();
      })
      .catch((error) => { console.log(`возникла ошибка попап карточки ,${error}`) })
}
// const userInfo = new UserInfo({ userNameSelector: '.profile__name', aboutUserSelector: '.profile__status' });
// const popupEditProfile = new PopupWithForm('.popup_type_profile', function callBackSubmitForm(inputs) {
//    userInfo.setUserInfo({
//       name: inputs.name,
//       about: inputs.status
//    });
//    popupEditProfile.close();
// });

//! Изменение аватара профиля
const changeAvatar = new PopupWithForm(handleSubmitAvatar, '.popup_type_avatar');
changeAvatar.setEventListeners();

function handleSubmitAvatar(evt, link, buttonSubmitText) {
   evt.preventDefault();
   renderLoading(popupProfile, true, buttonSubmitText)
   api.setAvatar(link)
      .then(({ avatar }) => {
         userInfo.renderAvatar(avatar)
      })
      .then(() => {
         changeAvatar.close()
         renderLoading(popupProfile, false, buttonSubmitText)
      })
      // .catch((error) => { console.log(`возникла ошибка аватара,${error}`) })
}
const btnOpenPopupAvatar = document.querySelector('.profile__edit-avatar');
btnOpenPopupAvatar.addEventListener('click', () => {
   changeAvatar.open()
})
// const popupChangeAvatar = new PopupWithForm( btnOpenPopupAvatar,'.popup_type_avatar')
// popupChangeAvatar.setEventListeners()

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.form')
const inputProfileName = popupProfileForm.querySelector('.form__item_type_name');
const inputProfileStatus = popupProfileForm.querySelector('.form__item_type_status');
const profile = document.querySelector('.profile');
const btnOpenProfile = profile.querySelector('.profile__edit-button');
//! слушатель на кнопку редактирования профиля
function openPopupProfile(){
   const profileInfo = userInfo.getUserInfo()
   inputProfileName.value = profileInfo.name;
   inputProfileStatus.value = profileInfo.about;
   profileValidation.hideActiveBtn();
   popupEditProfile.open();   
}
btnOpenProfile.addEventListener('click', openPopupProfile)
// btnOpenProfile.addEventListener('click', () => {
//    const profileInfo = userInfo.getUserInfo();
//    inputProfileName.value = profileInfo.name;
//    inputProfileStatus.value = profileInfo.about;
//    profileValidation.hideActiveBtn();
//    popupEditProfile.open();
// });
const avatarPopup = document.querySelector('.popup_type_avatar')
const popupUpdAvatarForm  = avatarPopup.querySelector(setting.formSelector)



const profileValidation = new FormValidator(setting, popupProfileForm);
const cardValidation = new FormValidator(setting, cardForm);
const avatarValidation = new FormValidator(setting,popupUpdAvatarForm)
profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation()
