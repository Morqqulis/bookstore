'use strict'
/* ================================================ */
/* FIREBASE SETTINGS */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { get, getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

const firebaseConfig = {
	apiKey: 'AIzaSyCmqaLqRNuNFPa610SdqidREV9nJTSLAJE',
	authDomain: 'bookstore-15c2d.firebaseapp.com',
	databaseURL: 'https://bookstore-15c2d-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'bookstore-15c2d',
	storageBucket: 'bookstore-15c2d.appspot.com',
	messagingSenderId: '610199393566',
	appId: '1:610199393566:web:caad5c49151a984655650f',
	measurementId: 'G-JHX0N9BE3M',
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

/* ================================================ */
/* FIREBASE SET & GET FUNCTIONS */
export const setDBData = (path, data) => set(ref(db, path), data)

export const getDBData = path => get(ref(db, path))

/* ======================================================================== */
/* Get data from API */

export const getBooks = async (genre = '', id = '') => {
	const URL = 'https://www.googleapis.com/books/v1/volumes'
	const res = await fetch(genre ? `${URL}?q=${genre}` : id ? `${URL}?q=${id}` : `${URL}?q=Frontend`)

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`)
	}

	return await res.json()
}

/* ====================================================== */

/* ====================================================== */
/* Close Modal by Esc */
const handleCloseModalByEsc = e => {
	if (html.classList.contains('modal-open')) {
		if (e.key === 'Escape') {
			const modal = document.getElementById('modal')
			modal.close()
			html.classList.remove('modal-open')
		}
	}
}

/* ===================================================================== */
/* Add joined user */
const modalNameInput = document.getElementById('join-name')
const modalEmailInput = document.getElementById('join-email')
const checkInputs = () => {
	const submitBtn = document.getElementById('join-submit')
	submitBtn.disabled = !(modalNameInput.value.trim() && modalEmailInput.value.trim())
}

const addJoinedUser = () => {
	const modalNameValue = modalNameInput.value.trim()
	const emailValue = modalEmailInput.value.trim()
	setDBData('/users', {
		name: modalNameValue,
		email: emailValue,
		role: 'user',
	})
}

/* ===================================================================== */
/* Active navigation */
const navLinks = document.querySelectorAll('.header__menu-link')

navLinks.forEach(link => {
	if (link.href === window.location.href) {
		navLinks.forEach(link => link.classList.remove('header__menu-link_active'))
		link.classList.add('header__menu-link_active')
	}
})
/* ===================================================================== */
const html = document.documentElement
document.addEventListener('keydown', handleCloseModalByEsc)

html.addEventListener('click', e => {
	const modalTrigger = e.target.closest('.header__action')
	const modal = document.getElementById('modal')
	/* Open || Close Modal */
	if (e.target == modalTrigger) {
		modal.show()
		html.classList.add('modal-open')
	} else if (!e.target.closest('.modal__content') && html.classList.contains('modal-open')) {
		modal.close()
		html.classList.remove('modal-open')
	}

	/* Set active genre */
	if (e.target.closest('.catalog__link')) localStorage.setItem('genre', e.target.textContent)

	/* Add joined user */
	if (e.target.closest('#join-submit')) {
		addJoinedUser()
	}
})

const modal = document.querySelector('.modal')
if (modal) {
	addEventListener('input', e => {
		checkInputs()
	})
}
