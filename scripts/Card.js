import { openPopup } from "./index.js";
import { popupImage } from "./index.js";
import { imageOpen } from "./index.js";
import { imageTitle } from "./index.js";

export class Card {
   constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;

   }
   _getTemplate() {
      const element = document
         .querySelector(this._templateSelector)
         .content
         .querySelector('.card')
         .cloneNode(true);

      return element;
   }

   generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector('.card__image').alt = this._name
      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__title').textContent = this._name;

      return this._element;
   }
   renderCard(container) {
      const element = this.generateCard()
      container.prepend(element)
   }
   _setEventListeners() {
      this._element.querySelector('.card__button-like').addEventListener('click', () => {
         this._toggleLike();
      })
      this._element.querySelector('.card__button-trash').addEventListener('click', () => {
         this._deleteCard();
      })
      this._element.querySelector('.card__image').addEventListener('click', () => {
         this._showPopup();
      })
   }
   _toggleLike() {
      this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
   }
   _deleteCard() {
      this._element.remove()
      this._element = null;
   };
   _showPopup() {
      imageTitle.textContent = this._name;
      imageOpen.src = this._link;
      imageOpen.alt = this._name;
      openPopup(popupImage);
   };

}