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

const avatarPopup = new PopupWithForm(
  "#editAvatarModal",
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

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
    addFormValidator.resetValidation();
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
  constants.editProfileSubmitButton.textContent = "Saving...";
  api
    .updateProfileInfo(formData.title, formData.description)
    .then((res) => {
      useInfo.setUserInfo(res.name, res.about);
      editPopup.close();
      constants.editProfileSubmitButton.textContent = "Save";
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleCardFormSubmit(name, link) {
  constants.addCardSubmitButton.textContent = "Saving...";
  api
    .createCards(name, link)
    .then((res) => {
      newCardList.addItem(res);
      cardPopup.close();
      constants.addCardForm.reset();
      constants.addCardSubmitButton.textContent = "Save";
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAvatarFormSubmit(inputObj) {
  constants.avatarSubmitButton.textContent = "Saving...";
  api
    .updateAvatar(inputObj.link)
    .then(() => {
      document.getElementById("profile__avatar").src = inputObj.link;
      avatarPopup.close();
      constants.avatarSubmitButton.textContent = "Save";
    })
    .catch((err) => {
      console.error(err);
    });
}
