// ========== GET MEAL ID FROM URL ==========
let params = new URLSearchParams(window.location.search);

let mealID = params.get("id");

// ========== GET MEAL DETAILS ==========
async function getMealDetails() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await res.json();

    displayMealDetails(data.meals[0]);
}

getMealDetails();

// ========== DISPLAY MEAL DETAILS ==========
function displayMealDetails(meal) {

    // Ingredients
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `
            <span class="badge bg-info text-dark m-1 p-2">
                ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
            </span>`;
        }
    }

    // HTML Layout
    let box = `
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="w-100 rounded-3 mb-3">
            <h2>${meal.strMeal}</h2>
        </div>

        <div class="col-md-8">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>

            <h4><b>Area :</b> ${meal.strArea}</h4>
            <h4><b>Category :</b> ${meal.strCategory}</h4>

            <h3 class="mt-4">Ingredients</h3>
            <div>${ingredients}</div>

            <h3 class="mt-4">Tags</h3>
            <div>
                ${meal.strTags ? `<span class="badge bg-danger p-2">${meal.strTags}</span>` : "No Tags"}
            </div>

            <div class="mt-4">
                <a class="btn btn-success" target="_blank" href="${meal.strSource}">Source</a>
                <a class="btn btn-danger ms-2" target="_blank" href="${meal.strYoutube}">Youtube</a>
            </div>
        </div>
    `;

    document.getElementById("mealDetailsContainer").innerHTML = box;
}
