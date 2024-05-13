import { getDBData } from './global.js'

getDBData('/aboutStore').then(data => {
	document.getElementById('title').innerText = data.title
	document.getElementById('description').innerText = data.description.length > 700 ? data.description.slice(0, 700) + '...' : data.description
	document.getElementById('main-image').src = data.image
})


const headerLogo = document.querySelector(".header__logo");
const headerMenu = document.querySelector(".header__menu")

headerLogo.addEventListener('mouseenter',() =>{
    headerMenu.classList.toggle("active")
})


headerMenu.addEventListener('mouseleave',() =>{
    headerMenu.classList.remove("active")
})