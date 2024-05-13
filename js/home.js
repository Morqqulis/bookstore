const headerLogo = document.querySelector(".header__logo");
const headerMenu = document.querySelector(".header__menu")

headerLogo.addEventListener('mouseenter',() =>{
    headerMenu.classList.toggle("active")
})


headerMenu.addEventListener('mouseleave',() =>{
    headerMenu.classList.remove("active")
})





