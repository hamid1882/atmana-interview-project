const categoryUrl = "https://api.chucknorris.io/jokes/categories";

const filterContainer = document.getElementById("filter-container");
const jokeText = document.getElementById("joke-text");
const jokeIcon = document.getElementById("joke-icon");
const currentCategory = document.getElementById("current-category");

function fetchCategories() {
  fetch(categoryUrl)
    .then((response) => response.json())
    .then((users) => {
      let output = `<button hidden></button>`;
      users.forEach(function (user, idx) {
        output += `
        <button id="button" class="filter-btn " value=${user}  onclick="renderValue(this)">
                      ${user}
                  </button>
              `;
      });
      filterContainer.innerHTML = output;
    });
}

function fetchJokes(category = "money") {
  const jokeUrl = ` https://api.chucknorris.io/jokes/random?category=${category}`;
  fetch(jokeUrl)
    .then((response) => response.json())
    .then((joke) => {
      jokeIcon.innerHTML = joke.icon_url;
      jokeText.innerHTML = joke.value;
    });
}

fetchCategories();
fetchJokes();

function fetchNewJoke() {
  fetchJokes();
}

function renderValue(current) {
  const currentValue = current.value;
  fetchJokes(currentValue);
  currentCategory.innerHTML = `Category: ${currentValue.toUpperCase()}`;
  current.classList.add("active-category");
  setTimeout(() => {
    current.classList.remove("active-category");
  }, 3000);
}
