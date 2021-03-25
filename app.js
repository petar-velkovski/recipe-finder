const searchBtn = document.querySelector('.search-btn');
const recipeBox = document.querySelector('.recipe-box');
const seeRecipe = document.querySelector('.see-recipe');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const body = document.querySelector('body');
const modalContentWrapper = document.querySelector('.modal-content-wrapper');
const closeModal = document.querySelector('.close-modal-btn');

function clearField() {
    let inputTxt = document.querySelector('#search-input').value = '';
}

searchBtn.addEventListener('click', () => {
    let inputTxt = document.querySelector('#search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `<div class="recipe" data-id="${meal.idMeal}">
                                <img src="${meal.strMealThumb}">
                                <div class="recipe-content">
                                    <h3>${meal.strMeal}</h3>
                                    <button class="see-recipe">See recipe</button>
                                </div>
                            </div>`;
                });
            } else {
                    html = "Sorry, no recipe found !!!";
                recipeBox.classList.add('not-found');
                setTimeout(() => {
                    recipeBox.classList.remove('not-found');
                },3000)
            }
            recipeBox.innerHTML = html;
            clearField();
        })
});

recipeBox.addEventListener('click', (e) => {
    e.preventDefault();
    let seeRecipe = e.target.parentElement.parentElement;
    if (e.target.classList.contains('see-recipe')) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${seeRecipe.dataset.id}`)
            .then(response => response.json())
            .then(data => fullRecipe(data.meals));
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
})

function fullRecipe(meal) {
    meal = meal[0];
    html =
    `
                <div class="recipe-details">
                    <div class="img-wrapper">
                        <img class="recipe-img" src="${meal.strMealThumb}" alt="">
                    </div>
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="category"><span>Category:</span> ${meal.strCategory}</p>
                    <p class="instructions">Instructions:</p>
                    <p class="recipe-instructions">${meal.strInstructions}</p>
                    <a href="${meal.strYoutube}" class="video">Watch video</a>
                </div>
    `
    modalContentWrapper.innerHTML = html;
    modal.classList.add('show');
    
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    modalContent.classList.remove('show');
    body.style.overflow = "auto";
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('show');
        modalContent.classList.remove('show');
        body.style.overflow = "auto";
    }
})



