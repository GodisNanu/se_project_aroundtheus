import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardData) {
    const viewPicModalImage = this._popupElement.querySelector(".modal__image");
    const viewPicModalTitle =
      this._popupElement.querySelector(".modal__pic-title");

    viewPicModalImage.src = cardData._link;
    viewPicModalImage.alt = cardData._name;
    viewPicModalTitle.textContent = cardData._name;
    super.open();
  }
}
