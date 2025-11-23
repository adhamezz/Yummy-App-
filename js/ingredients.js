// ========== GET INGREDIENTS ==========
async function getIngredients() {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let data = await res.json();

    displayIngredients(data.meals);
}

getIngredients();


// ========== DISPLAY INGREDIENTS ==========
function displayIngredients(list) {
    let box = "";

    list.slice(0, 60).forEach(item => {   // ناخد أول 60 زي Route
        box += `
        <div class="col-md-3">
            <div class="ingredient-card text-center p-4 rounded-3"
                 onclick="goToIngredientMeals('${item.strIngredient}')">

                <i class="fa-solid fa-drumstick-bite fa-3x mb-3"></i>
                <h4>${item.strIngredient}</h4>
                <p class="small text-white-50">
                    ${item.strDescription ? item.strDescription.split(" ").slice(0, 12).join(" ") : ""}
                </p>

            </div>
        </div>
        `;
    });

    document.getElementById("ingredientsContainer").innerHTML = box;
}


// ========== GO TO INGREDIENT MEALS ==========
function goToIngredientMeals(name) {
    window.location.href = `ingredientMeals.html?name=${name}`;
}
