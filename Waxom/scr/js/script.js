// Js

const burger = document.getElementById("burger")
const adaptiveMenu = document.querySelector(".menu__items")
const header = document.querySelector("header")
const intro = document.getElementById("intro")
const menuLink = document.querySelectorAll(".menu__link")
const tabs = document.querySelectorAll(".btn-tab")

burger.addEventListener("click", () => {
   adaptiveMenu.classList.toggle("active")
})

// Scroll

window.onscroll = () => {
   if (window.scrollY > 0) {
      header.classList.add("fixed")
   } else {
      header.classList.remove("fixed")
   }
}

menuLink.forEach(link => {
   link.addEventListener("click", () => {
      let linkOffsetTop = document.getElementById(link.getAttribute("data-scrollElement")).offsetTop

      window.scrollTo({
         top: linkOffsetTop - header.offsetHeight,
         behavior: "smooth"
      })
   })
})

// Tabs

tabs.forEach(tab => {

   tab.addEventListener("click", () => {
      tab.closest(".section__tabs").querySelectorAll(".btn-tab").forEach(item => {
         item.classList.remove("active")
      })

      tab.classList.add("active")
   })
})

// Jquery
$(document).ready(function () {
   $(".slider-dots").slick({
      centerMode: false,
      infinite: true,
      dots: true,
      easing: "ease",
      appendDots: $("#intro .container"),
      draggable: false,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               draggable: true,
            }
         }
      ]
   });

   $(".slider").slick({
      centerMode: false,
      infinite: true,
      easing: "ease",
      prevArrow: $(".arrow-circle.left"),
      nextArrow: $(".arrow-circle.right"),
   });
});