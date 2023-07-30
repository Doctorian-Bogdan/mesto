import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js"
import './index.css';
import PopupWithDelete from "../components/PopupWithDelete.js";
import { validationConfig, popupAddPlace, popupEdit, deletePopup, imagePopup, profilePopup, galleryElement } from "../utils/constants.js"

//Edit popup
const btnEdit = document.querySelector('.profile__edit-btn');
const btnCloseEditPopup = document.querySelector('#closeEditPopup');
const nameInput = document.querySelector('#nameInput');
const bioInput = document.querySelector('#bioInput');

//Add place popup
const btnAddPlace = document.querySelector('.profile__button');
const btnCloseAddPopup = document.querySelector('#closeAddPopup');

//Image popup
const imagePopupElement = new PopupWithImage(imagePopup);
imagePopupElement.setEventListeners()

//Profile popup
const btnOpenProfile = document.querySelector('.profile__picture-overlay');
const btnCloseProfilePopup = document.querySelector('#closeProfilePopup');

const validatingForms = {};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '82d0ccab-52ba-4557-bc20-c656d282efa0',
    'Content-Type': 'application/json'
  }
});

let userId

let gallery

const userInfo = new UserInfo('.profile__name', '.profile__bio', '.profile__picture');

function createCard(cardInfo) {
  const cardElement = new Card(cardInfo, userId, '#galleryCard', handleCardClick,
    (id) => {
      deletePopupElement.open()
      deletePopupElement.setSubmit(() => {
        api.deleteCard(id)
          .then(() => {
            deletePopupElement.close();
            cardElement.removeCard();
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`)
          })
      })
    },
    (id) => {
      if(cardElement.isCardLiked()) {
        api.deleteLike(id)
          .then((res) => {
            cardElement.handleLike(res.likes)
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`)
          })
      } else {
        api.setLike(id)
          .then((res) => {
            cardElement.handleLike(res.likes)
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`)
          })
      }
    })
  return cardElement.createCard()
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;

    gallery = new Section({items: cards, renderer: (cardInfo) => {

    const element = createCard(cardInfo)

    checkImgError(element);

    gallery.addItem(element);

    }},galleryElement);

    gallery.renderItems();
  })
  .catch((err) => console.log(`Ошибка ${err}`))

const editPopupElement = new PopupWithForm(
  popupEdit,
  (inputs) => {
    return api.editUserInfo(inputs.name, inputs.bio)
      .then((res) => {
      userInfo.setUserInfo(res.name, res.about)
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }
);

editPopupElement.setEventListeners();

function checkImgError(element) {

  const elementImage = element.querySelector('.gallery__image');

  elementImage.onerror = function () {
    elementImage.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
  };
}

function handleCardClick(name, link) {
  imagePopupElement.open(name, link);
}

const deletePopupElement = new PopupWithDelete(deletePopup);

deletePopupElement.setEventListeners()

const addPlacePopupElement = new PopupWithForm(
  popupAddPlace,
  async (inputs) => {
    let element;

    await api.addNewCard(inputs.name, inputs.link)
      .then((res) => {
      element = createCard({name: res.name, link: res.link, likes: res.likes, owner: res.owner, _id: res._id});
      })
      .catch((err) => console.log(`Ошибка ${err}`))

    checkImgError(element);
    gallery.addItem(element);

    addPlacePopupElement.close();
  }
);

addPlacePopupElement.setEventListeners();

const profilePopupElement = new PopupWithForm(
  profilePopup,
  (inputs) => {
    return api.updateProfilePicture(inputs.link)
      .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      profilePopupElement.close();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
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

