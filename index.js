document.addEventListener("DOMContentLoaded", function () {
  const categoryList = document.getElementById("category-list");

  // Fetch categories from the API
  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      console.log(response);
      const categories = response.data.categories;
      let output = "";

      categories.forEach((category) => {
        output += `
                      <div class="w-full relative group max-w-sm mx-auto h-auto">
          <!-- Image -->
          <img
            src="${category.strCategoryThumb}"
            alt="Sample Image"
            class="w-full h-full object-cover rounded-lg"
          />

          <!-- Text to show on hover -->
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
          >
            <span class="text-white text-2xl font-bold">${category.strCategory}</span>
            <span class="text-white text-balance text-lg font-bold">${category.strCategoryDescription}</span>
          </div>
        </div>`;
      });
      categoryList.innerHTML = output;
    })
    .catch((error) => console.log(error));
});

function redirectToCategoryDetail(categoryName) {
  window.location.href = `category-detail.html?category=${categoryName}`;
}
