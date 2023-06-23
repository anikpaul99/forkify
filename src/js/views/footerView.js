import View from './View.js';
class FooterView extends View {
  _parentElement = document.querySelector('.year');

  constructor() {
    super();

    // update current year
    this._updateCurrentYear();
  }

  _updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    this._parentElement.textContent = currentYear;
  }
}

export default new FooterView();
