export default class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl, options) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, options);
    } else {
      this._hideInputError(inputEl, options);
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _buttonDisabled(inputEls, submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _buttonEnabled(inputEls, submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _toggleButtonState(inputEls, submitButton, options) {
    if (this._hasInvalidInput(inputEls)) {
      this._buttonDisabled(inputEls, submitButton, options);
      return;
    }
    this._buttonEnabled(inputEls, submitButton, options);
  }

  _setEventListeners(options) {
    const inputEls = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputEls, submitButton, options);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl, options);
        this._toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(
  formValidationConfig,
  document.querySelector("#addModal .modal__form")
);
addFormValidator.enableValidation();
