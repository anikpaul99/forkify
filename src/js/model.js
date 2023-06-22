import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * Load recipe by fetching data from an api
 * @param {string} id The id from users window
 * @returns {Object} the recipe object
 * @author Anik Paul
 */
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

/**
 * Load searched recipe by fetching data from an api
 * @param {string} query the search query for a particular recipe
 * @returns {Object []} the searched results
 * @author Anik Paul
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

/**
 * will get the first ten recipes from the search.results array.
 * @param {number} page the page number of the results.
 * @returns {Object []} the searched results
 * @author Anik Paul
 */
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};

/**
 * will update the quantity of each ingredients in recipe, based on the amount of new servings.
 * @param {number} newServings the amount of new servings.
 * @returns {undefined}
 * @author Anik Paul
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings
  });

  state.recipe.servings = newServings;
};

/**
 * will store the bookmarks in local storage when a recipe is bookmarked or unbookmarked
 * @returns {undefined}
 * @author Anik Paul
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * will recieve a recipe and set and mark that recipe as a bookmarked
 * @param {Object} newServings the recipe object to be bookmarked
 * @returns {undefined}
 * @author Anik Paul
 */
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

/**
 * will recieve an id of a recipe and remove that recipe from bookmarks and mark it as unbookmarked
 * @param {string} id the id of the recipe that we want to unbookmarked
 * @returns {undefined}
 * @author Anik Paul
 */
export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log(state.bookmarks);
