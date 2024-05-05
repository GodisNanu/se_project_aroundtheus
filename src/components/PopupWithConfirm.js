import { Popup } from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._affirmButton = this._popupElement.querySelector(".modal__button");
    this._handleDeleteCard = handleDeleteCard;
    this._id = null;
  }

  setEventListeners(id) {
    document
      .querySelector("#deleteCardModal .modal__button")
      .addEventListener("click", () => this._handleDeleteCard(id));
    super.setEventListeners();
  }

  open(id) {
    this._id = id;
    super.open();
  }

  close(id) {
    this._id = id;
    super.close();
  }
}
