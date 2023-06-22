import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Oops! No recipes found for your query. Please try again!`;
  _message = '';

  /**
   * Generate a markup string of a searched recipe
   * @returns {string}
   * @author Anik Paul
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
