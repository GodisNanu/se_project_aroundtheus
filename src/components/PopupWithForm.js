import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = document.querySelectorAll(".modal__input");
    const inputObj = {};
    inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
