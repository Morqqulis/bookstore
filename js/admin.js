import { getDBData, pushDBData } from './global.js'
const search = document.querySelector('#searchBook')
const searchResultList = document.querySelector('.search-result__list')
const bookInputs = {
	name: document.getElementById('book-name'),
	author: document.getElementById('author-name'),
	imageUrl: document.getElementById('image-url'),
	description: document.getElementById('description'),
	bookType: document.getElementById('book-type'),
}

searchResultList.addEventListener('click', handleSearchResultClick)

function handleSearchResultClick(event) {
	const clickedListItem = event.target.closest('.search-result__list-item')
	if (!clickedListItem) return

	const { title, author, imageUrl, description, bookType } = clickedListItem.dataset

	// Заполняем поля формы данными о книге
	bookInputs.name.value = title || 'Unknown Title'
	bookInputs.author.value = author || 'Unknown Author'
	bookInputs.imageUrl.value = imageUrl || 'https://via.placeholder.com/150'
	bookInputs.description.value = description || 'No description available'
	bookInputs.bookType.value = bookType || 'Unknown Category'
}

const handleSearch = e => {
	const searchTerm = e.target.value.trim()

	if (searchTerm === '') {
		clearResults()
		return
	}

	fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
		.then(response => response.json())
		.then(data => {
			console.log(data.items)
			const books = data.items.map(item => {
				if (
					item.volumeInfo.title &&
					item.volumeInfo.authors &&
					item.volumeInfo.authors.length > 0 &&
					item.volumeInfo.imageLinks &&
					item.volumeInfo.imageLinks.thumbnail &&
					item.volumeInfo.description &&
					item.volumeInfo.categories &&
					item.volumeInfo.categories.length > 0
				) {
					const title = item.volumeInfo.title
					const author = item.volumeInfo.authors[0]
					const image = item.volumeInfo.imageLinks.thumbnail
					const description = item.volumeInfo.description
					const bookType = item.volumeInfo.categories[0]
					return { title, author, image, description, bookType }
				}
			})

			// Удаляем пустые значения из массива книг
			const filteredBooks = books.filter(book => book)

			renderResults(filteredBooks)
		})
		.catch(error => {
			console.error('Error fetching books:', error)
		})
}

const renderResults = results => {
	clearResults()

	results.forEach(result => {
		const { title, author } = result
		const shortenedTitle = title.length > 10 ? `${title.slice(0, 10)}...` : title
		const shortenedAuthor = author.length > 10 ? `${author.slice(0, 10)}...` : author

		searchResultList.innerHTML += `
            <li class="search-result__list-item" 
                data-title="${title}" 
                data-author="${author}" 
                data-image-url="${result.image}" 
                data-description="${result.description}" 
                data-book-type="${result.bookType}">
                <svg class="search-result__icon" width="15.000000" height="17.000000" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="clip257_1849">
                            <rect id="clock" width="15.000000" height="17.000000" fill="white" fill-opacity="0" />
                        </clipPath>
                    </defs>
                    <rect id="clock" width="15.000000" height="17.000000" fill="#FFFFFF" fill-opacity="0" />
                    <g clip-path="url(#clip257_1849)">
                        <path id="Vector" d="M7.5 15.58C4.04 15.58 1.25 12.41 1.25 8.5C1.25 4.58 4.04 1.41 7.5 1.41C10.95 1.41 13.75 4.58 13.75 8.5C13.75 12.41 10.95 15.58 7.5 15.58Z"
                              stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" />
                        <path id="Vector" d="M7.5 4.25L7.5 8.5L10 9.91" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
                    </g>
                </svg>

                <p class="search-result__author">${shortenedAuthor}</p>
                <h3 class="search-result__title">${shortenedTitle}</h3>
            </li>
        `
	})
}

const clearResults = () => (searchResultList.innerHTML = '')

search.addEventListener('input', handleSearch)

// search.addEventListener('input', e => {
// 	clearTimeout(serachTimer)
// 	infos.innerHTML = ''
// 	serachTimer = setTimeout(() => {
// 		loadInformation(e.target.value)
// 	}, 100)
// })

// async function loadInformation(text) {
// 	let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
// 	let response = await request.json()
// 	let arr = response.items
// 	if (Array.isArray(arr)) {
// 		infos.classList.remove('changeVisibility')
// 		arr.forEach(item => {
// 			infos.innerHTML += `<button>${item.volumeInfo.title}</button>`
// 		})
// 		chooseBook()
// 	}
// }

// function chooseBook() {
// 	const buttons = document.querySelectorAll('#infos button')

// 	buttons.forEach(button => {
// 		button.addEventListener('click', () => {
// 			search.value = button.textContent
// 			infos.innerHTML = ''
// 			infos.classList.add('changeVisibility')
// 		})
// 	})
// }

// btnSearch.addEventListener('click', () => {
// 	const searchValue = search.value
// 	if (searchValue.trim().length > 0) {
// 		fillInfo(searchValue.trim())
// 	}
// })

// fill book form starts

// async function fillInfo(text) {
// 	let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
// 	let response = await request.json()
// 	let arr = response.items

// 	if (Array.isArray(arr)) {
// 		bookName.value = arr[0].volumeInfo.title
// 		for (let i = 0; i < arr[0].volumeInfo.authors.length; i++) {
// 			author.value = arr[0].volumeInfo.authors[i] + ' '
// 		}
// 		imageUrl.value = arr[0].volumeInfo.imageLinks.thumbnail
// 		description.value = arr[0].volumeInfo.description

// 		for (let i = 0; i < arr[0].volumeInfo.categories.length; i++) {
// 			bookType.value = arr[0].volumeInfo.categories[i] + ' '
// 		}
// 		// about store
// 		title.value = arr[0].volumeInfo.title
// 		descriptionForStore.value = arr[0].volumeInfo.description
// 		imageUrl2.value = arr[0].volumeInfo.imageLinks.thumbnail
// 		// about store

// 		if (bookName.value.trim().length > 0 && author.value.trim().length > 0) {
// 			// btnAdd.addEventListener('click', () => {
// 			// 	// burada bazaya gonderirik melumatlari
// 			// 	bookName.value = ''
// 			// 	author.value = ''
// 			// 	imageUrl.value = ''
// 			// 	description.value = ''
// 			// 	bookType.value = ''
// 			// 	btnAdd.disabled = true
// 			// })
// 			// btnAddInfo.addEventListener('click', () => {
// 			// 	// burada bazaya gonderirik melumatlari
// 			// 	title.value = ''
// 			// 	descriptionForStore.value = ''
// 			// 	imageUrl2.value = ''
// 			// 	btnAddInfo.disabled = true
// 			// })
// 		}
// 	}
// }
// fill book form ends

const books = []
const setBookInDB = async () => {
	const title = bookInputs.name.value.trim()
	const author = bookInputs.author.value.trim()
	const imageUrl = bookInputs.imageUrl.value.trim()
	const description = bookInputs.description.value.trim()
	const bookType = bookInputs.bookType.value.trim()

	// Проверка на пустые значения инпутов
	if (!title || !author || !imageUrl || !description || !bookType) {
		alert('All fields must be filled out')
		return
	}
	const bookInfo = {
		title: bookInputs.name.value,
		description: bookInputs.description.value,
		category: bookInputs.bookType.value,
		image: bookInputs.imageUrl.value,
		author: bookInputs.author.value,
	}

	try {
		books.push(bookInfo)
		await pushDBData('/books', bookInfo)
		console.log('Book data successfully written to the database')
	} catch (error) {
		console.error('Error writing book data to the database:', error)
	}

	bookInputs.name.value = ''
	bookInputs.author.value = ''
	bookInputs.imageUrl.value = ''
	bookInputs.description.value = ''
	bookInputs.bookType.value = ''
}

document.querySelector('.addBookddDatabase').addEventListener('click', async e => {
	e.preventDefault()
	await setBookInDB()
})

// const setBookInfo = () => {
//   if (window.location.href === "admin.html") {
//     const listNumber = document.querySelector(".admin-list__number");
//     const listTitle = document.querySelector(".admin-list__title");
//     const listDesc = document.querySelector(".admin-list__description");
//     const listCategory = document.querySelector(".admin-list__category");
//     const listAuthor = document.querySelector(".admin-list__author");

//     // Data elde etmek:
//     getDBData("/books").then((snapshot) => {
//       const data = snapshot.val();
//       // data = firebasedeki books.

// 			const arr = Object.values(data)

// 			listNumber.innerHTML = ''
// 			listTitle.innerHTML = ''
// 			listDesc.innerHTML = ''
// 			listCategory.innerHTML = ''
// 			listAuthor.innerHTML = ''

// 			arr.forEach(book => {
// 				listNumber.innerHTML += `<li>${arr.length}</li>`
// 				listTitle.innerHTML += `
//                     <li class="books__box">
//                         <img class='books__image' src="${book.image}" alt="book name" width='27' height='36'>
//                         <span class='books__name'>${book.title}</span>
//                     </li>`
// 				listDesc.innerHTML += `<li>${book.description}</li>`
// 				listCategory.innerHTML += `<li>${book.category}</li>`
// 				listAuthor.innerHTML += `<li>${book.author}</li>`
// 			})
// 		})
// 	}
// }

// setBookInfoIntoHTML()

// About Store
const setAboutStoreInfoToDB = () => {
	const aboutStoreTitleInput = document.getElementById('aboutStore')
	const aboutStoreImageInput = document.getElementById('bookImageUrl')
	const aboutStoreDescriptionInput = document.getElementById('descriptionFor')

	const aboutStoreData = {
		title: aboutStoreTitleInput.value,
		image: aboutStoreImageInput.value,
		description: aboutStoreDescriptionInput.value,
	}

	const { title, image, description } = aboutStoreData

	if (!title && !image && !description) return alert('All fields are required!')

	push('/aboutStore', aboutStoreData)

	aboutStoreTitleInput.value = ''
	aboutStoreImageInput.value = ''
	aboutStoreDescriptionInput.value = ''
}

document.querySelector('.about-store__button').addEventListener('click', setAboutStoreInfoToDB)

// ------------------Join Us----------------------

getDBData('/users').then(data => {
	const users = Object.values(data)
	const userNumber = document.querySelector('#JoinUsLi')
	const userFullName = document.querySelector('#join-us-fullname')
	const userEmail = document.querySelector('#join-us-email')

	users.forEach((user, index) => {
		userNumber.innerHTML += `
		<li class="join-us__list-item">${index + 1}</li>
		`
		userFullName.innerHTML += `
		<li class="join-us__list-item"><span>${user.name}</span></li>
		`
		userEmail.innerHTML += `
		<li class="join-us__list-item"><span>${user.email}</span></li>
		`
	})
})

// -------------------Books--------------------------
getDBData('/books').then(data => {
	const books = Object.values(data)
	const booksNumbers = document.querySelector('#booksNumber')
	const booksTitles = document.querySelector('#booksTitle')
	const booksDesc = document.querySelector('#booksDesc')
	const booksType = document.querySelector('#booksType')
	const booksAuthor = document.querySelector('#booksAuthor')

	books.forEach((book, index) => {
		booksNumbers.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">${index + 1}</li>
	`
		booksTitles.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">
	<img src="${book.image}" alt="book images ">
	<span>${book.title.length > 20 ? book.title.slice(0, 20) + '...' : book.title}</span>
	</li>
	`
		booksDesc.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex"><span>${book.description.length > 30 ? book.description.slice(0, 30) + '...' : book.description}</span></li>
	`
		booksType.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex"><span>${book.category}</span></li>
	`
		booksAuthor.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex"><span>${book.author}</span></li>
	`
	})
})
// ---------------------------Contact-----------------------------

getDBData('/contacs').then(contacts => {
	console.log(contacts)
})


