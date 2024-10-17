document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category");
  const mealList = document.getElementById("meal-list");
  document.getElementById(
    "category-name"
  ).textContent = `Meals in ${categoryName}`;

  // Fetch meals for the selected category
  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((response) => {
      const meals = response.data.meals;
      let output = "";

      meals.forEach((meal) => {
        output += `
                    <div class="col-md-4 mb-3">
                        <div class="card" onclick="redirectToMealDetail('${meal.idMeal}')">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
      });
      mealList.innerHTML = output;
    })
    .catch((error) => console.log(error));
});

function redirectToMealDetail(mealId) {
  window.location.href = `meal-detail.html?meal=${mealId}`;
}
