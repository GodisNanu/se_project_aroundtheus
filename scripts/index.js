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
const editProfileCloseButton = editModal.querySelector(".modal__close");
const addButton = document.querySelector("#addButton");
const addModal = document.querySelector("#addModal");
const viewPicModal = document.querySelector("#viewPicModal");
const addCardCloseButton = addModal.querySelector(".modal__close");
const viewPicCloseButton = viewPicModal.querySelector(".modal__close");
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
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openPopup(viewPicModal);
    viewPicModalImage.src = cardData.link;
    viewPicModalImage.alt = cardData.name;
    viewPicModalTitle.textContent = cardData.name;
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editModal);
});

editProfileCloseButton.addEventListener("click", () => {
  closePopup(editModal);
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

addCardCloseButton.addEventListener("click", () => {
  closePopup(addModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addCard = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  const card = getCardElement(addCard);
  cardList.prepend(card);
  closePopup(addModal);
  addCardForm.reset();
});

viewPicCloseButton.addEventListener("click", () => {
  closePopup(viewPicModal);
});

allModals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});

allModals.forEach((modal) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup(modal);
    }
  });
});
