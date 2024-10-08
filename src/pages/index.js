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
  avatarSelector: ".profile__avatar",
});

const editPopup = new PopupWithForm("#editModal", handleProfileFormSubmit);
editPopup.setEventListeners();

const newPopupImage = new PopupWithImage("#viewPicModal");
newPopupImage.setEventListeners();

const cardPopup = new PopupWithForm("#addModal", handleCardFormSubmit);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  "#editAvatarModal",
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

const popupAffirm = new PopupWithConfirm("#deleteCardModal");
popupAffirm.setEventListeners();

let newCardList;

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

api
  .getUserInfo()
  .then((res) => {
    useInfo.setUserInfo(res.name, res.about);
    useInfo.setAvatar(res.avatar);
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

  const avatarFormValidator = new FormValidator(
    constants.formValidationConfig,
    constants.editAvatarForm
  );

  addFormValidator.enableValidation();
  editFormValidator.enableValidation();
  avatarFormValidator.enableValidation();

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

  constants.avatar.addEventListener("click", () => {
    avatarPopup.open();
    avatarFormValidator.resetValidation();
  });

  constants.avatar.addEventListener("mousemove", () => {
    constants.avatarButton.classList.replace(
      "profile__avatar-button_disabled",
      "profile__avatar-button"
    );
  });
});

constants.avatar.addEventListener("mouseout", () => {
  constants.avatarButton.classList.replace(
    "profile__avatar-button",
    "profile__avatar-button_disabled"
  );
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    (id) => handleDeleteClick(id),
    (id) => handleLikeClick(id)
  );
  return card.getView();
}

function handleImageClick(cardData) {
  newPopupImage.open(cardData);
}

function handleDeleteClick(card) {
  popupAffirm.open();
  popupAffirm.setSubmitAction(() => {
    api
      .deleteCards(card._id)
      .then(() => {
        popupAffirm.close();
        card.handleDeleteCard();
      })
      .catch(console.error);
  });
}

function handleLikeClick(card) {
  if (card.isLiked === true) {
    api
      .deleteCardLike(card._id)
      .then((res) => {
        card.isLiked = false;
        card.handleLikeIcon();
      })
      .catch(console.error);
  } else {
    api
      .putCardLike(card._id)
      .then((res) => {
        card.isLiked = true;
        card.handleLikeIcon();
      })
      .catch(console.error);
  }
}

function handleProfileFormSubmit(formData) {
  editPopup.renderLoading(true);
  api
    .updateProfileInfo(formData.title, formData.description)
    .then((res) => {
      useInfo.setUserInfo(res.name, res.about);
      editPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editPopup.renderLoading(false);
      editPopup.resetInputValues();
    });
}

function handleCardFormSubmit(formData) {
  cardPopup.renderLoading(true);
  api
    .createCards(formData)
    .then((res) => {
      newCardList.addItem(res);
      cardPopup.close();
      constants.addCardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      cardPopup.renderLoading(false);
      cardPopup.resetInputValues();
    });
}

function handleAvatarFormSubmit(inputObj) {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(inputObj.link)
    .then(() => {
      useInfo.setAvatar(inputObj.link);
      avatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarPopup.renderLoading(false);
      avatarPopup.resetInputValues();
    });
}
