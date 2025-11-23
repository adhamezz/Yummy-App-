// ========== SETUP SEARCH PAGE ==========

// Search by name
document.getElementById("searchByName").addEventListener("keyup", function () {
    searchByName(this.value);
});

// Search by first letter
document.getElementById("searchByLetter").addEventListener("keyup", function () {
    let letter = this.value;

    if (letter.length > 1) return; // لازم حرف واحد فقط

    searchByLetter(letter);
});

// ========== SEARCH FUNCTIONS ==========

async function searchByName(term) {
    if (term === "") {
        document.getElementById("searchResults").innerHTML = "";
        return;
    }

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let data = await res.json();

    displaySearchResults(data.meals || []);
}

async function searchByLetter(letter) {
    if (letter === "") {
        document.getElementById("searchResults").innerHTML = "";
        return;
    }

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await res.json();

    displaySearchResults(data.meals || []);
}

// ========== DISPLAY RESULTS ==========

function displaySearchResults(meals) {
    let box = "";

    meals.forEach(meal => {
        box += `
        <div class="col-md-3">
            <div onclick="goToMeal(${meal.idMeal})" 
                 class="meal position-relative overflow-hidden rounded-3">
                
                <img src="${meal.strMealThumb}" class="w-100">

                <div class="meal-layer d-flex justify-content-center align-items-center">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById("searchResults").innerHTML = box;
}

// ========== GO TO DETAILS PAGE ==========

function goToMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}
