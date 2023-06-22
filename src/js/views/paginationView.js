import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * will listen for click event
   * @param {Function} handler the control function (controlPagination), which will be executed as soon as the event happens.
   * @returns {undefined}
   * @author Anik Paul
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  /**
   * Generate a markup string of the pagination buttons according the different conditions.
   * @returns {string}
   * @this {Object} PaginationView instance
   * @author Anik Paul
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage + 1}</span>
        </button>
      `;
    }

    // Last pages
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other pages
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage + 1}</span>
        </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
