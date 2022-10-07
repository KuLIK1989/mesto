//массив карточек
const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];
//добавление карточек из массива
const container = document.querySelector('.cards');
const template = document.querySelector('#template');

const render = () => {
   initialCards.forEach(item => {
      const addCard = addCardNode(item.name, item.link);
      container.append(addCard);
   });
}
const addCardNode = (name, link) => {
   const addCard = template.content.cloneNode(true);
   const nameLocation = addCard.querySelector('.card__title');
   const imgLocation = addCard.querySelector('.card__image');


   nameLocation.textContent = name;
   imgLocation.src = link;
   imgLocation.alt = name;

   return addCard;
}
render()


// получить элементы
const popeupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('#popup-profile');
const popUpCloseButton = popup.querySelector('.popup__close-button');
const popeupSaveButton = popup.querySelector('#form-save-btn');
let formElement = popup.querySelector('#form-edit');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#status');
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__status');
//кнопка like
const likeButton = Array.from(document.querySelectorAll(".card__button-like"));
likeButton.forEach((button) => {
   button.addEventListener("click", () => {
      button.classList.toggle("card__button-like_active");
   });
});









