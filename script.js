const randomCocktailBtn = document.getElementById('randomCocktailBtn');
const searchCocktailBtn = document.getElementById('searchCocktailBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const loader = document.getElementById('loader');

getRandomCocktail();
randomCocktailBtn.addEventListener('click', getRandomCocktail);
searchCocktailBtn.addEventListener('click', searchCocktail);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchCocktail()
  }
})

function getRandomCocktail() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      resultsDiv.innerHTML = '';
      displayRandomCocktail(cocktail)
    })
    .catch(error => {
      resultsDiv.innerHTML = 'Error fetching random cocktail.';
      console.error(error);
    });
}

function getIngredientsList(cocktail) {
  const ingredientsArr = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredientsArr.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredientsArr;
}

function searchCocktail() {
  const searchQuery = searchInput.value.trim();

  if (searchQuery) {
    resultsDiv.innerHTML = `Searching for '${searchQuery}'...`;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`)
      .then(response => response.json())
      .then(data => {
        const cocktails = data.drinks;
        resultsDiv.innerHTML = '';
        displaySearchResults(cocktails);
      })
      .catch(error => {
        resultsDiv.innerHTML = `Error searching for '${searchQuery}'.`;
        console.error(error);
      });
  }
}

function displayRandomCocktail(cocktail) {
  const ingredients = getIngredientsList(cocktail);

  const container = document.createElement('div');
  container.classList.add('cocktail')

  const img = document.createElement('img');
  img.classList.add('coctail__img')
  img.src = cocktail.strDrinkThumb;
  img.alt = cocktail.strDrink;
  container.appendChild(img);

  const info = document.createElement('div');
  info.classList.add('info');
  container.appendChild(info);

  const type = document.createElement('span');
  type.innerText = `Type: ${cocktail.strAlcoholic}`
  type.classList.add('info__item')
  info.appendChild(type);

  const category = document.createElement('span');
  category.innerText = `Category: ${cocktail.strCategory}`
  category.classList.add('info__item')
  info.appendChild(category);

  const glass = document.createElement('span');
  glass.innerText = `Glass: ${cocktail.strGlass}`
  glass.classList.add('info__item')
  info.appendChild(glass);

  const instructions = document.createElement('span');
  instructions.innerText = `Instructions: ${cocktail.strInstructions}`
  instructions.classList.add('info__item')
  info.appendChild(instructions);

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.innerText = 'Ingridients:'
  container.appendChild(ingredientsTitle);

  const ingredientsList = document.createElement('ul');
  ingredientsList.classList.add('list-reset')
  container.appendChild(ingredientsList);

  ingredients.forEach(e => {
    const ingredient = document.createElement('li');
    ingredient.innerText = e;

    ingredientsList.appendChild(ingredient);
  });

  resultsDiv.appendChild(container);
}

function displaySearchResults(cocktails) {
  if (cocktails) {
    const coctailList = document.createElement('ul');
    coctailList.classList.add('list-reset')

    cocktails.map(cocktail => {
      const cocktailContainer = document.createElement('li');
      cocktailContainer.classList.add('cocktail__item')

      const img = document.createElement('img');
      img.classList.add('cocktail__item-img')
      img.src = cocktail.strDrinkThumb;
      img.alt = cocktail.strDrink;
      cocktailContainer.appendChild(img);

      const title = document.createElement('h2');
      title.classList.add('coctail__title')
      title.innerText = cocktail.strDrink;
      cocktailContainer.appendChild(title);

      const info = document.createElement('div');
      info.classList.add('info');
      cocktailContainer.appendChild(info);

      const type = document.createElement('span');
      type.innerText = `Type: ${cocktail.strAlcoholic}`
      type.classList.add('info__item')
      info.appendChild(type);

      const category = document.createElement('span');
      category.innerText = `Category: ${cocktail.strCategory}`
      category.classList.add('info__item')
      info.appendChild(category);

      const glass = document.createElement('span');
      glass.innerText = `Glass: ${cocktail.strGlass}`
      glass.classList.add('info__item')
      info.appendChild(glass);

      const instructions = document.createElement('span');
      instructions.innerText = `Instructions: ${cocktail.strInstructions}`
      instructions.classList.add('info__item')
      info.appendChild(instructions);

      const ingredientsTitle = document.createElement('h3');
      ingredientsTitle.innerText = 'Ingridients:'
      cocktailContainer.appendChild(ingredientsTitle);

      const ingredientsList = document.createElement('ul');
      ingredientsList.classList.add('list-reset')
      cocktailContainer.appendChild(ingredientsList);

      const ingredients = getIngredientsList(cocktail);

      ingredients.forEach(e => {
        const ingredient = document.createElement('li');
        ingredient.innerText = e;

        ingredientsList.appendChild(ingredient);
      });

      coctailList.appendChild(cocktailContainer);
    })

    resultsDiv.appendChild(coctailList);
  } else {
    resultsDiv.innerText = 'No cocktails found.';
  }
}