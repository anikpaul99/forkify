import * as Model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

/**
 * Will control loading and rendering recipe data.
 * @returns {undefined}
 * @author Anik Paul
 */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(Model.getSearchResultsPage());

    // 1) Loading recipe
    await Model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(Model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

/**
 * Will control loading and rendering searched recipe data.
 * @returns {undefined}
 * @author Anik Paul
 */
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await Model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(Model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(Model.state.search);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Will control rendering new recipe data according the the page number. Will update the pagination buttons according to that new results.
 * @returns {undefined}
 * @author Anik Paul
 */
const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(Model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(Model.state.search);
};

/**
 * Will handle updating the service and recipe according to new servings
 * @returns {undefined}
 * @author Anik Paul
 */
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  Model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(Model.state.recipe);
};

/**
 * Will execute as soon as application starts anc call 'addHandlerRender() with the control function.
 * @author Anik Paul
 */
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
