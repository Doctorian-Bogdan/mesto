export default class Card {
  constructor(cardData, cardSelector, handleModal) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleModal = handleModal;
  }

  _setElements() {
    this._element = document.querySelector(this._cardSelector).content.cloneNode(true);
    this._elementCard = this._element.querySelector('.gallery__card');
    this._elementImage = this._element.querySelector('.gallery__image');
    this._elementTitle = this._element.querySelector('.gallery__title');
    this._elementLikeButton = this._element.querySelector('.gallery__like');
    this._elementDeleteButton = this._element.querySelector('.gallery__delete-btn');
  }

  _fillCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    // this._elementImage.onerror = function() {
    //   this._elementImage.src = 'https://labrika.ru/static/upload/03/56/03569c9d99f17582dd6ae082a913fc9b.png';
    // };
  }

  _handleLike() {
    this._elementLikeButton.classList.toggle('gallery__like_active');
  }

  _handleDelete() {
    this._elementCard.remove();
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => this._handleLike())
    this._elementDeleteButton.addEventListener('click', () => this._handleDelete())
    this._elementImage.addEventListener('click', () => this._handleModal(this._elementImage))
  }

  createCard() {
    this._setElements();
    this._fillCard();
    this._setEventListeners();

    return this._element;
  }
}
