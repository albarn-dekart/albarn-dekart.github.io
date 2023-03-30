export default class StorageApi {
    // Food Track
    static getAllItems() {
        return JSON.parse(localStorage.getItem("trackingApp-food") || "[]");
    }

    static saveItem(item) {
        const items = StorageApi.getAllItems();

        item.date = document.getElementById("date").value;
        items.push(item);
        localStorage.setItem("trackingApp-food", JSON.stringify(items));
    }

    static deleteItem(id) {
        const items = StorageApi.getAllItems();
        const newItems = items.filter(item => item.id !== id);

        localStorage.setItem("trackingApp-food", JSON.stringify(newItems));
    }

    // Calories
    static getCalories() {
        const items = JSON.parse(localStorage.getItem("trackingApp-calories") || "[]");

        return items.sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date);
        });
    }

    static saveCalories(item) {
        const items = StorageApi.getCalories();
        const existing = items.find(object => object.date === item.date);

        // Update
        if (existing) {
            existing.goal = item.goal;
            existing.burnt = item.burnt;
        }
        // Add
        else {
            items.push(item);
        }

        localStorage.setItem("trackingApp-calories", JSON.stringify(items));
    }

    // LocalFoodData
    static getAllLocalFoodData() {
        return JSON.parse(localStorage.getItem("trackingApp-localFoodData") || "[]");
    }

    static saveLocalFoodData(item) {
        const items = StorageApi.getAllLocalFoodData();
        const existing = items.find(object => object.name === item.name);

        // Update
        if (existing) {
            existing.name = item.name;
            existing.calories = item.calories;
            existing.protein = item.protein;
            existing.carbs = item.carbs;
            existing.fat = item.fat;
        }
        // Add
        else {
            items.push(item);
        }

        localStorage.setItem("trackingApp-localFoodData", JSON.stringify(items));
    }

    static deleteLocalFoodData(itemName) {
        const items = StorageApi.getAllLocalFoodData();
        const newItems = items.filter(item => item.name !== itemName);

        localStorage.setItem("trackingApp-localFoodData", JSON.stringify(newItems));
    }
}