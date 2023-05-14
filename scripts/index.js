//Edit popup
const btnEdit = document.querySelector('.profile__edit-btn');
const btnCloseEditPopup = document.querySelector('#closeEditPopup');
const popupEdit = document.querySelector('#editPopup');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const formEdit = document.querySelector('#editForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');

//Add place popup
const btnAddPlace = document.querySelector('.profile__button');
const btnCloseAddPopup = document.querySelector('#closeAddPopup');
const PopupAddPlace = document.querySelector('#addPlacePopup');
const formAddPlace = document.querySelector('#addPlaceForm');
const placeNameInput = document.querySelector('#placeNameInput');
const placeLinkInput = document.querySelector('#placeLinkInput');

//Image popup
const imagePopup = document.querySelector('#imagePopup');
const btnCloseImagePopup = document.querySelector('#closeImagePopup');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopSubtitle = document.querySelector('.popup__subtitle');

const galleryElement = document.querySelector('.gallery');
const popupList = Array.from(document.querySelectorAll('.popup'));

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupEdit);
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

  galleryElement.prepend(element);

  formAddPlace.reset();

  closePopup(PopupAddPlace);
}

btnEdit.addEventListener('click', openEditPopup);
btnCloseEditPopup.addEventListener('click',() => closePopup(popupEdit));

btnAddPlace.addEventListener('click',() => openPopup(PopupAddPlace));
btnCloseAddPopup.addEventListener('click',() => closePopup(PopupAddPlace));

formEdit.addEventListener('submit',(event) => handleProfileFormSubmit(event, popupEdit));
formAddPlace.addEventListener('submit',(event) => addPlace(event, placeNameInput.value, placeLinkInput.value));

btnCloseImagePopup.addEventListener('click', () => closePopup(imagePopup));

initialCards.forEach((cardInfo) => {
  const element = createPlaceElement(cardInfo);
  galleryElement.append(element);
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.className.includes('popup_opened')) {
      closePopup(evt.target);
    }
  })
})
