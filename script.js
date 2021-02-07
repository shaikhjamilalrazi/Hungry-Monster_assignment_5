const src = document.querySelector(".input-group");

const searchField = document.querySelector(".form-control");
const searchBtn = document.querySelector(".btn");

const mainDiv = document.querySelector(".meal-content");
const singleContent = document.querySelector(".single-content");

const mealValue = (meals) => {
  let html = "";
  if (meals && searchField.value !== "") {
    meals.forEach((meal) => {
      html += `
          <div id=meal>
            <div class="meal-item" data-id="${meal.idMeal}">
                  <div class="meal-img">
                      <img src="${meal.strMealThumb}" alt="food" />
                  </div>
                  <div class="meal-name">
                      <h3>${meal.strMeal}</h3>
                  </div>
            </div>
          </div>
        
      `;
    });
  } else {
    html = "<span class='noData'>😒 No Data Found</span>";
  }
  mainDiv.innerHTML = html;
  searchField.value = "";
};

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField.value}`
  )
    .then((res) => res.json())
    .then((data) => mealValue(data.meals));
});

const singleIngredient = (id) => {
  const meal = id.meals[0];
  let ingList = [];
  for (let i = 1; i <= 30; i++) {
    let measure = meal[`strMeasure${i}`];
    let ingredients = meal[`strIngredient${i}`];
    if (measure && ingredients) {
      ingList.push(`${measure} ${ingredients}`);
    }
  }
  let html = `

        <div class="food-details">
            <div class="food-img">
              <img src="${meal.strMealThumb}" alt="food Image" />
            </div>
            <div class="food-name">
              <h3>${meal.strMeal}</h3>
            </div>
            <div class="ingredients">
              <h4>ingredients</h4>
              <ul>
                ${ingList
                  .map(
                    (ing) =>
                      `<li><i class="fa fa-check-square" aria-hidden="true"></i>
                      <span>${ing}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>

  `;
  src.classList.add("d-none");
  mainDiv.classList.add("d-none");
  singleContent.innerHTML = html;
};

mainDiv.addEventListener("click", function (e) {
  let mealID = e.target.parentElement.parentElement.dataset.id;
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => singleIngredient(data));
});
