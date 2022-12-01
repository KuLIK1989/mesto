import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
   constructor(popupSelector) {
      super(popupSelector)
      this._popupImage = document.querySelector('.popup__image');
      this._popupDescription = document.querySelector('.popup__description');
   }
   open(name, link) {
      super.open()
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupDescription.textContent = name;
   }
}