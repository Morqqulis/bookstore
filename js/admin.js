import { getDBData, setDBData } from './global.js'
// Misal ! Dataya elave etmek.
const books = [
	{
		title: 'Frontend',
		description: 'text',
		category: 'Frontend',
		image: './images/admin_Images/books/1.jpg',
		author: 'Jon Snow',
	},
]

document.querySelector('.addBookddDatabase').addEventListener('click', () => {
	setDBData('/books', books)
})

const setBookInfo = () => {
	const listNumber = document.querySelector('.admin-list__number')
	const listTitle = document.querySelector('.admin-list__title')
	const listDesc = document.querySelector('.admin-list__description')
	const listCategory = document.querySelector('.admin-list__category')
	const listAuthor = document.querySelector('.admin-list__author')

	getDBData('/books').then(snapshot => {
		const data = snapshot.val()
		const arr = Object.values(data)

		listNumber.innerHTML = ''
		listTitle.innerHTML = ''
		listDesc.innerHTML = ''
		listCategory.innerHTML = ''
		listAuthor.innerHTML = ''

		arr.forEach(book => {
			listNumber.innerHTML += `<li>${arr.length}</li>`
			listTitle.innerHTML += `
                <li class="books__box">
                    <img class='books__image' src="${book.image}" alt="book name" width='27' height='36'>
                    <span class='books__name'>${book.title}</span>
                </li>`
			listDesc.innerHTML += `<li>${book.description}</li>`
			listCategory.innerHTML += `<li>${book.category}</li>`
			listAuthor.innerHTML += `<li>${book.author}</li>`
		})
	})
}

setBookInfo()

// About Store
const setAboutStoreToDB = () => {
	const aboutStoreTitleInput = document.getElementById('aboutStore')
	const aboutStoreImageInput = document.getElementById('bookImageUrl')
	const aboutStoreDescriptionInput = document.getElementById('descriptionFor')

	const aboutStoreData = {
		title: aboutStoreTitleInput.value,
		image: aboutStoreImageInput.value,
		description: aboutStoreDescriptionInput.value,
	}

	setDBData('/aboutStore', aboutStoreData)
}

document.querySelector('.about-store__button').addEventListener('click', setAboutStoreToDB)
