import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const card = new Card(initialCards, "#card-template");
card.getView();
/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const page = document.querySelector(".page");
const editButton = document.querySelector("#editButton");
const editModal = document.querySelector("#editModal");
const addButton = document.querySelector("#addButton");
const addModal = document.querySelector("#addModal");
const viewPicModal = document.querySelector("#viewPicModal");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
const profileEditForm = editModal.querySelector(".modal__form");
const addCardForm = addModal.querySelector(".modal__form");
const addCardTitleInput = document.querySelector("#place-title");
const addCardLinkInput = document.querySelector("#image-link");
const viewPicModalImage = viewPicModal.querySelector(".modal__image");
const viewPicModalTitle = viewPicModal.querySelector(".modal__pic-title");
const cardList = document.querySelector(".cards__list");
const allModals = document.querySelectorAll(".modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

/* function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openPopup(viewPicModal);
    viewPicModalImage.src = cardData.link;
    viewPicModalImage.alt = cardData.name;
    viewPicModalTitle.textContent = cardData.name;
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  return cardElement;
} */

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".modal_opened");
    closePopup(popupOpened);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editModal);
});

addButton.addEventListener("click", () => {
  openPopup(addModal);
});

initialCards.forEach((cardData) => {
  const cardElement = card.getView(cardData);
  cardList.prepend(cardElement);
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addCard = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  const card = card.getView(addCard);
  cardList.prepend(card);
  closePopup(addModal);
  addCardForm.reset();
});

allModals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (e.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});
