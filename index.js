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
    class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-5"
  >
    <span class="text-white text-2xl font-bold text-center">${category.strCategory}</span>
    <span
      class="text-white text-xs font-normal text-center max-h-16 overflow-hidden"
      style="overflow-wrap: break-word; text-overflow: ellipsis;"
    >
      ${category.strCategoryDescription}
    </span>
    <button type="button" onclick="redirectToCategoryDetail('${category.strCategory}')" class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Detail Category</button>
  </div>
</div>
`;
      });
      categoryList.innerHTML = output;
    })
    .catch((error) => console.log(error));
});

function redirectToCategoryDetail(categoryName) {
  window.location.href = `category-detail.html?category=${categoryName}`;
}
