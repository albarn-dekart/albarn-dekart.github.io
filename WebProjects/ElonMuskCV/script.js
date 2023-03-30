const nav_button = document.getElementById("nav_button");
const nav = document.getElementById("nav");

nav_button.addEventListener('click', () =>{
    nav_button.classList.toggle("active");
    nav.classList.toggle("active");
})

nav.querySelectorAll(".nav_item").forEach(item =>{
    item.addEventListener('click', () =>{
        nav_button.classList.remove("active");
        nav.classList.remove("active");
    })
})