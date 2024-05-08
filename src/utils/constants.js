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
export const editProfileSubmitButton =
  editModal.querySelector(".modal__button");
export const addCardForm = addModal.querySelector(".modal__form");
export const addCardSubmitButton = addModal.querySelector(".modal__button");
export const addCardTitleInput = document.querySelector("#place-title");
export const addCardLinkInput = document.querySelector("#image-link");
export const viewPicModalImage = viewPicModal.querySelector(".modal__image");
export const viewPicModalTitle =
  viewPicModal.querySelector(".modal__pic-title");
export const avatarButton = document.querySelector("#avatarButton");
export const avatar = document.getElementById("profile__avatar");
export const editAvatarModal = document.querySelector("#editAvatarModal");
export const editAvatarForm = editAvatarModal.querySelector(".modal__form");
export const avatarSubmitButton =
  editAvatarModal.querySelector(".modal__button");
