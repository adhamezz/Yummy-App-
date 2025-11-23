// ======== GET CATEGORY NAME FROM URL =========
let params = new URLSearchParams(window.location.search);
let catName = params.get("name");

document.getElementById("categoryTitle").innerText = `${catName} Meals`;


// ======== GET MEALS OF THIS CATEGORY =========
async function getCategoryMeals() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    let data = await res.json();

    displayCategoryMeals(data.meals || []);
}

getCategoryMeals();


// ======== DISPLAY MEALS =========
function displayCategoryMeals(meals) {
    let box = "";

    meals.forEach(meal => {
        box += `
        <div class="col-md-3">
            <div class="meal-card position-relative overflow-hidden rounded-3"
                 onclick="goToMeal(${meal.idMeal})">

                <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}">

                <div class="meal-layer d-flex justify-content-center align-items-center">
                    <h3 class="text-center">${meal.strMeal}</h3>
                </div>

            </div>
        </div>
        `;
    });

    document.getElementById("categoryMealsContainer").innerHTML = box;
}


// ======== GO TO MEAL DETAILS =========
function goToMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}
