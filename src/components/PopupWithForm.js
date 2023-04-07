import Popup from "./Popup.js"
import { setting } from "../utils/setting.js";

export class PopupWithForm extends Popup {
   constructor(handleSubmitClick, popupSelector) {
      super(popupSelector);
      this._handleSubmitClick = handleSubmitClick;
      // this._callBackSubmitForm = callBackSubmitForm;
      this._inputs = {};
      this._inputLIst = Array.from(this._popup.querySelectorAll(setting.inputSelector));
      this._popupForm = this._popup.querySelector(setting.formSelector);
      this._buttonSubmitCreate = "Создать";
   };
   setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
         this._handleSubmitClick(
            evt,
            this._getInputValues(),
            this._buttonSubmitCreate
         )
         // this._callBackSubmitForm(this._getInputValues());
      })
   }
   _getInputValues() {
      this._inputLIst.forEach((input) => {
         this._inputs[input.name] = input.value
      });
      return this._inputs;
   }
   close() {
      super.close();
      this._popupForm.reset();
   };
};
