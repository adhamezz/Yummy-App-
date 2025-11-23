let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let ageInput = document.getElementById("age");
let passwordInput = document.getElementById("password");
let repasswordInput = document.getElementById("repassword");

function showError(input, message) {
    let small = input.nextElementSibling;
    small.innerText = message;
    small.classList.replace("opacity-0", "opacity-1");
}

function hideError(input) {
    input.nextElementSibling.classList.replace("opacity-1", "opacity-0");
}

/* === LIVE VALIDATION === */
nameInput.addEventListener("input", () => {
    /^[A-Za-z ]+$/.test(nameInput.value)
        ? hideError(nameInput)
        : showError(nameInput, "Only letters allowed");
});

emailInput.addEventListener("input", () => {
    /\S+@\S+\.\S+/.test(emailInput.value)
        ? hideError(emailInput)
        : showError(emailInput, "Invalid email");
});

phoneInput.addEventListener("input", () => {
    /^[0-9]{8,15}$/.test(phoneInput.value)
        ? hideError(phoneInput)
        : showError(phoneInput, "Invalid Phone Number");
});

ageInput.addEventListener("input", () => {
    ageInput.value >= 10 && ageInput.value <= 90
        ? hideError(ageInput)
        : showError(ageInput, "Invalid age");
});

passwordInput.addEventListener("input", () => {
    passwordInput.value.length >= 6
        ? hideError(passwordInput)
        : showError(passwordInput, "Weak Password");
});

repasswordInput.addEventListener("input", () => {
    repasswordInput.value === passwordInput.value
        ? hideError(repasswordInput)
        : showError(repasswordInput, "Passwords do not match");
});

/* === SUBMIT FORM === */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let errors = document.querySelectorAll(".error.opacity-1");

    if (errors.length > 0) {
        showPopup("برجاء إدخال بياناتك بشكل صحيح");
    } else {
        showPopup("تم إرسال بياناتك بنجاح — سيتم التواصل معك في أقرب وقت ❤️");
        this.reset();
    }
});

/* ==== POPUP ==== */
function showPopup(msg) {
    document.getElementById("popupMessage").innerText = msg;
    document.getElementById("popup").classList.remove("d-none");
}

function closePopup() {
    document.getElementById("popup").classList.add("d-none");
}
// 33333333333333333333333333333333333 
