import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelecctor, handlFormSubmit) {
    super({ popupSelecctor });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handlFormSubmit = handlFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
