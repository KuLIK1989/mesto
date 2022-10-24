
 const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorEl = formElement.querySelector(`#${inputElement.id}-error`);
  addClassError(inputElement, params);
  addValidationErrors(errorEl, params, errorMessage);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorEl = formElement.querySelector(`#${inputElement.id}-error`);
  removeClassError(inputElement, params);
  removeValidationErrors(errorEl, params);
};


const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(buttonElement, params, hasInvalidInput(inputList))
    });
  });
};

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
};

function addValidationErrors(errorEl, params, errorMessage) {
  errorEl.classList.add(params.errorClass);
  errorEl.textContent = errorMessage;
}

function removeValidationErrors(errorEl, params) {
  errorEl.textContent = ''
  errorEl.classList.remove(params.errorClass);
};

function addClassError(inputElement, params) {
  inputElement.classList.remove(params.inputErrorClass);
};

function removeClassError(inputElement, params) {
  inputElement.classList.remove(params.inputErrorClass);
};

function toggleButtonState(button, params, change) {
  button.disabled = change;
  if (change) {
    button.classList.add(params.inactiveButtonClass);
  } else {
    button.classList.remove(params.inactiveButtonClass);
  }
};



enableValidation(params); 