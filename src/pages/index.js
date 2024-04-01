import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const useInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editPopup = new PopupWithForm("#editModal", handleProfileFormSubmit);
editPopup.setEventListeners();

const newPopupImage = new PopupWithImage("#viewPicModal");
newPopupImage.setEventListeners();

const cardPopup = new PopupWithForm("#addModal", handleCardFormSubmit);
cardPopup.setEventListeners();

const newCardList = new Section(
  { items: constants.initialCards, renderer: createCard },
  ".cards__list"
);

document.addEventListener("DOMContentLoaded", function () {
  const addFormValidator = new FormValidator(
    constants.formValidationConfig,
    constants.addCardForm
  );

  const editFormValidator = new FormValidator(
    constants.formValidationConfig,
    constants.profileEditForm
  );

  addFormValidator.enableValidation();
  editFormValidator.enableValidation();

  /* -------------------------------------------------------------------------- */
  /*                               Event Listeners                              */
  /* -------------------------------------------------------------------------- */

  constants.editButton.addEventListener("click", () => {
    const getUser = useInfo.getUserInfo();
    constants.profileNameInput.value = getUser.name;
    constants.profileDescriptionInput.value = getUser.job;
    editPopup.open();
    editFormValidator.resetValidation();
  });

  constants.addButton.addEventListener("click", () => {
    cardPopup.open();
    addFormValidator.resetValidation();
  });

  newCardList.renderItems();
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(name, link) {
  newPopupImage.open(name, link);
}

function handleProfileFormSubmit(formData) {
  useInfo.setUserInfo(formData.title, formData.description);
  editPopup.close();
}

function handleCardFormSubmit(name, link) {
  newCardList.addItem(name, link);
  cardPopup.close();
  constants.addCardForm.reset();
}
