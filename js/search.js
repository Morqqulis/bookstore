/* ================================================================== */
document.addEventListener('DOMContentLoaded', () => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		effect: 'fade',
		autoHeight: true,
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
		const fields = 'items(volumeInfo/title,volumeInfo/authors,volumeInfo/description,volumeInfo/categories,volumeInfo/imageLinks/thumbnail)'
		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput ? searchInput : 'JavaScript'}&fields=${fields}`)
		const data = await res.json()
		return data.items
	}

	const renderBooks = async () => {
		const books = await getBookDataFromApi()
		books.forEach(({ volumeInfo }) => {
			const { imageLinks, title, authors, description, categories } = volumeInfo
			sliderWrapper.innerHTML += `
                <div class="swiper-slide">
                    <div class="card wow animate__zoomIn">
                        <div class="swiper-zoom-container" data-swiper-zoom="5">
                            <img src="${imageLinks?.thumbnail}" class="card-img-top" loading="lazy" alt="Book Cover" width="128" height="192">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><strong>Author:</strong> ${authors.join(', ')}</p>
                            <p class="card-text"><strong>Type:</strong> ${categories?.join(', ')}</p>
                            <p class="card-text"><strong>Description:</strong> ${description?.length > 100 ? `${description.slice(0, 100)}...` : description}</p>
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
