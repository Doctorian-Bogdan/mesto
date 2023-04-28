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
let cardTemplate = document.querySelector('#galleryCard').content;
let gallery = document.querySelector('.gallery');

let imageTemplate = document.querySelector('#galleryPopup').content;
let body = document.querySelector('.body');

initialCards.forEach(function (cardInfo) {
  let galleryCard = cardTemplate.cloneNode(true);
  galleryCard.querySelector('.gallery__image').src = cardInfo.link;
  galleryCard.querySelector('.gallery__image').alt = cardInfo.name;
  galleryCard.querySelector('.gallery__image').onclick = openImage;
  galleryCard.querySelector('.gallery__title').textContent = cardInfo.name;
  gallery.append(galleryCard);
});

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

function addPlace(evt, popup) {
  evt.preventDefault();
  let galleryCard = cardTemplate.cloneNode(true);
  if (placeLinkInput.value && placeNameInput.value) {
    galleryCard.querySelector('.gallery__image').src = placeLinkInput.value;
    galleryCard.querySelector('.gallery__image').alt = placeNameInput.value;
    galleryCard.querySelector('.gallery__image').onclick = openImage;
    galleryCard.querySelector('.gallery__title').textContent = placeNameInput.value;
    gallery.prepend(galleryCard);
  } else {
    galleryCard.querySelector('.gallery__image').src = 'https://animals.pibig.info/uploads/posts/2023-03/thumbs/1680281518_animals-pibig-info-p-kotik-prosit-zhivotnie-pinterest-1.jpg';
    galleryCard.querySelector('.gallery__image').alt = 'котик';
    galleryCard.querySelector('.gallery__image').onclick = openImage;
    galleryCard.querySelector('.gallery__title').textContent = 'Тут пусто';
    gallery.prepend(galleryCard);
  }
  popup.classList.remove('popup_opened');
  placeNameInput.value = null;
  placeLinkInput.value = null;
}

function openImage() {
  let imageFullscreen = imageTemplate.cloneNode(true);
  imageFullscreen.querySelector('.gallery-popup__image').src = this.src;
  imageFullscreen.querySelector('.gallery-popup__image').alt = this.alt;
  imageFullscreen.querySelector('.gallery-popup__title').textContent = this.alt;
  body.append(imageFullscreen);
  let closeImageBtn = document.querySelector('#closeImageBtn');
  function closeImage() {
    document.querySelector('.gallery-popup').remove();
  }
  closeImageBtn.addEventListener('click', closeImage);
}

editBtn.addEventListener('click',() => openPopup(editPopup));
closeEditPopupBtn.addEventListener('click',() => closePopup(editPopup));
editForm.addEventListener('submit',(event) => handleFormSubmit(event, editPopup));

addPlaceBtn.addEventListener('click',() => openPopup(addPlacePopup));
closeAddPopupBtn.addEventListener('click', () => closePopup(addPlacePopup));
addPlaceForm.addEventListener('submit',(event) => addPlace(event, addPlacePopup));


