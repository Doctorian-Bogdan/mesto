function showInputError (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError (formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass );
  }else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  }else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(formElement, validateObj) {
  const inputList = Array.from(formElement.querySelectorAll(validateObj.inputSelector));
  const buttonElement = formElement.querySelector(validateObj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validateObj.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, validateObj.inputErrorClass, validateObj.errorClass);

    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validateObj.inputErrorClass, validateObj.errorClass);
      toggleButtonState(inputList, buttonElement, validateObj.inactiveButtonClass);
    })
  })
}

function enableValidation(validateObj) {
  const formList = Array.from(document.querySelectorAll(validateObj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(formElement, validateObj)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});
