import * as Model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

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
    resultsView.render(Model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Will execute as soon as application starts anc call 'addHandlerRender() with the control function.
 * @author Anik Paul
 */
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
