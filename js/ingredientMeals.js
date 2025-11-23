// GET INGREDIENT NAME
let params = new URLSearchParams(window.location.search);
let ingredientName = params.get("name");

document.getElementById("ingredientTitle").innerText = `${ingredientName} Meals`;


// GET MEALS OF THIS INGREDIENT
async function getIngredientMeals() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    let data = await res.json();

    displayIngredientMeals(data.meals || []);
}

getIngredientMeals();


// DISPLAY MEALS
function displayIngredientMeals(meals) {
    let box = "";

    meals.forEach(meal => {
        box += `
        <div class="col-md-3">
            <div class="meal-card position-relative overflow-hidden rounded-3"
                 onclick="goToMeal(${meal.idMeal})">

                <img src="${meal.strMealThumb}" class="w-100">

                <div class="meal-layer d-flex justify-content-center align-items-center">
                    <h3>${meal.strMeal}</h3>
                </div>

            </div>
        </div>
        `;
    });

    document.getElementById("ingredientMealsContainer").innerHTML = box;
}


function goToMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}
