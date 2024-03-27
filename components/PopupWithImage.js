import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardData) {
    const viewPicModalImage = viewPicModal.querySelector(".modal__image");
    const viewPicModalTitle = viewPicModal.querySelector(".modal__pic-title");

    viewPicModalImage.src = cardData.link;
    viewPicModalImage.alt = cardData.name;
    viewPicModalTitle.textContent = cardData.name;
    super.open();
  }
}
