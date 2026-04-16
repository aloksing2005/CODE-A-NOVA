const recipesDiv = document.getElementById('recipes');
const favDiv = document.getElementById('favorites');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Search
async function searchRecipes() {
  const query = document.getElementById('search').value;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();
  recipesDiv.innerHTML = "";
  if (!data.meals) return;
  displayRecipes(data.meals);
}

// Display
function displayRecipes(meals) {
  recipesDiv.innerHTML = "";

  meals.forEach(meal => {
    const card = createCard(meal);
    recipesDiv.appendChild(card);
  });
}

// Create Card
function createCard(meal) {
  const card = document.createElement('div');
  card.className = "card";
  const isFav = favorites.some(f => f.idMeal === meal.idMeal);
  card.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <span class="fav-btn">${isFav ? '❤️' : '🤍'}</span>
  `;

  // Favorite toggle
  card.querySelector('.fav-btn').onclick = (e) => {
    e.stopPropagation();
    if (isFav) {
      favorites = favorites.filter(f => f.idMeal !== meal.idMeal);
    } else {
      favorites.push(meal);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
    displayRecipes([meal]);
  };
  card.onclick = () => showRecipe(meal);
  return card;
}

// Favorites load
function loadFavorites() {
  favDiv.innerHTML = "";
  favorites.forEach(meal => {
    favDiv.appendChild(createCard(meal));
  });
}

// Modal
function showRecipe(meal) {
  document.getElementById('modal').style.display = "flex";
  document.getElementById('title').innerText = meal.strMeal;
  document.getElementById('image').src = meal.strMealThumb;
  document.getElementById('instructions').innerText = meal.strInstructions;

  // Ingredients 🧾
  const ingList = document.getElementById('ingredients');
  ingList.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing) {
      const li = document.createElement('li');
      li.innerText = `${ing} - ${measure}`;
      ingList.appendChild(li);
    }
  }

  // Video 🎥
  const video = document.getElementById('video');
  video.href = meal.strYoutube || "#";
}

// Close
document.getElementById('close').onclick = () => {
  document.getElementById('modal').style.display = "none";
};

// Category Filter 🌍
async function filterCategory() {
  const cat = document.getElementById('category').value;
  if (!cat) return;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
  const data = await res.json();
  displayRecipes(data.meals);
}

// Init
loadFavorites();