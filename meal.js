document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("meal");
  const mealDetail = document.getElementById("meal-detail");

  // Fetch meal details
  axios
    .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => {
      const meal = response.data.meals[0];
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        }
      }

      // Split the instructions into steps based on line breaks (or you can use periods as separators)
      const instructionsSteps = meal.strInstructions
        .split("\r\n")
        .filter(Boolean);

      // Create an ordered list for the steps
      const instructionsList = instructionsSteps
        .map((step, index) => `<li class="mb-2">${index + 1}. ${step}</li>`)
        .join("");

      mealDetail.innerHTML = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                    <img src="${
                      meal.strMealThumb
                    }" class="w-full h-64 object-cover" alt="${meal.strMeal}">
                    <div class="p-6">
                        <h1 class="text-3xl font-bold mb-4">${meal.strMeal}</h1>
                        <p class="text-lg text-gray-700 mb-4"><strong>Instructions:</strong> ${instructionsList}</p>
                        <h3 class="text-2xl font-semibold mb-2">Ingredients</h3>
                        <ul class="list-disc list-inside text-gray-700 mb-4">
                            ${ingredients
                              .map((ing) => `<li>${ing}</li>`)
                              .join("")}
                        </ul>
                        <h3 class="text-2xl font-semibold mb-4">Video Tutorial</h3>
                        ${
                          meal.strYoutube
                            ? `<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/${
                                meal.strYoutube.split("v=")[1]
                              }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
                            : "<p class='text-lg text-gray-500'>No video available</p>"
                        }
                    </div>
                </div>`;
    })
    .catch((error) => console.log(error));
});
