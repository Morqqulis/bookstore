'use strict'

/* ======================================================================== */
localStorage.setItem('genre', 'Frontend')
/* Modal */
const html = document.documentElement

html.addEventListener('click', e => {
	const modalTrigger = e.target.closest('.header__action')
	const modal = document.getElementById('modal')
	const genreButtons = document.querySelectorAll('.catalog__genres-btn')

	/* Open || Close Modal */
	if (e.target == modalTrigger) {
		modal.show()
		html.classList.add('modal-open')
	} else if (!e.target.closest('.modal__content') && html.classList.contains('modal-open')) {
		modal.close()
		html.classList.remove('modal-open')
	}

	/* Active navigation */
	if (e.target.closest('.header__menu-link')) {
		navLinks.forEach(link => link.classList.remove('header__menu-link_active'))
		e.target.classList.add('header__menu-link_active')
	}

	/* Set active genre */
	if (e.target.closest('.catalog__link')) {
		localStorage.setItem('genre', e.target.textContent)
	}

	if (e.target.closest('.catalog__genres-btn')) {
		genreButtons.forEach(button => button.classList.remove('catalog__genres-btn_active'))
		e.target.classList.add('catalog__genres-btn_active')
		localStorage.setItem('genre', e.target.textContent)

		appendSliderItems()
		firstSlider.update()
		secondSlider.update()
		thirdSlider.update()
	}
})

/* ========================Close Modal by Esc============================= */
const handleCloseModalByEsc = e => {
	if (e.key === 'Escape') {
		const modal = document.getElementById('modal')
		modal.close()
		html.classList.remove('modal-open')
	}
}

document.addEventListener('keydown', handleCloseModalByEsc)

/* ===================================================================== */
/* Sliders */
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
const swiperWrappers = document.querySelectorAll('.swiper-wrapper')

const getBooks = async genre => {
	const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${genre}`)

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`)
	}
	const booksData = await response.json()

	return booksData
}

const appendGenre = genre => {
	const genreList = document.querySelector('.catalog__genres')
	genreList.insertAdjacentHTML(
		'afterbegin',
		`
        <li class="catalog__genres-item">
            <button class="catalog__genres-btn catalog__genres-btn_active" type="button" title="genre">${genre}</button>
        </li>
    `
	)
}

const appendSliderItems = () => {
	getBooks(localStorage.getItem('genre')).then(data => {
		data.items.forEach(item => {
			if (item.volumeInfo.imageLinks) {
				swiperWrappers.forEach(swiperWrapper => {
					swiperWrapper.insertAdjacentHTML(
						'afterbegin',
						`
                            <div class="swiper-slide catalog__slide">
                                <div class="catalog__card">
                                    <img class="catalog__card-img" src="${item.volumeInfo.imageLinks.thumbnail}" alt="book" width="135" height="180" loading="lazy">
                                    <div class="catalog__card-info">
                                        <span class="catalog__card-name">${item.volumeInfo.title}</span>
                                        <span class="catalog__card-author">${item.volumeInfo.authors}</span>
                                        <button class="catalog__card-btn btn" type="button" title="read">READ MORE</button>
                                    </div>
                                </div>
                            </div>
                        `
					)
				})
			}
		})
	})

	swiperWrappers.forEach(wrapper => (wrapper.innerHTML = ''))
}

if (document.querySelector('.catalog__genres')) {
	appendGenre(localStorage.getItem('genre'))
}

if (localStorage.getItem('genre')) {
	appendSliderItems()
}

const firstSlider = new Swiper('.catalog__first-slider', {
	slidesPerView: 5,
	spaceBetween: 60,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

const secondSlider = new Swiper('.catalog__second-slider', {
	slidesPerView: 5,
	spaceBetween: 60,
	loop: true,
	Autoplay: {},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

const thirdSlider = new Swiper('.catalog__third-slider', {
	slidesPerView: 5,
	spaceBetween: 60,
	loop: true,

	Autoplay: {
		delay: 3000,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

/* ===================================================================== */
