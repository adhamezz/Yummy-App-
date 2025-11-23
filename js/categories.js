// ======== GET ALL CATEGORIES =========
async function getCategories() {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await res.json();

    displayCategories(data.categories);
}

getCategories();


// ======== DISPLAY CATEGORIES =========
function displayCategories(list) {
    let box = "";

    list.forEach(cat => {
        box += `
        <div class="col-md-3">
            <div class="category-card position-relative overflow-hidden rounded-3" onclick="goToCategoryMeals('${cat.strCategory}')">

                <img src="${cat.strCategoryThumb}" class="w-100" alt="${cat.strCategory}">

                <!-- LAYER ON HOVER -->
                <div class="category-layer d-flex flex-column justify-content-center align-items-center text-center p-2">
                    <h3>${cat.strCategory}</h3>
                    <p class="small">${cat.strCategoryDescription.split(" ").slice(0, 20).join(" ")}...</p>
                </div>

            </div>
        </div>
        `;
    });

    document.getElementById("categoriesContainer").innerHTML = box;
}



// ======== GO TO CATEGORY MEALS =========
function goToCategoryMeals(category) {
    window.location.href = `categoryMeals.html?name=${category}`;
}
