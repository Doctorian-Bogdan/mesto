let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileBio.textContent = jobValue;
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
