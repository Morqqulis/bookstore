'use strict'

import { getBooks } from './global.js'
/* ================================================ */

const html = document.documentElement

html.addEventListener('click', e => {
	const genreButtons = document.querySelectorAll('.catalog__genres-btn')

	/* Set active genre */
	if (e.target.closest('.catalog__genres-btn')) {
		genreButtons.forEach(button => button.classList.remove('catalog__genres-btn_active'))
		e.target.classList.add('catalog__genres-btn_active')
		localStorage.setItem('genre', e.target.textContent)

		/* Update Sliders */
		appendSliderItems()
		firstSlider.update()
		secondSlider.update()
		thirdSlider.update()
	}
})

/* ====================================================== */
/* Sliders */
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
const swiperWrappers = document.querySelectorAll('.swiper-wrapper')

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

// Определение функции setBookId
window.setBookId = function (id) {
	localStorage.setItem('bookId', id)
	window.location.href = 'book.html'
}

// Ваша функция appendSliderItems
const appendSliderItems = () => {
	const swiperWrappers = document.querySelectorAll('.swiper-wrapper')

	getBooks(localStorage.getItem('genre')).then(data => {
		data?.items.forEach(item => {
			if (item.volumeInfo.imageLinks) {
				/* Append Sliders */
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
                                        <button class="catalog__card-btn btn" onclick="setBookId('${item.id}')" type="button" title="read">READ MORE</button>
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

// Здесь можно вызвать appendSliderItems или другие функции, которые могут использовать setBookId

if (document.querySelector('.catalog__genres')) {
	appendGenre(localStorage.getItem('genre'))
}

if (localStorage.getItem('genre')) {
	appendSliderItems()
}

const firstSlider = new Swiper('.catalog__first-slider', {
	slidesPerView: 5,
	spaceBetween: 60,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

const secondSlider = new Swiper('.catalog__second-slider', {
	slidesPerView: 5,
	spaceBetween: 60,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

const thirdSlider = new Swiper('.catalog__third-slider', {
	slidesPerView: 5,
	spaceBetween: 60,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

/* ===================================================================== */
