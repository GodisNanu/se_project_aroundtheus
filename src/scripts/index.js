import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
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

  const newPopupImage = new PopupWithImage("#viewPicModal");
  newPopupImage.setEventListeners("#viewPicModal");

  const editPopup = new PopupWithForm("#editModal", handleFormSubmit);
  editPopup.setEventListeners("#editModal");

  const cardPopup = new PopupWithForm("#addModal", handleFormSubmit);
  cardPopup.setEventListeners("#addModal");

  const newCardList = new Section(
    { items: constants.initialCards, renderer: createCard },
    ".cards__list"
  );

  const useInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
  });

  /* -------------------------------------------------------------------------- */
  /*                               Event Listeners                              */
  /* -------------------------------------------------------------------------- */

  constants.editButton.addEventListener("click", () => {
    constants.profileNameInput.value = constants.profileName.textContent;
    constants.profileDescriptionInput.value =
      constants.profileDescription.textContent;
    editPopup.open("#editModal");
    editFormValidator.resetValidation();
  });

  constants.addButton.addEventListener("click", () => {
    cardPopup.open("#addModal");
  });

  constants.addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const addCard = {
      name: constants.addCardTitleInput.value,
      link: constants.addCardLinkInput.value,
    };
    getCard(addCard);
    cardPopup.close("#addModal");
    constants.addCardForm.reset();
    addFormValidator.resetValidation();
  });

  newCardList.renderItems();
});

const useInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editPopup = new PopupWithForm("#editModal", handleFormSubmit);
editPopup.setEventListeners("#editModal");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(cardData) {
  newPopupImage.open("#viewPicModal");
  constants.viewPicModalImage.src = cardData.link;
  constants.viewPicModalImage.alt = cardData.name;
  constants.viewPicModalTitle.textContent = cardData.name;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const nameValue = document.querySelector("#name-input").value;
  const jobValue = document.querySelector("#description-input").value;

  useInfo.setUserInfo(nameValue, jobValue);
  editPopup.close("#editModal");
}
