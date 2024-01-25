function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

const viewPicModalImage = viewPicModal.querySelector(".modal__image");
const viewPicModalTitle = viewPicModal.querySelector(".modal__pic-title");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__Like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    openPopup(viewPicModal);
    viewPicModalImage.src = this._link;
    viewPicModalImage.alt = this._name;
    viewPicModalTitle.textContent = this._name;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__text");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners;

    return this._cardElement;
  }
}
