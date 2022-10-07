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
const container = document.querySelector('.cards');
const template = document.querySelector('.template');
const popupCards = document.querySelector('#popup-cards');
const inputCardName = popupCards.querySelector('#name-place');
const inputCardLink = popupCards.querySelector('#link-place');
const CardsFormEdit = popupCards.querySelector('.form__save-button');

const render = () => {
   initialCards.forEach((item) => {
      const currentCard = createCardNode(item.name, item.link);
      container.append(currentCard);
   });
   CardsFormEdit.addEventListener('click',handleSubmitItem);
};
const createCardNode = (name, link) => {
   const currentCard = template.content.cloneNode(true);
   const placeName = currentCard.querySelector('.card__title');
   const placeLink = currentCard.querySelector('.card__image');
   

   const deleteBtn = currentCard.querySelector('.card__button-trash');
   deleteBtn.addEventListener('click', handleDeleteCard);


   placeName.textContent = name;
   placeLink.src = link;
   placeName.alt = name;

   return currentCard;
}
//функция удаления card
const handleDeleteCard = (e) => {
   const currentell = e.target.closest('.card');
   currentell.remove();
}
//функция добавления card
const handleSubmitItem = (evt) => {
   evt.preventDefault();
   const item  = createCardNode (inputCardName.value,inputCardLink.value);
   container.prepend (item);    
}
render();

//кнопка like
const likeButton = Array.from(document.querySelectorAll(".card__button-like"));
likeButton.forEach((button) => {
   button.addEventListener("click", () => {
      button.classList.toggle("card__button-like_active");
   });
});



//popupcards
const popupOpenBtnCard = document.querySelector('.profile__add-button');

const popupCloseBtnCard = popupCards.querySelector('.popup__close-button');




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


//получить функцию открывания и закрывания popup
function openPopup(popup) {
   popup.classList.add('popup_opened');
}
popupOpenBtnCard.addEventListener('click', () => { openPopup(popupCards) });
popeupOpenButton.addEventListener('click', () => { openPopup(popup) });


function closePopup(popup) {
   popup.classList.remove('popup_opened');
}
popupCloseBtnCard.addEventListener('click', () => { closePopup(popupCards) });
popUpCloseButton.addEventListener('click', () => { closePopup(popup) });


function formSubmitHandler(evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   aboutUser.textContent = jobInput.value;
   closePopup(popup)
}

// добавить слушатели 

formElement.addEventListener('submit', formSubmitHandler);