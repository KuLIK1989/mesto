export class Card {
   constructor(
      data,
      templateSelector,
      handleCardClick,
      handleToggleLike,
      handleOpenPopupWithConfirm,
      myId) {
      this._data = data;
      this._likes = data.likes;
      this._idOwner = data.owner._id;
      this._idCard = data._id;
      this._name = data.name;
      this._link = data.link;
      this._myId = myId
      this._handleToggleLike = handleToggleLike;
      this._handleOpenPopupWithConfirm = handleOpenPopupWithConfirm;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._cardElement = this._getTemplate();
      this._photo = this._cardElement.querySelector('.card__image');
      this._like = this._cardElement.querySelector('.card__button-like');
      this._likeCounter = this._cardElement.querySelector('.card__like-counter');
      this._description = this._cardElement.querySelector('.card__title');
      this._deleteBtn = this._cardElement.querySelector('.card__button-trash')

   }
   _countLikes() {
      return Object.keys(this._likes).length;
   }
   _myLike() {
      if (this._likes.length === 0) {
         return false;
      }
      return this._likes.some(item => item._id === this._myId)
   };
   _setLike() {
      if (this._myLike(this._likes)) {
         this._like.classList.add('card__button-like_active');
      } else {
         this._like.classList.remove('card__button-like_active');
      }
      this._likeCounter.textContent = this._countLikes(this._likes)
   }
   setLikes(arrLikes) {
      this._likes = arrLikes
   }
   _getTemplate() {
      const cardElement = document
         .querySelector(this._templateSelector)
         .content
         .querySelector('.card')
         .cloneNode(true);
      return cardElement;
   }

   generateCard() {
      this._description.textContent = this._name;
      this._photo.src = this._link;
      this._photo.alt = this._name
      this._likeCounter.textContent = this._countLikes(this._likes);
      this._setLike(this._likes);
      if (this._idOwner !== this._myId) {
         // this._deleteBtn.classList.add('card__button-trash_active');
         this._cardElement.querySelector('.card__button-trash').style.display = "none"
      }
      this._setEventListeners();
      return this._cardElement
   }
   _setEventListeners() {
      this._photo.addEventListener('click', () => {
         this._handleCardClick({ 'name': this._name, 'link': this._link });
      });
      this._like.addEventListener('click', () => this._toggleLike());
      this._deleteBtn.addEventListener('click', () => this._handleOpenPopupWithConfirm(this));
   }
   _toggleLike() {
      if (!this._myLike(this._likes)) {
         this._methodCardLike = "PUT";
      } else {
         this._methodCardLike = "DELETE";
      }
      return this._handleToggleLike({
         idCard: this._idCard,
         methodCardLike: this._methodCardLike,
         card: this
      })
      // this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
   }
   deleteCard() {
      this._cardElement.remove()
      this._cardElement = null;
   };
}