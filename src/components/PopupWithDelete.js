import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(selector) {
    super(selector);
    this._deleteButton = this._popup.querySelector('.popup__button');
  }

  setSubmit(submit) {
    this._handleDelete = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => this._handleDelete())
  }
}
