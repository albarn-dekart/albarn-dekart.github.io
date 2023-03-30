import StorageApi from "./StorageAPI.js";

import foodData from "./foodData.json" assert {type: 'json'};

const date = document.getElementById("date");

const caloriesGoal = document.getElementById("calorie_goal");
const caloriesEaten = document.getElementById("calorie_eaten");
const caloriesBurnt = document.getElementById("calorie_burnt");
const caloriesLeft = document.getElementById("calorie_left");

const caloriesEatenBar = document.getElementById("calorie_eaten_bar");

const macros_p = document.getElementById("macros_p");
const macros_c = document.getElementById("macros_c");
const macros_f = document.getElementById("macros_f");

const meal_add = document.querySelectorAll(".meal_add");
const meal_calories = document.querySelectorAll(".meal_calories");

const food_section = document.getElementById("food_section");
const add_section = document.getElementById("add_section");
const add_search = document.getElementById("add_search");
const add_weight = document.getElementById("add_weight");
const add_close = document.getElementById("add_close");

const add_new_name = document.getElementById("add_new_name");
const add_new_calories = document.getElementById("add_new_calories");
const add_new_protein = document.getElementById("add_new_protein");
const add_new_carbs = document.getElementById("add_new_carbs");
const add_new_fat = document.getElementById("add_new_fat");
const add_new_ok = document.getElementById("add_new_ok");

const login = document.getElementById("login");
const login_open = document.getElementById("login_open");
const login_close = document.getElementById("login_close");

let meal;

function bar() {
// Calculate values
    let caloriesSum = 0;
    let proteinSum = 0;
    let carbsSum = 0;
    let fatSum = 0;

    document.querySelectorAll('.calories').forEach(item => {
        caloriesSum += Number(item.textContent);
    });

    document.querySelectorAll('.protein').forEach(item => {
        proteinSum += Number(item.textContent);
    });

    document.querySelectorAll('.carbs').forEach(item => {
        carbsSum += Number(item.textContent);
    });

    document.querySelectorAll('.fat').forEach(item => {
        fatSum += Number(item.textContent);
    });

    // Round values to 1 decimal place
    caloriesSum = Math.round(caloriesSum * 10) / 10;
    proteinSum = Math.round(proteinSum * 10) / 10;
    carbsSum = Math.round(carbsSum * 10) / 10;
    fatSum = Math.round(fatSum * 10) / 10;

// Indicator
    let Burnt = Number(caloriesBurnt.value);
    let Goal = Number(caloriesGoal.value);
    let Left = Math.round((Goal - caloriesSum + Burnt) * 10) / 10;

    caloriesEaten.textContent = caloriesSum.toString();
    caloriesLeft.textContent = Left.toString();

    macros_p.textContent = proteinSum.toString();
    macros_c.textContent = carbsSum.toString();
    macros_f.textContent = fatSum.toString();

    if (Left >= Goal + Burnt) {
        caloriesEatenBar.style.width = "0%";
    } else if (Left >= 0) {
        caloriesEatenBar.style.width = ((1 - Left / (Goal+ Burnt)) * 100).toString() + "%";
    } else {
        caloriesEatenBar.style.width = "100%"
    }
}

function addItem(name, weight, parentId, save, i) {
    const data = StorageApi.getAllLocalFoodData().concat(foodData);
    let calories, protein, carbs, fat;

    // Find food item in database
    for (const object of data) {
        if (object.name === name) {
            calories = Math.round(object.calories * weight / 10) / 10;
            protein = Math.round(object.protein * weight / 10) / 10;
            carbs = Math.round(object.carbs * weight / 10) / 10;
            fat = Math.round(object.fat * weight / 10) / 10;
            break;
        }
    }

    // Create html object
    let newItem = document.createElement("div");

    newItem.classList.add("food_item", "item");

    newItem.innerHTML = `
        <div class="name">
            Name
        </div>
    
        <div>
            <div class="item_values">
                <span><span class="calories">0</span> kcal,</span>
                <span><span class="weight">0</span> gr</span>
            
                <div class="item_macros">
                    <span>p: <span class="protein">0</span> gr,</span>
                    <span>c: <span class="carbs">0</span> gr,</span>
                    <span>f: <span class="fat">0</span> gr</span>
                </div>
            </div>
        </div>
    
        <button type="button" class="delete">
            <i class="icon fa fa-trash"></i>
        </button>`;


    newItem.querySelector('.name').textContent = name;
    newItem.querySelector('.weight').textContent = weight;
    newItem.querySelector('.calories').textContent = calories;
    newItem.querySelector('.protein').textContent = protein;
    newItem.querySelector('.carbs').textContent = carbs;
    newItem.querySelector('.fat').textContent = fat;

    //Storage and remove
    const Storage = StorageApi.getAllItems();

    newItem.querySelector('.delete').addEventListener('click', () => {
        StorageApi.deleteItem(newItem.id);
        newItem.remove();
        bar();
        calculateMealCalories()
    });

    if (save) {
        if (Storage.length === 0) newItem.id = "0"; else newItem.id = (Number(Storage[Storage.length - 1].id) + 1).toString();

        StorageApi.saveItem({
            id: newItem.id, name: name, weight: weight, parentId: parentId
        });
    } else {
        newItem.id = Storage[i].id;
    }

    // append newItem
    document.getElementById(parentId).appendChild(newItem);

    calculateMealCalories()
}

function addOption(object, removable) {
    let newItem = document.createElement("div");

    newItem.classList.add("search_item", "item");
    newItem.innerHTML = `
        <div class="name">
            Name
        </div>
    
        <div>
            <div class="item_values">
                <span><span class="caloriesP">0</span> kcal</span>
            
                <div class="item_macros">
                    <span>p: <span class="proteinP">0</span> gr,</span>
                    <span>c: <span class="carbsP">0</span> gr,</span>
                    <span>f: <span class="fatP">0</span> gr</span>
                </div>
            </div>
        </div>
    
        <button type="button" class="delete">
            <i class="icon fa fa-trash"></i>
        </button>`;

    newItem.querySelector('.name').textContent = object.name;
    newItem.querySelector('.caloriesP').textContent = (Math.round(object.calories*add_weight.value/100)).toString();
    newItem.querySelector('.proteinP').textContent = (Math.round(object.protein*add_weight.value/100)).toString();
    newItem.querySelector('.carbsP').textContent = (Math.round(object.carbs*add_weight.value/100)).toString();
    newItem.querySelector('.fatP').textContent = (Math.round(object.fat*add_weight.value/100)).toString();

    let remove = newItem.querySelector('.delete');

    let clicked = false;

    if (!removable) {
        remove.remove();
        newItem.innerHTML += "<div><div/>";
    } else {
        remove.addEventListener('click', () => {
            clicked = true;

            StorageApi.deleteLocalFoodData(object.name);
            newItem.remove();
        });
    }

    newItem.addEventListener('click', () => {
        if (!clicked) {
            if (add_weight.value >= 1) {
                addItem(object.name, add_weight.value, meal, true);
                bar();

                add_section.classList.toggle("active");
                food_section.classList.toggle("active");
            }
        }
    });

    // append newItem
    document.getElementById("search_result").appendChild(newItem);
}

function addFoodData() {
    const item = {
        name: add_new_name.value,
        calories: add_new_calories.value,
        protein: add_new_protein.value,
        carbs: add_new_carbs.value,
        fat: add_new_fat.value,
        removable: true
    };

    StorageApi.saveLocalFoodData(item);
}

function displayItems() {
    let Storage = StorageApi.getAllItems();

    Storage.forEach(function (item, i) {
        if (date.value === item.date) {
            addItem(item.name, item.weight, item.parentId, false, i);
        }
    });

    bar();
}

function updateCalories(save) {
    if (save) {
        let caloriesValue = {
            goal: caloriesGoal.value, burnt: caloriesBurnt.value, date: date.value
        };

        StorageApi.saveCalories(caloriesValue);
    } else {
        for (const item of StorageApi.getCalories()) {
            if (date.value === item.date) {
                caloriesGoal.value = item.goal;
                caloriesBurnt.value = item.burnt;
                break;
            } else if (date.value > new Date().toISOString().split('T')[0]) {
                caloriesGoal.value = StorageApi.getCalories()[0].goal;
                caloriesBurnt.value = 0;
            } else {
                caloriesGoal.value = StorageApi.getCalories()[StorageApi.getCalories().length - 1].goal;
                caloriesBurnt.value = 0;
            }
        }
    }
}

function search() {
    document.getElementById("search_result").innerHTML = "";
    const data = StorageApi.getAllLocalFoodData().concat(foodData);

    if (add_search.value !== "") {
        const result = data.filter(item => item.name.toLowerCase().startsWith(add_search.value.toLowerCase()));

        result.forEach(item => {
            addOption(item, item.removable);
        });
    } else {
        data.forEach(item => {
            addOption(item, item.removable);
        });
    }
}

function calculateMealCalories(){
    meal_calories.forEach(object =>{
        let calorieSum = 0;

        document.getElementById(object.dataset.target).querySelectorAll(".calories").forEach(item =>{
            calorieSum += Number(item.textContent);
        });

        if(calorieSum > 0) object.textContent = Math.round(calorieSum*10)/10 + " kcal"
        else object.textContent = ""
    });
}

// Set default date to today
date.value = new Date().toISOString().split('T')[0];

// Display items depending on date
updateCalories(false);
displayItems();

date.addEventListener('change', () => {
    document.getElementById("breakfast").innerHTML = "";
    document.getElementById("lunch").innerHTML = "";
    document.getElementById("dinner").innerHTML = "";
    document.getElementById("snack").innerHTML = "";

    updateCalories(false);
    displayItems();
    calculateMealCalories()
});

// Update bar when calorie Goal and Burnt are modified
caloriesGoal.addEventListener('change', () => {
    updateCalories(true);
    bar();
});

caloriesBurnt.addEventListener('change', () => {
    updateCalories(true);
    bar();
});

// Search
add_close.addEventListener('click', () => {
    add_section.classList.toggle("active");
    food_section.classList.toggle("active");
});

// Add options from database
search();

add_search.addEventListener('input', () => {
    search();
});

add_weight.addEventListener('input', () => {
    search();
});

add_new_ok.addEventListener('click', () => {
    if (add_new_name.value !== "" && add_new_calories.value >= 0 && add_new_protein.value >= 0 && add_new_carbs.value >= 0 && add_new_fat.value >= 0) {
        addFoodData();
        search();
    }
});

//Meals
meal_add.forEach(object => {
    const button = object.querySelector(".button");

    object.addEventListener('click', () => {
        add_section.classList.toggle("active");
        food_section.classList.toggle("active");
        meal = button.dataset.target;

        add_weight.value = 100;
        add_search.value = "";
        search();
    });
});

//Login
login_open.addEventListener('click', () =>{
    login.classList.toggle("active");
})

login_close.addEventListener('click', () =>{
    login.classList.toggle("active");
})