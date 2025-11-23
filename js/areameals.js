// ======== GET AREA NAME FROM URL =========
let params = new URLSearchParams(window.location.search);
let areaName = params.get("name");

document.getElementById("areaTitle").innerText = `${areaName} Meals`;


// ======== GET MEALS OF THIS AREA =========
async function getAreaMeals() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let data = await res.json();

    displayAreaMeals(data.meals || []);
}

getAreaMeals();


// ======== DISPLAY MEALS =========
function displayAreaMeals(meals) {
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

    document.getElementById("areaMealsContainer").innerHTML = box;
}


// ======== GO TO MEAL DETAILS =========
function goToMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}
