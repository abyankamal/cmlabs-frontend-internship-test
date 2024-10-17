document.addEventListener("DOMContentLoaded", function () {
  const categoryList = document.getElementById("category-list");

  // Fetch categories from the API
  axios
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      console.log(response);
      //   const categories = response.data.categories;
      //   let output = "";

      //   categories.forEach((category) => {
      //     output += `
      //                 <div class="col-md-4 mb-3">
      //                     <div class="card" onclick="redirectToCategoryDetail('${category.strCategory}')">
      //                         <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
      //                         <div class="card-body">
      //                             <h5 class="card-title">${category.strCategory}</h5>
      //                         </div>
      //                     </div>
      //                 </div>`;
      //   });
      //   categoryList.innerHTML = output;
    })
    .catch((error) => console.log(error));
});

function redirectToCategoryDetail(categoryName) {
  window.location.href = `category-detail.html?category=${categoryName}`;
}
