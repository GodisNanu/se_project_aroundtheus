import Api from "../components/Api.js";
import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ae6b9f6f-b246-460f-9f1b-c55dcebd386d",
    "Content-Type": "application/json",
  },
});

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

const handleDeleteCard = (id) => {
  api
    .deleteCards(id)
    .then(() => {
      popupAffirm.close();
      card.handleDeleteCard();
    })
    .catch((err) => {
      console.error(err);
    });
};

const popupAffirm = new PopupWithConfirm("#deleteCardModal", (id) =>
  handleDeleteCard(id)
);
popupAffirm.setEventListeners();

let newCardList;
let card;

api
  .getInitialCards()
  .then((res) => {
    newCardList = new Section(
      { items: res, renderer: createCard },
      ".cards__list"
    );
    newCardList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

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
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function createCard(cardData) {
  card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    (id) => handleDeleteClick(id),
    (id) => handleLikeClick(id)
  );
  return card.getView();
}

function handleImageClick(name, link) {
  newPopupImage.open(name, link);
}

function handleDeleteClick(id) {
  popupAffirm.open(id);
}

function handleLikeClick(card) {
  if (card.isLiked === true) {
    api
      .deleteCardLike(card._id)
      .then((res) => {
        card.isLiked = false;
        card.handleLikeIcon();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .putCardLike(card._id)
      .then((res) => {
        card.isLiked = true;
        card.handleLikeIcon();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleProfileFormSubmit(formData) {
  api
    .updateProfileInfo(formData.title, formData.description)
    .then((res) => {
      useInfo.setUserInfo(res.name, res.about);
      editPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleCardFormSubmit(name, link) {
  api
    .createCards(name, link)
    .then((res) => {
      newCardList.addItem(res);
      cardPopup.close();
      constants.addCardForm.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}
