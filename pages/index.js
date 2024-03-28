import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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
const addFormValidator = new FormValidator(formValidationConfig, addCardForm);

const editFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

const newPopupImage = new PopupWithImage("#viewPicModal");
newPopupImage.setEventListeners("#viewPicModal");

const editPopup = new PopupWithForm("#editModal", handleFormSubmit);
editPopup.setEventListeners("#editModal");

const cardPopup = new PopupWithForm("#addModal", handleFormSubmit);
cardPopup.setEventListeners("#addModal");

const newCardList = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

const useInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

/* function getCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.prepend(cardElement);
} */

/* function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".modal_opened");
    closePopup(popupOpened);
  }
} */

function handleImageClick(cardData) {
  newPopupImage.open("#viewPicModal");
  viewPicModalImage.src = cardData.link;
  viewPicModalImage.alt = cardData.name;
  viewPicModalTitle.textContent = cardData.name;
}

function handleFormSubmit(e) {
  e.preventDefault();
  useInfo.setUserInfo({
    name: "",
    job: "",
  });
  editPopup.close("#editModal");
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editPopup.open("#editModal");
  editFormValidator.resetValidation();
});

/* profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editModal);
}); */

addButton.addEventListener("click", () => {
  cardPopup.open("#addModal");
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addCard = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  getCard(addCard);
  cardPopup.close("#addModal");
  addCardForm.reset();
  addFormValidator.resetValidation();
});

/* allModals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (e.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});*/

/* initialCards.forEach(getCard); */
newCardList.renderItems();
