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

const editBtn = document.querySelector('.profile__edit-btn');
const closeEditPopupBtn = document.querySelector('#closeEditPopup');
const editPopup = document.querySelector('#editPopup');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editForm = document.querySelector('#editForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');

const addPlaceBtn = document.querySelector('.profile__button');
const closeAddPopupBtn = document.querySelector('#closeAddPopup');
const addPlacePopup = document.querySelector('#addPlacePopup');
const addPlaceForm = document.querySelector('#addPlaceForm');
const placeNameInput = document.querySelector('#placeNameInput');
const placeLinkInput = document.querySelector('#placeLinkInput');

const gallery = document.querySelector('.gallery');

const body = document.querySelector('.body');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt, popup) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

function createPlaceElement(placeInfo) {
  const placeElement = document.querySelector('#galleryCard').content.cloneNode(true);

  const placeCard = placeElement.querySelector('.gallery__card');
  const placeImage = placeElement.querySelector('.gallery__image');
  const placeTitle = placeElement.querySelector('.gallery__title');
  const placeLikeButton = placeElement.querySelector('.gallery__like');
  const placeDeleteButton = placeElement.querySelector('.gallery__delete-btn');

  placeImage.src = placeInfo.link;
  placeImage.alt = placeInfo.name;
  placeTitle.textContent = placeInfo.name;

  function handleLike() {
    placeLikeButton.classList.toggle('gallery__like_active');
  }

  function handleDelete() {
    placeCard.remove();
  }

  placeLikeButton.addEventListener('click', handleLike);
  placeDeleteButton.addEventListener('click', handleDelete);

  return placeElement;
}

function createPlacePopup(placeInfo) {
  const placePopup = document.querySelector('#galleryPopup').content.cloneNode(true);

  const placeImage = placePopup.querySelector('.gallery-popup__image');
  const placeTitle = placePopup.querySelector('.gallery-popup__title');

  placeImage.src = placeInfo.link;
  placeImage.alt = placeInfo.name;
  placeTitle.textContent = placeInfo.name;

  return placePopup;
}

function addPlaceElement(cardInfo) {
  const element = createPlaceElement(cardInfo);
  const popup = createPlacePopup(cardInfo);
  const galleryPopup = popup.querySelector('.gallery-popup');
  const image = element.querySelector('.gallery__image');
  const closeBtn = popup.querySelector('.popup__close-button');
  const popupImage = popup.querySelector('.gallery-popup__image');

  image.onerror = function () {
    image.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
    popupImage.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
  };

  image.addEventListener('click',() => openPopup(galleryPopup));
  closeBtn.addEventListener('click',() => closePopup(galleryPopup));

  gallery.prepend(element);
  body.append(popup);
}

function addPlace(evt, name, link) {
  evt.preventDefault();

  addPlaceElement({name: name, link: link});

  placeNameInput.value = null;
  placeLinkInput.value = null

  closePopup(addPlacePopup);
}

function handleCloseButton(btn, closeBtn, popup) {
  btn.addEventListener('click',() => openPopup(popup));
  closeBtn.addEventListener('click',() => closePopup(popup));
}

handleCloseButton(editBtn, closeEditPopupBtn, editPopup);
handleCloseButton(addPlaceBtn, closeAddPopupBtn, addPlacePopup);

editForm.addEventListener('submit',(event) => handleFormSubmit(event, editPopup));
addPlaceForm.addEventListener('submit',(event) => addPlace(event, placeNameInput.value, placeLinkInput.value));

initialCards.forEach((cardInfo) => {
  addPlaceElement(cardInfo);
});

