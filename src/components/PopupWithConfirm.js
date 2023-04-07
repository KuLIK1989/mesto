import Popup from "./Popup.js";
import { setting } from "../utils/setting.js";

export default class PopupWithConfirm extends Popup {
   constructor(handleSubmitDeleteCard, popupSelector) {
      super(popupSelector);
      this._popupForm = this._popup.querySelector(setting.formSelector);
      this._handleSubmitDeleteCard = handleSubmitDeleteCard
   }
   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('click', (evt) => {
         this._handleSubmitDeleteCard(evt, this._card);
      });
   };

   open(card) {
      super.open();
      this._card = card;
   };

}