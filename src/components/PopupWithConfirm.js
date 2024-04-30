import { Popup } from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDeleteClick) {
    super(popupSelector);
    this._affirmButton = this._popupElement.querySelector(".modal__button");
    this._handleDeleteClick = handleDeleteClick;
    this._id = null;
  }

  setEventListeners() {
    document
      .querySelector("#deleteCardModal .modal__button")
      .addEventListener("click", () => this._handleDeleteClick(this._id));
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
