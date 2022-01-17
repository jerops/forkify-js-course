//imports always at the top
//import icons from '../img/icons.svg'//parcel 1
//non programing files
import icons from 'url:../img/icons.svg'; //parcel 2  now
import { API_URL } from './config.js';
//suport for old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`${API_URL}${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  try {
    const res = await fetch(
      // `${API_URL}${id}`
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    console.log(res, data);
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // 2. Rendering recipe
    const markup = `<figure class="recipe__fig">
        <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>
    
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>
    
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
    
        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>
    
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
    
        ${recipe.ingredients
          .map(ing => {
            return `
          <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`;
          }) //join the return array to a strign
          .join('')}
    
      </div>
    
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
    //3. inject the dynimic html
    //clean previous conteiner data
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};
showRecipe();
///////////////////////////////////////
//fn
// const renderSpinner = function (parentEl) {
//   const markup = `<div class="spinner">
//   <svg>
//     <use href="${icons}#icon-loader"></use>
//   </svg>`;
//   parentEl.innerHTML = ''; //clear parent elemente
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };
// //request to API
// // loading recipe
// const showRecipe = async function () {
//   try {
//     //get the id dynamicly
//     const id = window.location.hash.slice(1);
//     //guard closes
//     if (!id) retun;
//     //render spinner in (parentEl)
//     renderSpinner(recipeContainer);
//     //request API
//     const res = await fetch(
//       `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
//     );
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}(${res.status})`);
//     //format data
//     let { recipe } = data.data;
//     recipe = {
//       id: recipe.id,
//       title: recipe.title,
//       publisher: recipe.publisher,
//       sourceUrl: recipe.source_url,
//       image: recipe.image_url,
//       servings: recipe.servings,
//       cookingTime: recipe.cooking_time,
//       ingredients: recipe.ingredients,
//     };
//     console.log(recipe);

//     //2. Rendering recipe
//     const markup = `<figure class="recipe__fig">
//     <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
//     <h1 class="recipe__title">
//       <span>${recipe.title}</span>
//     </h1>
//   </figure>

//   <div class="recipe__details">
//     <div class="recipe__info">
//       <svg class="recipe__info-icon">
//         <use href="${icons}#icon-clock"></use>
//       </svg>
//       <span class="recipe__info-data recipe__info-data--minutes">${
//         recipe.cookingTime
//       }</span>
//       <span class="recipe__info-text">minutes</span>
//     </div>
//     <div class="recipe__info">
//       <svg class="recipe__info-icon">
//         <use href="${icons}#icon-users"></use>
//       </svg>
//       <span class="recipe__info-data recipe__info-data--people">${
//         recipe.servings
//       }</span>
//       <span class="recipe__info-text">servings</span>

//       <div class="recipe__info-buttons">
//         <button class="btn--tiny btn--increase-servings">
//           <svg>
//             <use href="${icons}#icon-minus-circle"></use>
//           </svg>
//         </button>
//         <button class="btn--tiny btn--increase-servings">
//           <svg>
//             <use href="${icons}#icon-plus-circle"></use>
//           </svg>
//         </button>
//       </div>
//     </div>

//     <div class="recipe__user-generated">
//       <svg>
//         <use href="${icons}#icon-user"></use>
//       </svg>
//     </div>
//     <button class="btn--round">
//       <svg class="">
//         <use href="${icons}#icon-bookmark-fill"></use>
//       </svg>
//     </button>
//   </div>

//   <div class="recipe__ingredients">
//     <h2 class="heading--2">Recipe ingredients</h2>
//     <ul class="recipe__ingredient-list">

//     ${recipe.ingredients
//       .map(ing => {
//         return `
//       <li class="recipe__ingredient">
//       <svg class="recipe__icon">
//         <use href="${icons}#icon-check"></use>
//       </svg>
//       <div class="recipe__quantity">${ing.quantity}</div>
//       <div class="recipe__description">
//         <span class="recipe__unit">${ing.unit}</span>
//         ${ing.description}
//       </div>
//     </li>`;
//       }) //join the return array to a strign
//       .join('')}

//   </div>

//   <div class="recipe__directions">
//     <h2 class="heading--2">How to cook it</h2>
//     <p class="recipe__directions-text">
//       This recipe was carefully designed and tested by
//       <span class="recipe__publisher">${
//         recipe.publisher
//       }</span>. Please check out
//       directions at their website.
//     </p>
//     <a
//       class="btn--small recipe__btn"
//       href="${recipe.sourceUrl}"
//       target="_blank"
//     >
//       <span>Directions</span>
//       <svg class="search__icon">
//         <use href="${icons}#icon-arrow-right"></use>
//       </svg>
//     </a>
//   </div>`;
//     //3. inject the dynimic html
//     //clean previous conteiner data
//     recipeContainer.innerHTML = '';
//     recipeContainer.insertAdjacentHTML('afterbegin', markup);
//   } catch (err) {
//     alert(err);
//   }
// };
// //Call fn
// showRecipe();

//lisen multiple events for the hashchange and load event
//create array + foreach + =>
// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
