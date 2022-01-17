//import everthing form the model.js
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView';
import addRecipeViews from './views/addRecipeViews.js';
import paginationView from './views/paginationView.js';
import { MODAL_CLOSE_SEC } from './config';

//suport for old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

const controlRecipies = async function () {
  try {
    //get the id dynamicly
    // console.log(id);
    const id = window.location.hash.slice(1);

    //guard closes
    if (!id) retun;
    //render spinner in (parentEl)
    recipeView.renderSpinner();

    //update resul view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //loading recipe fn. aysinc fn retun a promise,
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);

    //bookmarks list update
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(`${err} errror 👿👿👿👿👿👿👿👿`);
  }
};
//search fn
const controlSearchResults = async function () {
  try {
    //1render spiner
    resultsView.renderSpinner();
    //2get search query
    const query = searchView.getQuery();
    if (!query) return;

    //3load seach result
    await model.loadSearchResults(query);
    //4render result
    resultsView.render(model.getSearchResultsPage());
    //5render initial pagination btn
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
//control click pagi btn
const controlPagination = function (goToPage) {
  //1 render NEW result
  resultsView.render(model.getSearchResultsPage(goToPage));
  //2render NEW pagination btn
  paginationView.render(model.state.search);
  console.log(goToPage);
};
const controlServings = function (newServigns) {
  //   //updat the recipe servings (in state)
  model.updateServings(newServigns);
  //   //update the recipe view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Updade recipe view
  recipeView.update(model.state.recipe);
  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeViews.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('💩💩💩💩', err);
    addRecipeViews.renderError(err.message);
  }
};

//publisher -> subscriber patterns
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSeach(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeViews.addHandlerUpload(controlAddRecipe);
};
init();
