// ======== GET AREAS =========
async function getAreas() {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let data = await res.json();

    displayAreas(data.meals);
}

getAreas();


// ======== DISPLAY AREAS =========
function displayAreas(list) {
    let box = "";

    list.forEach(area => {
        box += `
        <div class="col-md-3 text-center">
            <div class="area-card p-4 rounded-3" onclick="goToAreaMeals('${area.strArea}')">
                <i class="fa-solid fa-house-laptop fa-3x mb-2"></i>
                <h4>${area.strArea}</h4>
            </div>
        </div>
        `;
    });

    document.getElementById("areaContainer").innerHTML = box;
}


// ======== GO TO AREA MEALS =========
function goToAreaMeals(area) {
    window.location.href = `areaMeals.html?name=${area}`;
}
