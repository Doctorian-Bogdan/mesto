let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-button');
let editPopup = document.querySelector('#editPopup');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt, popup) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileBio.textContent = jobValue;
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click',() => openPopup(editPopup));
closeBtn.addEventListener('click',() => closePopup(editPopup));
formElement.addEventListener('submit',(event) => handleFormSubmit(event, editPopup));
