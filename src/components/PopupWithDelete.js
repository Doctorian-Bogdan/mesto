import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(selector, handleDelete) {
    super(selector);
    this._handleDelete = handleDelete;
    this._deleteButton = this._popup.querySelector('.popup__button');
  }

  delete(id, card) {
    this._deleteButton.addEventListener('click', () => this._handleDelete(id, card))
  }
}
