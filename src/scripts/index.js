import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import {initialCards} from './cards.js';

//Edit popup
const popupEdit = '#editPopup';
const btnEdit = document.querySelector('.profile__edit-btn');
const btnCloseEditPopup = document.querySelector('#closeEditPopup');
const nameInput = document.querySelector('#nameInput');
const bioInput = document.querySelector('#bioInput');

//Add place popup
const popupAddPlace = '#addPlacePopup';
const btnAddPlace = document.querySelector('.profile__button');
const btnCloseAddPopup = document.querySelector('#closeAddPopup');

//Image popup
const imagePopup = '#imagePopup';

const galleryElement = document.querySelector('.gallery');

const popupList = [popupEdit, popupAddPlace, imagePopup];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const gallery = new Section({items: initialCards, renderer: (cardInfo) => {
    const element = createCard(cardInfo, '#galleryCard', handleCardClick);

    checkImgError(element);

    gallery.addItem(element);
  }},'.gallery');

gallery.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__bio');

const editPopupElement = new PopupWithForm(
  popupEdit,
  (inputs) => {
    userInfo.setUserInfo(inputs.name, inputs.bio)
    editPopupElement.close();
  }
);

editPopupElement.setEventListeners();

function createCard(cardInfo, cardSelector, handleCardClick) {
  return new Card(cardInfo, cardSelector, handleCardClick).createCard();
}

function checkImgError(element) {
  const elementImage = element.querySelector('.gallery__image');

  elementImage.onerror = function () {
    elementImage.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
  };
}

function handleCardClick(placeImage) {
  new PopupWithImage(imagePopup, placeImage).open();
}

const addPlacePopupElement = new PopupWithForm(
  popupAddPlace,
  (inputs) => {
    const element = createCard({name: inputs.name, link: inputs.link}, '#galleryCard', handleCardClick);

    checkImgError(element);
    gallery.addItem(element);

    addPlacePopupElement.close();
  }
);

addPlacePopupElement.setEventListeners();

function enableValidation(validateObj) {
  const formsList = Array.from(document.querySelectorAll(validateObj.formSelector));

  formsList.forEach((formElement) => {
    const validateForm = new FormValidator(validateObj, formElement);
    validateForm.enableValidation();
  })
}

enableValidation(validationConfig);

btnEdit.addEventListener('click', () => {
  editPopupElement.open();

  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  bioInput.value = user.bio;
});
btnCloseEditPopup.addEventListener('click',() => editPopupElement.close());
btnAddPlace.addEventListener('click',() => addPlacePopupElement.open());
btnCloseAddPopup.addEventListener('click',() => addPlacePopupElement.close());

popupList.forEach((popup) => {
  new Popup(popup).setEventListeners()
});
