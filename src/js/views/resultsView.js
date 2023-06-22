import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Oops! No recipes found for your query. Please try again!`;
  _message = '';

  /**
   * Generate a markup string of a searched recipe
   * @returns {string}
   * @this {Object} ResultsView instance
   * @author Anik Paul
   */
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  /**
   * generate a markup string of lists of searched recipes data.
   * @param {Object} result result of the searcjed recipe query
   * @returns {string} a markup string is returned
   * @author Anik Paul
   */
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
  </li>;
    `;
  }
}

export default new ResultsView();
