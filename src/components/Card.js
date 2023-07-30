export default class Card {
  constructor(cardData, userId, cardSelector, handleCardClick, handleCardDelete, handleLikeClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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
    this.handleLike(this._likes);
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => this._handleLikeClick(this._cardId))
    this._elementDeleteButton.addEventListener('click', () => this._handleCardDelete(this._cardId))
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._elementImage.src))
  }

  _checkDeleteAbility() {
    if(!(this._userId === this._ownerId)) {
      this._elementDeleteButton.classList.add('gallery__delete-btn_disabled');
    }
  }

  removeCard() {
    this._elementCard.remove();
    this._elementCard = null;
  }

  isCardLiked() {
    return this._likes.find((user) => {
      return user._id === this._userId
    })
  }

  handleLike(likes) {
    this._likes = likes;
    this._elementLikeCount.textContent = likes.length;

    if (this.isCardLiked()) {
      this._elementLikeButton.classList.add('gallery__like_active');
    } else {
      this._elementLikeButton.classList.remove('gallery__like_active');
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
