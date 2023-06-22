class SearchView {
  _parentElement = document.querySelector('.search');

  /**
   * will return the query string for a recipe from the search field
   * @returns {string} query the query string from the search field
   */
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * Clear the input value in search field after a search
   */
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  /**
   * will listen for submit event
   * @param {Function} handler the control function (controlSearchResults), which will be executed as soon as the event happens.
   * @returns {undefined}
   * @author Anik Paul
   */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
