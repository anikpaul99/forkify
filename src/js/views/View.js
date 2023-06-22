import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @returns {undefined | string} a markup string is returned for invalid data
   * @this {Object} View instance
   * @author Anik Paul
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Create a new markup. Then will compare this new html to to the current html. Then change 'text' and 'attribute' that actually has changed from the old version to the new version.
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @returns {undefined | string} a markup string is returned for invalid data otherwise the new markup
   * @this {Object} View instance
   * @author Anik Paul
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  /**
   * Clear the element in DOM before loading a recipe
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render a loading spinner to the DOM
   * @returns {undefined}
   * @this {Object} View instance
   * @author Anik Paul
   */
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>            
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render an error message.
   * @param {string} message the error message to be rendered
   * @returns {undefined}
   * @this {Object} View instance
   * @author Anik Paul
   */
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>;
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render an success message.
   * @param {string} message the success message to be rendered
   * @returns {undefined}
   * @this {Object} View instance
   * @author Anik Paul
   */
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>;
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
