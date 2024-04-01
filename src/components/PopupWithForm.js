import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputObj = {};
    this.inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const getValues = this._getInputValues;
      this._handleFormSubmit(getValues);
    });
    super.setEventListeners();
  }
}
