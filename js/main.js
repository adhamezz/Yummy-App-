// ========== GET MEALS FROM API ==========
async function getMeals() {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let data = await res.json();

    showMeals(data.meals);
}

// ========== DISPLAY MEALS ==========
function showMeals(meals) {
    let box = "";

    meals.forEach(meal => {
        box += `
        <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-3" onclick="goToMeal(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}">
                
                <div class="meal-layer">
                    <h3 class="text-center fs-4 m-0">${meal.strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById("mealContainer").innerHTML = box;
}

// ========== MOVE TO DETAILS PAGE ==========
function goToMeal(id) {
    // ينقلك لصفحة التفاصيل ومعاه id الوجبة
    window.location.href = `meal.html?id=${id}`;
}



// ========== DETAILS PAGE LOGIC ==========
if (window.location.pathname.includes("meal.html")) {
    getMealDetails();
}

async function getMealDetails() {
    // ناخد id من اللينك
    let params = new URLSearchParams(window.location.search);
    let mealID = params.get("id");

    // نجيب الداتا من API
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await res.json();

    displayMealDetails(data.meals[0]);
}

function displayMealDetails(meal) {

    let ingredients = ``;

    // نجهّز المكونات
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `
            <span class="badge bg-info text-dark m-1 p-2">
                ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
            </span>`;
        }
    }

    // نعرض الصفحة
    document.getElementById("mealDetailsContainer").innerHTML = `
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="w-100 rounded-3">
            <h2 class="text-capitalize mt-3">${meal.strMeal}</h2>
        </div>

        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>

            <h4><b>Area :</b> ${meal.strArea}</h4>
            <h4><b>Category :</b> ${meal.strCategory}</h4>

            <h4 class="mt-4">Recipes :</h4>
            <div>${ingredients}</div>

            <h4 class="mt-4">Tags :</h4>
            <div>
                ${meal.strTags ? `<span class="badge bg-danger p-2">${meal.strTags}</span>` : ""}
            </div>

            <div class="mt-4">
                <a class="btn btn-success" target="_blank" href="${meal.strSource}">Source</a>
                <a class="btn btn-danger ms-2" target="_blank" href="${meal.strYoutube}">Youtube</a>
            </div>
        </div>
    `;
}


// Run
getMeals();

const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebarBtn"); 
const closeBtn = document.querySelector(".btn-close"); 


openBtn.onclick = function () {
    sidebar.classList.add("active");
};

closeBtn.onclick = function () {
    sidebar.classList.remove("active");
};
// ==================================
const toTopBtn = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopBtn.style.display = "flex";
  } else {
    toTopBtn.style.display = "none";
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
// ==========loader
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hide");
  }, 600);
});


