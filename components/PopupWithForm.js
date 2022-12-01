import { Popup } from "./Popup.js"
import { setting } from "../utils/setting";

export class PopupWithForm extends Popup {
   constructor(poupSelector, callBackSubmitForm) {
      super(poupSelector)
      this._callBackSubmitForm = callBackSubmitForm;
      this._inputs = {};
      this._inputLIst = Array.from(this._popup.querySelectorAll(setting.inputSelector));
      this._popupForm = this._popup.querySelectorAll(setting.formSelector);
   }
   setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
         this._callBackSubmitForm(evt, this._getInputValues());
      })
   }
   _getInputValues() {
      this._inputLIst.forEach((input) => {
         this._inputs[input.name] = [input.value]
      });
      return this._inputs;
   }
   close() {
      super.close();
      this._popupForm.reset();
   };
};