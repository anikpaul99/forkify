import * as Model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(err);
  }
};

/**
 * Will execute as soon as application starts anc call 'addHandlerRender() with the control function.
 * @author Anik Paul
 */
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
