const navBurger = document.getElementById("navbar-burger")
const navMenu = document.getElementById("navbar-menu")
navBurger.addEventListener("click",() =>{
  navBurger.classList.toggle("is-active")
  navMenu.classList.toggle("is-active")

})