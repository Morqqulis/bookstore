/* ================================================================== */
document.addEventListener('DOMContentLoaded', () => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		// effect: 'fade',

		observer: true,
		observeParents: true,

		autoplay: {
			enabled: true,
			delay: 2500,
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	const sliderWrapper = document.querySelector('.swiper-wrapper')

	const getBookDataFromApi = async () => {
		const searchInput = document.getElementById('searchBook').value
		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput ? searchInput : 'Frontend'}`)
		const data = await res.json()
		const books = data.items
		return books
	}

	const renderBooks = async () => {
		const books = await getBookDataFromApi()
		books.forEach(book => {
			const bookCover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''
			const bookTitle = book.volumeInfo.title
			const bookAuthor = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'
			const bookDescription = book.volumeInfo.description ? book.volumeInfo.description : 'No description available'
			const bookType = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown'
			sliderWrapper.innerHTML += `
                <div class="swiper-slide">
                    <div class="card">
                        <img src="${bookCover}" class="card-img-top" loading="lazy" alt="Book Cover">
                        <div class="card-body">
                            <h5 class="card-title">${bookTitle}</h5>
                            <p class="card-text"><strong>Author:</strong> ${bookAuthor}</p>
                            <p class="card-text"><strong>Type:</strong> ${bookType}</p>
                            <p class="card-text"><strong>Description:</strong> ${bookDescription.length > 200 ? bookDescription.slice(0, 200) + '...' : bookDescription}</p>
                        </div>
                    </div>
                </div>
            `
		})
		swiper.update()
	}

	document.getElementById('searchBookBtn').addEventListener('click', async () => {
		sliderWrapper.innerHTML = ''
		await renderBooks()
	})

	renderBooks()
})
