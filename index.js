const navBurger = document.getElementById("navbar-burger")
const navMenu = document.getElementById("navbar-menu")
console.log(navBurger)
navBurger.addEventListener("click",() =>{
  navBurger.classList.toggle("is-active")
  navMenu.classList.toggle("is-active")

})