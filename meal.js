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

      mealDetail.innerHTML = `
                <div class="card mb-3">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${
        meal.strMeal
      }">
                    <div class="card-body">
                        <h1 class="card-title">${meal.strMeal}</h1>
                        <p><strong>Instructions:</strong> ${
                          meal.strInstructions
                        }</p>
                        <h3>Ingredients</h3>
                        <ul>${ingredients
                          .map((ing) => `<li>${ing}</li>`)
                          .join("")}</ul>
                        <h3>Video Tutorial</h3>
                        ${
                          meal.strYoutube
                            ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${
                                meal.strYoutube.split("v=")[1]
                              }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
                            : "No video available"
                        }
                    </div>
                </div>`;
    })
    .catch((error) => console.log(error));
});
