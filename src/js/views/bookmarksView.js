import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it ;)`;
  _message = '';

  /**
   * will listen for load event
   * @param {Function} handler the control function (controlBookmarks), which will be executed as soon as the event happens.
   * @returns {undefined}
   * @author Anik Paul
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generate a markup string of a searched recipe
   * @returns {string}
   * @author Anik Paul
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
