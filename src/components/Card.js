export default class Card {
  constructor(cardData, userId, cardSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likeCount = cardData.likes.length;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    this._element = document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _getElements() {
    this._elementCard = this._element.querySelector('.gallery__card');
    this._elementImage = this._element.querySelector('.gallery__image');
    this._elementTitle = this._element.querySelector('.gallery__title');
    this._elementLikeButton = this._element.querySelector('.gallery__like');
    this._elementLikeCount = this._element.querySelector('.gallery__like-count');
    this._elementDeleteButton = this._element.querySelector('.gallery__delete-btn');
  }

  _fillCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementLikeCount.textContent = this._likeCount;
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
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._elementImage.src))
  }

  _checkDeleteAbility() {
    if(!(this._userId === this._ownerId)) {
      this._elementDeleteButton.classList.add('gallery__delete-btn_disabled');
    }
  }

  createCard() {
    this._getCardTemplate();
    this._getElements();
    this._fillCard();
    this._setEventListeners();
    this._checkDeleteAbility();

    return this._element;
  }
}
