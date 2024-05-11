import { getDBData, setDBData } from './global.js'

const search = document.querySelector('#searchBook')
const infos = document.querySelector('#infos')
const btnSearch = document.querySelector('#btn-search')
const bookName = document.querySelector('#book-name')
const author = document.querySelector('#author-name')
const imageUrl = document.querySelector('#image-url')
const description = document.querySelector('#description')
const bookType = document.querySelector('#book-type')
const title = document.querySelector('#aboutStore')
const descriptionForStore = document.querySelector('#descriptionFor')
const imageUrl2 = document.querySelector('#bookImageUrl')
const btnAdd = document.querySelector('#addButton')
const btnAddInfo = document.querySelector('#addInfoButton')

let serachTimer = null
search.addEventListener('input', e => {
	clearTimeout(serachTimer)
	infos.innerHTML = ''
	serachTimer = setTimeout(() => {
		loadInformation(e.target.value)
	}, 100)
})

async function loadInformation(text) {
	let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
	let response = await request.json()
	let arr = response.items
	if (Array.isArray(arr)) {
		infos.classList.remove('changeVisibility')
		arr.forEach(item => {
			infos.innerHTML += `<button>${item.volumeInfo.title}</button>`
		})
		chooseBook()
	}
}

function chooseBook() {
	const buttons = document.querySelectorAll('#infos button')

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			search.value = button.textContent
			infos.innerHTML = ''
			infos.classList.add('changeVisibility')
		})
	})
}

btnSearch.addEventListener('click', () => {
	const searchValue = search.value
	if (searchValue.trim().length > 0) {
		fillInfo(searchValue.trim())
	}
})

// fill book form starts
async function fillInfo(text) {
	let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
	let response = await request.json()
	let arr = response.items
	console.log(arr)
	if (Array.isArray(arr)) {
		bookName.value = arr[0].volumeInfo.title
		for (let i = 0; i < arr[0].volumeInfo.authors.length; i++) {
			author.value = arr[0].volumeInfo.authors[i] + ' '
		}
		imageUrl.value = arr[0].volumeInfo.imageLinks.thumbnail
		description.value = arr[0].volumeInfo.description

		for (let i = 0; i < arr[0].volumeInfo.categories.length; i++) {
			bookType.value = arr[0].volumeInfo.categories[i] + ' '
		}
		// about store
		title.value = arr[0].volumeInfo.title
		descriptionForStore.value = arr[0].volumeInfo.description
		imageUrl2.value = arr[0].volumeInfo.imageLinks.thumbnail
		// about store

		if (bookName.value.trim().length > 0 && author.value.trim().length > 0) {
			btnAdd.addEventListener('click', () => {
				// burada bazaya gonderirik melumatlari
				bookName.value = ''
				author.value = ''
				imageUrl.value = ''
				description.value = ''
				bookType.value = ''
				btnAdd.disabled = true
			})
			btnAddInfo.addEventListener('click', () => {
				// burada bazaya gonderirik melumatlari
				title.value = ''
				descriptionForStore.value = ''
				imageUrl2.value = ''
				btnAddInfo.disabled = true
			})
		}
	}
}
// fill book form ends

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
	if (window.location.href === 'admin.html') {
		const listNumber = document.querySelector('.admin-list__number')
		const listTitle = document.querySelector('.admin-list__title')
		const listDesc = document.querySelector('.admin-list__description')
		const listCategory = document.querySelector('.admin-list__category')
		const listAuthor = document.querySelector('.admin-list__author')

		// Data elde etmek:
		getDBData('/books').then(snapshot => {
			const data = snapshot.val()
			// data = firebasedeki books.

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

// Data elde etmek:  Istifade qaydasi
// '/aboutStore' = yani firebase deki 'aboutStore'
// data - yani firebasedeki 'aboutStore'-un melumati.

// getDBData('/aboutStore').then(snapshot => {
// 	const data = snapshot.val()
// 	console.log(data)
// })

// Data elave etmek: Istifade qaydasi
// '/books' = yani firebasede  'books' yaratmag.

// const kitab = {
//     title: 'Frontend',
//     description: 'text',
//     category: 'Frontend',
//     image: './images/admin_Images/books/1.jpg',
//     author: 'Jon Snow',
// }

// setDBData('/books', kitab)

getDBData('/').then(data => {
	console.log(data.val())
})
