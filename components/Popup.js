export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close(this._popupElement);
      }
      if (e.target.classList.contains("modal__close")) {
        this.close(this._popupElement);
      }
    });
  }
}
