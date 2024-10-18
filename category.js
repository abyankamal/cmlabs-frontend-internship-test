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
                    <div class="w-full relative group max-w-sm mx-auto h-auto">
  <!-- Image -->
  <img
    src="${meal.strMealThumb}"
    alt="Sample Image"
    class="w-full h-full object-cover rounded-lg"
  />

  <!-- Text to show on hover -->
  <div
    class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-5"
  >
    <span class="text-white text-2xl font-bold text-center">${meal.strMeal}</span>
    <button type="button" onclick="redirectToMealDetail('${meal.idMeal}')" class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Detail Meal</button>
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
