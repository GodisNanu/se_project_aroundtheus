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

const editPopup = new PopupWithForm("#editModal", submitProfileInfo);
editPopup.setEventListeners();

const newPopupImage = new PopupWithImage("#viewPicModal");
newPopupImage.setEventListeners();

const cardPopup = new PopupWithForm("#addModal", submitProfileInfo);
cardPopup.setEventListeners();

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

  const newCardList = new Section(
    { items: constants.initialCards, renderer: createCard },
    ".cards__list"
  );

  /* -------------------------------------------------------------------------- */
  /*                               Event Listeners                              */
  /* -------------------------------------------------------------------------- */

  constants.editButton.addEventListener("click", () => {
    constants.profileNameInput.value = constants.profileName.textContent;
    constants.profileDescriptionInput.value =
      constants.profileDescription.textContent;
    editPopup.open();
    editFormValidator.resetValidation();
  });

  constants.addButton.addEventListener("click", () => {
    cardPopup.open();
  });

  constants.addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const addCard = {
      name: constants.addCardTitleInput.value,
      link: constants.addCardLinkInput.value,
    };
    newCardList.addItem(addCard);
    cardPopup.close();
    constants.addCardForm.reset();
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

//Needs Correction - should be handled with newPopupImage.open()- only
function handleImageClick(cardData) {
  newPopupImage.open("#viewPicModal");
  constants.viewPicModalImage.src = cardData.link;
  constants.viewPicModalImage.alt = cardData.name;
  constants.viewPicModalTitle.textContent = cardData.name;
}

function submitProfileInfo(e) {
  e.preventDefault();
  const nameValue = document.querySelector("#name-input").value;
  const jobValue = document.querySelector("#description-input").value;

  useInfo.setUserInfo(nameValue, jobValue);
  editPopup.close();
}
