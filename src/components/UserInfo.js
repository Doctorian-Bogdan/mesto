export default class UserInfo {
  constructor(selectorName, selectorBio) {
    this._nameElement = document.querySelector(selectorName);
    this._bioElement = document.querySelector(selectorBio);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent
    }
  }

  setUserInfo(name, bio) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
  }
}
