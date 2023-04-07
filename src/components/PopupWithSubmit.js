import { setting } from "../utils/setting";
import Popup from "./Popup";

export class PopupWithSubmit extends Popup {
   constructor(submitDeleteCard, popupSelector) {
      super(popupSelector)
      this._popupForm = document.querySelector(setting.formSelector);
      this._submitDeleteCard = submitDeleteCard
   }
   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('click', (evt) => {
         this._submitDeleteCard(evt, this._card)
      })
   }
   open(card) {
      super.open()
      this._card = card
   }
}