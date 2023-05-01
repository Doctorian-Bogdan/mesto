//Edit popup
const editBtn = document.querySelector('.profile__edit-btn');
const closeEditPopupBtn = document.querySelector('#closeEditPopup');
const editPopup = document.querySelector('#editPopup');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editForm = document.querySelector('#editForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');

//Add place popup
const addPlaceBtn = document.querySelector('.profile__button');
const closeAddPopupBtn = document.querySelector('#closeAddPopup');
const addPlacePopup = document.querySelector('#addPlacePopup');
const addPlaceForm = document.querySelector('#addPlaceForm');
const placeNameInput = document.querySelector('#placeNameInput');
const placeLinkInput = document.querySelector('#placeLinkInput');

//Image popup
const imagePopup = document.querySelector('#imagePopup');
const closeImagePopupBtn = document.querySelector('#closeImagePopup');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopSubtitle = document.querySelector('.popup__subtitle');


const gallery = document.querySelector('.gallery');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt, popup) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileBio.textContent = jobValue;
  closePopup(popup);
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

  placeImage.onerror = function () {
    placeImage.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
  };

  function handleLike() {
    placeLikeButton.classList.toggle('gallery__like_active');
  }

  function handleDelete() {
    placeCard.remove();
  }

  function handleModal() {
    imagePopupImage.src = placeImage.src;
    imagePopupImage.alt = placeImage.alt;
    imagePopSubtitle.textContent = placeImage.alt;

    openPopup(imagePopup);
  }

  placeLikeButton.addEventListener('click', handleLike);
  placeDeleteButton.addEventListener('click', handleDelete);
  placeImage.addEventListener('click', handleModal);

  return placeElement;
}

function addPlace(evt, name, link) {
  evt.preventDefault();

  const element = createPlaceElement({name: name, link: link});

  gallery.prepend(element);

  addPlaceForm.reset();

  closePopup(addPlacePopup);
}

function handleCloseButton(btn, closeBtn, popup) {
  btn.addEventListener('click',() => openPopup(popup));
  closeBtn.addEventListener('click',() => closePopup(popup));
}

handleCloseButton(editBtn, closeEditPopupBtn, editPopup);
handleCloseButton(addPlaceBtn, closeAddPopupBtn, addPlacePopup);

editForm.addEventListener('submit',(event) => handleProfileFormSubmit(event, editPopup));
addPlaceForm.addEventListener('submit',(event) => addPlace(event, placeNameInput.value, placeLinkInput.value));

closeImagePopupBtn.addEventListener('click', () => closePopup(imagePopup));

initialCards.forEach((cardInfo) => {
  const element = createPlaceElement(cardInfo);
  gallery.append(element);
});

