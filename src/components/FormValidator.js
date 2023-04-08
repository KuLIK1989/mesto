export class FormValidator {
  constructor(setting, formElement) {
    this._setting = setting;
    this._formElement = formElement;
    this._erroList = formElement.querySelectorAll(setting.spanError)
  };
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._setting.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._setting.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._toggleButtonState()
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._addClassError(inputElement);
    this._addValidationErrors(errorElement, errorMessage);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._removeClassError(inputElement);
    this._removeValidationErrors(errorElement);
  };

  _addClassError(inputElement) {
    inputElement.classList.add(this._setting.inputErrorClass);
  };

  _removeClassError(inputElement) {
    inputElement.classList.remove(this._setting.inputErrorClass);
  };

  _addValidationErrors(errorElement, errorMessage) {
    errorElement.classList.add(this._setting.errorClass);
    errorElement.textContent = errorMessage;
  };

  _removeValidationErrors(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._setting.errorClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._setting.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._setting.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };
  hideActiveBtn() {
    this._inputList.forEach((inputElement) => {
      this._removeClassError(inputElement);
    });
    this._toggleButtonState();
    this._erroList.forEach((errorElement) => this._removeValidationErrors(errorElement));
  }
};