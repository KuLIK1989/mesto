const setting = {
   formSelector: '.form',
   inputSelector: '.form__item',
   submitButtonSelector: '.form__save-button ',
   inactiveButtonClass: 'form__save-button_disabled',
   inputErrorClass: 'form__item_error',
   errorClass: 'error_visible'
}
//!Спасибо за ценные подсказки!именно в этом коде у меня больше всего вопросов и не пониманий было.
const setEventListeners = (formElement, setting) => {
   const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
   const buttonElement = formElement.querySelector(setting.submitButtonSelector);
   toggleButtonState(buttonElement, setting, true)
   formElement.addEventListener('reset', () => {
      toggleButtonState(buttonElement, setting, true)
   });
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         checkValidity(formElement, inputElement, setting);
         toggleButtonState(buttonElement, setting, hasInvalidInput(inputList))
      });
   });
};
const enableValidation = (setting) => {
   const formList = Array.from(document.querySelectorAll(setting.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
         evt.preventDefault();
      });
      setEventListeners(formElement, setting);
   });
};

const hasInvalidInput = (inputList => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
});

const checkValidity = (formElement, inputElement, setting) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, setting);
   } else {
      hideInputError(formElement, inputElement, setting);
   }
};
const showInputError = (formElement, inputElement, errorMessage, setting) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   addClassError(inputElement, setting);
   addValidationErrors(errorElement, setting, errorMessage);
};
const hideInputError = (formElement, inputElement, setting) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   removeClassError(inputElement, setting);
   removeValidationError(errorElement, setting);
};



function addClassError(inputElement, setting) {
   inputElement.classList.add(setting.inputErrorClass);
};
function removeClassError(inputElement, setting) {
   inputElement.classList.remove(setting.inputErrorClass);
};
function addValidationErrors(errorElement, setting, errorMessage) {
   errorElement.classList.add(setting.errorClass);
   errorElement.textContent = errorMessage;
}
function removeValidationError(errorElement, setting) {
   errorElement.textContent = ''
   errorElement.classList.remove(setting.errorClass);
};



function toggleButtonState(button, setting, change) {
   button.disabled = change;
   if (change) {
      button.classList.add(setting.inactiveButtonClass);
   } else {
      button.classList.remove(setting.inactiveButtonClass);
   }
};
enableValidation(setting);
