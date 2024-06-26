'use strict'

import { getBooks, getDBData } from './global.js'
/* ================================================ */

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
const html = document.documentElement
const bookGenre = localStorage.getItem('genre')
const sliders = document.querySelectorAll('.slider')
/* ====================================================== */

// Genres
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

window.setBookTitleToStorage = function (title) {
	localStorage.setItem('bookTitle', title)
	window.location.href = 'book.html'
}

/* Sliders */
const renderBook = (book, isNew) => {
	const { image, title, author } = book

	return `
        <div class="swiper-slide catalog__slide">
            <div class="catalog__card ${isNew ? 'catalog__card_new' : ''} wow animate__zoomIn">
                <div class="swiper-zoom-container" data-swiper-zoom="2">
                    <img class="catalog__card-img" src="${image || book?.imageLinks?.thumbnail}" alt="book" width="135" height="180" loading="lazy">
                </div>
                <div class="swiper-lazy-preloader"></div>
                <div class="catalog__card-info">
                    <span class="catalog__card-name">${title.length > 15 ? title.slice(0, 15) + '...' : title}</span>
                    <span class="catalog__card-author">${author || book?.authors[0]}</span>
                    <button class="catalog__card-btn btn" onclick="setBookTitleToStorage('${title}')" type="button" title="read">READ MORE</button>
                </div>
            </div>
        </div>
    `
}

const appendSliderItems = () => {
	const swiperWrappers = document.querySelectorAll('.swiper-wrapper')

	getBooks(localStorage.getItem('genre')).then(data => {
		let randomSlider = Math.floor(Math.random() * data.items.length)
		data?.items.forEach((item, i) => {
			if (item?.volumeInfo?.imageLinks) {
				swiperWrappers[0].insertAdjacentHTML('afterbegin', renderBook(item.volumeInfo, i === randomSlider))
			}
		})
	})

	getDBData('/books').then(data => {
		const books = Object.values(data)
		const bestsellers = books.filter(book => book.bestsellers)

		bestsellers.forEach(book => (swiperWrappers[1].innerHTML += renderBook(book, book.newBooks)))

		books.filter(book => book.newBooks).forEach(book => (swiperWrappers[2].innerHTML += renderBook(book, book.newBooks)))
	})

	swiperWrappers.forEach(wrapper => (wrapper.innerHTML = ''))
}

if (document.querySelector('.catalog__genres')) {
	appendGenre(bookGenre)
}

if (bookGenre) {
	appendSliderItems()
}

sliders.forEach((slider, i) => {
	const breakPointOptions = () => {
		if (i !== 2) {
			return {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 50,
				},
				1200: {
					slidesPerView: 5,
					spaceBetween: 60,
				},
			}
		}
	}

	new Swiper(slider, {
		nested: true,
		slidesPerView: 5,
		spaceBetween: 60,
		mouseControl: true,
		scroll: true,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		speed: 1000,
		zoom: {
			maxRatio: 5,
		},

		effect: `${i === 0 ? 'coverflow' : i === 1 ? 'slide' : 'cube'}`,

		autoplay: {
			enabled: true,
			delay: 3000,
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		breakpoints: breakPointOptions(),
	})
})

/* ===================================================================== */

html.addEventListener('click', e => {
	const genreButtons = document.querySelectorAll('.catalog__genres-btn')

	/* Set active genre */
	if (e.target.closest('.catalog__genres-btn')) {
		genreButtons.forEach(button => button.classList.remove('catalog__genres-btn_active'))
		e.target.classList.add('catalog__genres-btn_active')
		localStorage.setItem('genre', e.target.textContent)

		appendSliderItems()
	}
})
