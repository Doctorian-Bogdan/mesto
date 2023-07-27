import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js"
import './index.css';
import PopupWithDelete from "../components/PopupWithDelete.js";

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
const imagePopupElement = new PopupWithImage(imagePopup);

//Delete popup
const deletePopup = '#deletePopup';

//Profile popup
const profilePopup = '#profilePopup'
const btnOpenProfile = document.querySelector('.profile__picture-overlay');
const btnCloseProfilePopup = document.querySelector('#closeProfilePopup');

const galleryElement = '.gallery';

const popupList = [popupEdit, popupAddPlace, imagePopup, deletePopup, profilePopup];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const validatingForms = {};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '82d0ccab-52ba-4557-bc20-c656d282efa0',
    'Content-Type': 'application/json'
  }
});

const userId = await api.getUserInfo().then((res) => {return res._id});

const gallery = new Section({items: await api.getInitialCards().then((res) => {return res}), renderer: (cardInfo) => {
    const element = createCard(cardInfo, userId, '#galleryCard', handleCardClick, handleCardDelete, handleLikeAdd, handleLikeDelete);

    checkImgError(element);

    gallery.addItem(element);
  }},galleryElement);

gallery.renderItems();

const userInfo = new UserInfo('.profile__name', '.profile__bio', '.profile__picture');

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about)
  userInfo.setUserAvatar(res.avatar);
});

const editPopupElement = new PopupWithForm(
  popupEdit,
  (inputs) => {
    return api.editUserInfo(inputs.name, inputs.bio).then((res) => {
      userInfo.setUserInfo(res.name, res.about)
    })
    //editPopupElement.close();
  }
);

editPopupElement.setEventListeners();

function createCard(cardInfo, userId, cardSelector, handleCardClick, handleCardDelete, handleLikeAdd, handleLikeDelete) {
  return new Card(cardInfo, userId, cardSelector, handleCardClick, handleCardDelete, handleLikeAdd, handleLikeDelete).createCard();
}

function checkImgError(element) {

  const elementImage = element.querySelector('.gallery__image');

  elementImage.onerror = function () {
    elementImage.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
  };
}

function handleLikeAdd(id, card) {
  const elementLikeButton = card.querySelector('.gallery__like');
  const elementLikeCount = card.querySelector('.gallery__like-count');

  api.setLike(id).then((res) => {
    elementLikeButton.classList.add('gallery__like_active');
    elementLikeCount.textContent = res.likes.length;
  })
}

function handleLikeDelete(id, card) {
  const elementLikeButton = card.querySelector('.gallery__like');
  const elementLikeCount = card.querySelector('.gallery__like-count');

  api.deleteLike(id).then((res) => {
    elementLikeButton.classList.remove('gallery__like_active');
    elementLikeCount.textContent = res.likes.length;
  })
}

function handleDelete(id, card) {
  api.deleteCard(id).then(() => {deletePopupElement.close(); card.remove()})
}

function handleCardDelete(id, card) {
  deletePopupElement.open()
  deletePopupElement.delete(id, card)
}

function handleCardClick(name, link) {
  imagePopupElement.open(name, link);
}

const deletePopupElement = new PopupWithDelete(deletePopup, handleDelete);

deletePopupElement.setEventListeners()

const addPlacePopupElement = new PopupWithForm(
  popupAddPlace,
  async (inputs) => {
    let element;

    await api.addNewCard(inputs.name, inputs.link).then((res) => {
      element = createCard({name: res.name, link: res.link, likes: res.likes, owner: res.owner, _id: res._id}, userId, '#galleryCard', handleCardClick, handleCardDelete, handleLikeAdd, handleLikeDelete);
    })

    checkImgError(element);
    gallery.addItem(element);

    addPlacePopupElement.close();
  }
);

addPlacePopupElement.setEventListeners();

const profilePopupElement = new PopupWithForm(
  profilePopup,
  (inputs) => {
    return api.updateProfilePicture(inputs.link).then((res) => {
      userInfo.setUserAvatar(res.avatar);
      profilePopupElement.close();
    })
  }
);

profilePopupElement.setEventListeners()

function enableValidation(validateObj) {
  const formsList = Array.from(document.querySelectorAll(validateObj.formSelector));

  formsList.forEach((formElement) => {
    const validateForm = new FormValidator(validateObj, formElement);
    validateForm.enableValidation();
    validatingForms[formElement.id] = validateForm;
  })
}

enableValidation(validationConfig);

btnEdit.addEventListener('click', () => {
  validatingForms.editForm.resetErrors();

  editPopupElement.open();

  const user = userInfo.getUserInfo();
  nameInput.value = user.name;
  bioInput.value = user.bio;
});
btnCloseEditPopup.addEventListener('click',() => editPopupElement.close());
btnAddPlace.addEventListener('click',() => {
  validatingForms.addPlaceForm.resetErrors();

  addPlacePopupElement.open();
});
btnCloseAddPopup.addEventListener('click',() => addPlacePopupElement.close());

btnOpenProfile.addEventListener('click', () => {
  validatingForms.profileForm.resetErrors();

  profilePopupElement.open()
});

btnCloseProfilePopup.addEventListener('click', () => profilePopupElement.close())

popupList.forEach((popup) => {
  new Popup(popup).setEventListeners()
});
