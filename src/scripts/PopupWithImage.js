import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, placeImage) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupSubtitle = this._popup.querySelector('.popup__subtitle');
    this._cardImage = placeImage;
  }

  open() {
    super.open();

    this._popupImage.src = this._cardImage.src;
    this._popupImage.alt = this._cardImage.alt;
    this._popupSubtitle.textContent = this._cardImage.alt;
  }
}
