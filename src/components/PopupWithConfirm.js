import { Popup } from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, cardSelector) {
    super(popupSelector);
    this._affirmButton = this._popupElement.querySelector(".modal__button");
    this._cardElement = document
      .querySelector(cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handlePopupAffirm() {
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._popupElement.open();
        this._popupElement.setEventListeners();
      });
  }

  _handleCardDelete() {
    this._affirmButton.addEventListener("click", () => {
      this._cardElement.remove();
      this._popupElement.close();
    });
  }
}
