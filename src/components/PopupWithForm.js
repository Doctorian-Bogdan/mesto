import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._button = this._popup.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const initialText = this._button.textContent;

      this._button.textContent = 'Сохранение...';

      this._submit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._button.textContent = initialText;
        })
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
