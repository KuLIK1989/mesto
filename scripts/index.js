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
const cardsPopup = document.querySelector('#popup-cards');
const inputCardName = cardsPopup.querySelector('#name-place');
const inputCardLink = cardsPopup.querySelector('#link-place');
const cardsForm = document.forms['cards-form'];



const render = () => {
   initialCards.forEach((item) => {
      const currentCard = createCardNode(item.name, item.link);
      container.append(currentCard);
   });
   cardsForm.addEventListener('submit', handleSubmitItem);
};
const createCardNode = (name, link) => {
   const currentCard = template.content.cloneNode(true);
   const placeName = currentCard.querySelector('.card__title');
   const cardImage = currentCard.querySelector('.card__image');

   //delete btn
   const deleteBtn = currentCard.querySelector('.card__button-trash');
   deleteBtn.addEventListener('click', handleDeleteCard);


   //like btn
   const likeBtn = currentCard.querySelector('.card__button-like');
   likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle("card__button-like_active");
   });


   placeName.textContent = name;
   cardImage.src = link;
   cardImage.alt = name;

   cardImage.addEventListener('click', () => {
      imageTitle.textContent = name;
      openImage.src = link;
      openImage.alt = name;
      openPopup(popupImage);

   })

   return currentCard;
}
//like card

//функция удаления card
const handleDeleteCard = (e) => {
   const currentElement = e.target.closest('.card');
   currentElement.remove();
}
//функция добавления card
const handleSubmitItem = (evt) => {
   evt.preventDefault();
   const item = createCardNode(inputCardName.value, inputCardLink.value);
   container.prepend(item);
   evt.target.reset()
   closePopup(cardsPopup);
}
render();

//popupcards
const popupOpenBtnCard = document.querySelector('.profile__add-button');
const popupCloseBtnCard = cardsPopup.querySelector('.popup__close-button');
const popupImage = document.querySelector('#popup-image');
const openImage = popupImage.querySelector('.popup__image');
const closeBtnImage = popupImage.querySelector('.popup__close-button');
const imageTitle = popupImage.querySelector('.popup__description')






// получить элементы
const profileOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup-profile');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('#name');
const jobInput = profileForm.querySelector('#status');
const userName = document.querySelector('.profile__name');
const aboutUser = document.querySelector('.profile__status');
//Все попапы на странице
const popUps = document.querySelectorAll('.popup');
//перебрать попапы + добавить функцию закрытия по оверлею
popUps.forEach((item) => closePopupByOverlay(item));



//получить функцию открывания и закрывания popup
function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupByEscape)
}
popupOpenBtnCard.addEventListener('click', () => { openPopup(cardsPopup) });
profileOpenButton.addEventListener('click', () => {
   openPopup(profilePopup)
   nameInput.value = userName.textContent;
   jobInput.value = aboutUser.textContent;
});

//function close btn
function closePopup(popup) {
   popup.classList.remove('popup_opened');
}
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});


function closePopupByEscape(evt) {
   if (evt.key === "Escape") {
      closePopup(document.querySelector('.popup_opened'))
   }
}

function closePopupByOverlay(item) {
   item.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
         closePopup(item)
      };
   });
};




function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   userName.textContent = nameInput.value;
   aboutUser.textContent = jobInput.value;
   evt.target.reset()
   closePopup(profilePopup)
}

// добавить слушатели 

profileForm.addEventListener('submit', handleProfileFormSubmit);
