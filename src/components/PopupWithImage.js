import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardData) {
    const viewPicModalImage = this._popupElement.querySelector(".modal__image");
    const viewPicModalTitle =
      this._popupElement.querySelector(".modal__pic-title");

    viewPicModalImage.src = cardData.link;
    viewPicModalImage.alt = cardData.name;
    viewPicModalTitle.textContent = cardData.name;
    super.open();
  }
}
