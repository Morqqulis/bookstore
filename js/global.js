'use strict'
/* ================================================ */
/* FIREBASE SETTINGS */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { get, getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

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
export const setDBData = async (path, data) => {
	try {
		await set(ref(db, path), data)
		console.log('Data successfully written to the database')
	} catch (error) {
		console.error('Error writing data to the database:', error)
	}
}

export const pushDBData = async (path, data) => {
	try {
		await push(ref(db, path), data)
		console.log('Data successfully written to the database')
	} catch (error) {
		console.error('Error writing data to the database:', error)
	}
}

export const getDBData = async path => {
	try {
		const snapshot = await get(ref(db, path))
		if (snapshot.exists()) {
			return snapshot.val()
		} else {
			return null
		}
	} catch (error) {
		console.error('Error getting data from the database:', error)
		return null
	}
}

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

const addJoinedUser = () => {
	const modal = document.getElementById('modal')
	const [nameValue, emailValue] = ['join-name', 'join-email'].map(id => document.getElementById(id).value.trim())
	// if (!nameValue || !emailValue) return

	getDBData('/users').then(users => {
		const newUser = {
			name: nameValue,
			email: emailValue,
			role: 'user',
		}

		pushDBData('/users', newUser)

		modal.close()
		html.classList.remove('modal-open')

		document.getElementById('join-name').value = ''
		document.getElementById('join-email').value = ''
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
const header = document.querySelector('.header')
if (header) {
	window.addEventListener('scroll', e => {
		header.classList.toggle('header_scrolled', window.scrollY > 100)
	})
}

const checkAuth = () => {
	const authInfo = sessionStorage.getItem('adminAuthenticated')
	if (!authInfo || authInfo !== 'true') {
		window.location.href = 'adminLogin.html'
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if (window.location.pathname.includes('admin.html')) {
		checkAuth()
	}
})
