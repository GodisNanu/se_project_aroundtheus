import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(
  formValidationConfig,
  document.querySelector("#addModal .modal__form")
);

const editFormValidator = new FormValidator(
  formValidationConfig,
  document.querySelector("#editModal .modal__form")
);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

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

function getCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardList.prepend(cardElement);
}

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".modal_opened");
    closePopup(popupOpened);
  }
}

function handleImageClick(cardData) {
  openPopup(viewPicModal);
  viewPicModalImage.src = cardData._link;
  viewPicModalImage.alt = cardData._name;
  viewPicModalTitle.textContent = cardData._name;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editModal);
  editFormValidator._checkInputValidity(profileDescriptionInput);
  editFormValidator._checkInputValidity(profileNameInput);
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

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addCard = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  getCard(addCard);
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

initialCards.forEach((cardData) => {
  getCard(cardData);
});
