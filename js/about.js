import { getDBData } from './global.js'

getDBData('/aboutStore').then(data => {
	document.getElementById('title').innerText = data.title
	document.getElementById('description').innerText = data.description.length > 700 ? data.description.slice(0, 700) + '...' : data.description
	document.getElementById('main-image').src = data.image
})

/*Mobile view*/ 

const menuBtn = document.querySelector(".menuBtn");
const headerMenu = document.querySelector(".header__menu")

menuBtn.addEventListener('click',() =>{
    headerMenu.classList.toggle("active")
})


