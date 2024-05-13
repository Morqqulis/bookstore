'use strict'

import { getBooks, getDBData } from './global.js'
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

window.setBookId = function (id) {
	localStorage.setItem('bookId', id)
	window.location.href = 'book.html'
}

const appendSliderItems = () => {
	const swiperWrappers = document.querySelectorAll('.swiper-wrapper')
	getBooks(localStorage.getItem('genre')).then(data => {
		let randomSlider = Math.floor(Math.random() * data.items.length)
		data?.items.forEach((item, i) => {
			if (item.volumeInfo.imageLinks) {
				swiperWrappers[0].insertAdjacentHTML(
					'afterbegin',
					`
                        <div class="swiper-slide catalog__slide">
                            <div class="catalog__card ${i === randomSlider ? 'catalog__card_new' : ''}">
                                <img class="catalog__card-img" src="${item.volumeInfo.imageLinks.thumbnail}" alt="book" width="135" height="180" loading="lazy">
                                <div class="catalog__card-info">
                                    <span class="catalog__card-name">${item.volumeInfo.title}</span>
                                    <span class="catalog__card-author">${item.volumeInfo?.authors}</span>
                                    <button class="catalog__card-btn btn" onclick="setBookId('${item.id}')" type="button" title="read">READ MORE</button>
                                </div>
                            </div>
                        </div>
                    `
				)
			}
		})
	})

	getDBData('/bestsellers').then(data => {
		const books = Object.values(data)
		let randomSlider = Math.floor(Math.random() * books.length)
		books.forEach((book, i) => {
			swiperWrappers[1].innerHTML += `
                <div class="swiper-slide catalog__slide">
                    <div class="catalog__card ${i === randomSlider ? 'catalog__card_new' : ''}">
                        <img class="catalog__card-img" src="${book.image}" alt="book" width="135" height="180" loading="lazy">
                        <div class="catalog__card-info">
                            <span class="catalog__card-name">${book.title}</span>
                            <span class="catalog__card-author">${book.author}</span>
                            <button class="catalog__card-btn btn" onclick="setBookId('${book.author}')" type="button" title="read">READ MORE</button>
                        </div>
                    </div>
                </div>
            `
		})
	})

	getDBData('/new').then(data => {
		const books = Object.values(data)
		let randomSlider = Math.floor(Math.random() * books.length)
		books.forEach(book => {
			swiperWrappers[2].innerHTML += `
                <div class="swiper-slide catalog__slide">
                    <div class="catalog__card catalog__card_new">
                        <img class="catalog__card-img" src="${book.image}" alt="book" width="135" height="180" loading="lazy">
                        <div class="catalog__card-info">
                            <span class="catalog__card-name">${book.title}</span>
                            <span class="catalog__card-author">${book.author}</span>
                            <button class="catalog__card-btn btn" onclick="setBookId('${book.author}')" type="button" title="read">READ MORE</button>
                        </div>
                    </div>
                </div>
            `
		})
	})

	swiperWrappers.forEach(wrapper => (wrapper.innerHTML = ''))
}

const bookGenre = localStorage.getItem('genre')

if (document.querySelector('.catalog__genres')) {
	appendGenre(bookGenre)
}

if (bookGenre) {
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
const headerLogo = document.querySelector(".header__logo");
const headerMenu = document.querySelector(".header__menu")

headerLogo.addEventListener('mouseenter',() =>{
    headerMenu.classList.toggle("active")
})


headerMenu.addEventListener('mouseleave',() =>{
    headerMenu.classList.remove("active")
})
