'use strict'

import { getBooks, getDBData } from './global.js'
/* ================================================ */

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
const html = document.documentElement
const bookGenre = localStorage.getItem('genre')
/* ====================================================== */
/* Sliders */

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

window.setBookId = function (id) {
	localStorage.setItem('bookId', id)
	window.location.href = 'book.html'
}

const generateBookHTML = (book, isNew) => {
	const { image, title, author } = book
	return `
        <div class="swiper-slide catalog__slide">
            <div class="catalog__card ${isNew ? 'catalog__card_new' : ''} wow animate__zoomIn">
                <div class="swiper-zoom-container" data-swiper-zoom="5">
                    <img class="catalog__card-img" src="${image || book.imageLinks.thumbnail}" alt="book" width="135" height="180" loading="lazy">
                </div>
                <div class="swiper-lazy-preloader"></div>
                <div class="catalog__card-info">
                    <span class="catalog__card-name">${title}</span>
                    <span class="catalog__card-author">${author || book.authors[0]}</span>
                    <button class="catalog__card-btn btn" onclick="setBookId('${author || book.authors[0]}')" type="button" title="read">READ MORE</button>
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
				swiperWrappers[0].insertAdjacentHTML('afterbegin', generateBookHTML(item.volumeInfo, i === randomSlider))
			}
		})
	})

	getDBData('/books').then(data => {
		const books = Object.values(data)
		const bestAndNewBooks = books.filter(book => book.bestsellers || book.newBooks)

		bestAndNewBooks.forEach(book => (swiperWrappers[1].innerHTML += generateBookHTML(book, book.newBooks)))
		books.filter(book => book.newBooks).forEach(book => (swiperWrappers[2].innerHTML += generateBookHTML(book, book.newBooks)))
	})

	swiperWrappers.forEach(wrapper => (wrapper.innerHTML = ''))
}

if (document.querySelector('.catalog__genres')) {
	appendGenre(bookGenre)
}

if (bookGenre) {
	appendSliderItems()
}

const sliders = document.querySelectorAll('.slider')

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
		slidesPerView: 5,
		spaceBetween: 60,
		mouseControl: true,
		scroll: true,
		observer: true,
		observeParents: true,
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
