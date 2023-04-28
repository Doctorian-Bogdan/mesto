let editBtn = document.querySelector('.profile__edit-btn');
let closeEditPopupBtn = document.querySelector('#closeEditPopup');
let editPopup = document.querySelector('#editPopup');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let editForm = document.querySelector('#editForm');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');

let addPlaceBtn = document.querySelector('.profile__button');
let closeAddPopupBtn = document.querySelector('#closeAddPopup');
let addPlacePopup = document.querySelector('#addPlacePopup');
let addPlaceForm = document.querySelector('#addPlaceForm');
let placeNameInput = document.querySelector('#placeNameInput');
let placeLinkInput = document.querySelector('#placeLinkInput');

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
closeEditPopupBtn.addEventListener('click',() => closePopup(editPopup));
editForm.addEventListener('submit',(event) => handleFormSubmit(event, editPopup));

addPlaceBtn.addEventListener('click',() => openPopup(addPlacePopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPlacePopup));
addPlaceForm.addEventListener('submit', (event) => handleFormSubmit(event, addPlacePopup));


