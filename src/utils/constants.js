// export const initialCards = [
//   // TODO: tget rid of these initial cards
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },

//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },

//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },

//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },

//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },

//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

export const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const cardTemplate = document.querySelector("#card-template");
export const editButton = document.querySelector("#editButton");
export const editModal = document.querySelector("#editModal");
export const addButton = document.querySelector("#addButton");
export const deleteButton = cardTemplate.querySelector("#cardDeleteButton");
export const addModal = document.querySelector("#addModal");
export const viewPicModal = document.querySelector("#viewPicModal");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileNameInput = document.querySelector("#name-input");
export const profileDescriptionInput =
  document.querySelector("#description-input");
export const profileEditForm = editModal.querySelector(".modal__form");
export const addCardForm = addModal.querySelector(".modal__form");
export const addCardTitleInput = document.querySelector("#place-title");
export const addCardLinkInput = document.querySelector("#image-link");
export const viewPicModalImage = viewPicModal.querySelector(".modal__image");
export const viewPicModalTitle =
  viewPicModal.querySelector(".modal__pic-title");
export const avatarButton = document.querySelector("#avatarButton");
export const avatar = document.getElementById("profile__avatar");
