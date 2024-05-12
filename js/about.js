import { getDBData } from './global.js'

getDBData('/aboutStore').then(data => {
	document.getElementById('title').innerText = data.title
	document.getElementById('description').innerText = data.description
	document.getElementById('main-image').src = data.image
})
