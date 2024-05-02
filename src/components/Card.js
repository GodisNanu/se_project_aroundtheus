export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
  }

  handleLikeIcon() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _renderLikes() {
    if (this.isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__text");
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    this._renderLikes();

    return this._cardElement;
  }
}
