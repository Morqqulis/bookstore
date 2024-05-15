'use strict'
/* ================================================ */
/* FIREBASE SETTINGS */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { get, getDatabase, push, ref, set } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

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
/* FIREBASE SET, PUSH, GET FUNCTIONS FOR EXPORT */
/*--------------------------------------------------------------------- */
// Set data to database
export const setDBData = (path, data) => {
	try {
		set(ref(db, path), data)
		console.log('Data successfully written to the database')
	} catch (error) {
		console.error('Error writing data to the database:', error)
	}
}
/*--------------------------------------------------------------------- */
// Push data to database
export const pushDBData = (path, data) => {
	try {
		push(ref(db, path), data)
		console.log('Data successfully written to the database')
	} catch (error) {
		console.error('Error writing data to the database:', error)
	}
}
/*--------------------------------------------------------------------- */
// Get data from database
export const getDBData = async path => {
	try {
		const data = await get(ref(db, path))
		if (data.exists()) {
			return data.val()
		}
	} catch (error) {
		console.error('Error getting data from the database:', error)
		return null
	}
}

/* ======================================================================== */
/* Get Books from API */
export const getBooks = async (genre = '', id = '') => {
	const URL = 'https://www.googleapis.com/books/v1/volumes'
	const res = await fetch(genre ? `${URL}?q=${genre}` : id ? `${URL}?q=${id}` : `${URL}?q=Frontend`)

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`)
	}

	return await res.json()
}

/* ====================================================== */
// Global variables
const html = document.documentElement
const modal = document.getElementById('modal')
const signUpModal = document.getElementById('signUp')
const signUpSubmit = document.getElementById('signUp-submit')
const header = document.querySelector('.header')
const navLinks = document.querySelectorAll('.header__menu-link')
/* ============Global Functions============ */

/* function to close Modal by Esc */
const handleCloseModalByEsc = e => {
	if (html.classList.contains('modal-open')) {
		if (e.key === 'Escape') {
			modal.close()
			html.classList.remove('modal-open')
		}
	}
}

/* ---------------------------------------------------------- */

const handleCloseMenuByEsc = e => {
	if (html.classList.contains('menu-open') && e.key === 'Escape') {
		html.classList.remove('menu-open')
	}
}
/* ---------------------------------------------------------- */
// Show message with animation
function showMessage(messageElement, messageText) {
	messageElement.textContent = messageText
	messageElement.classList.add('show')
}

// Hide message with animation
function hideMessage(messageElement) {
	messageElement.classList.remove('show')
}

/* Add joined user to DB */
const addJoinedUser = async () => {
	const fields = ['join-name', 'join-email']
	const [nameValue, emailValue] = fields.map(id => document.getElementById(id).value.trim())
	const messages = ['.modal__name-message', '.modal__email-message'].map(className => document.querySelector(className))

	const showError = (messageElement, messageText) => {
		messageElement.textContent = messageText
		messageElement.style.opacity = '1'
	}

	const hideError = messageElement => {
		messageElement.textContent = ''
		messageElement.style.opacity = '0'
	}

	if (validator.isEmpty(nameValue)) return showError(messages[0], 'Name can not be empty')
	if (nameValue.length < 3) return showError(messages[0], 'Name must be at least 3 characters long')
	hideError(messages[0])

	if (!validator.isEmail(emailValue)) return showError(messages[1], 'Please enter a valid email address')
	if (validator.isEmpty(emailValue)) return showError(messages[1], 'Email can not be empty')
	hideError(messages[1])

	const users = Object.values(await getDBData('/users'))
	if (users.some(user => user.email === emailValue)) return showError(messages[1], 'This email is already joined')
	hideError(messages[1])

	const newUser = { name: nameValue, email: emailValue }
	await pushDBData('/users', newUser)
	modal.classList.add('modal_closed')

	setTimeout(() => {
		modal.close()
		html.classList.remove('modal-open')
	}, 1500)

	fields.forEach(field => (document.getElementById(field).value = ''))
}

/* -------------------------------------------------------------- */
/* Highlight Active navigation link */

navLinks.forEach(link => {
	if (link.href === window.location.href) {
		navLinks.forEach(link => link.classList.remove('header__menu-link_active'))
		link.classList.add('header__menu-link_active')
	}
})
/* -------------------------------------------------------------- */
// Check auth for admin in AdminLogin page
const checkAuth = () => {
	const authInfo = sessionStorage.getItem('adminAuthenticated')
	if (!authInfo || authInfo !== 'true') {
		window.location.href = 'adminLogin.html'
	}
}
/* -------------------------------------------------------------- */

/* Function to close menu on resize */
const closeMenuOnResize = () => {
	if (window.innerWidth > 768) {
		html.classList.remove('menu-open')
	}
}

/* -------------------------------------------------------------- */
/* Function to remove class name from HTML */
const removeClassNameFromHTML = className => {
	html.classList.remove(`${className}`)
}

/* -------------------------------------------------------------- */
/* Function to add class name to HTML */
const addClassNameToHTML = className => {
	html.classList.add(`${className}`)
}

/* =====================Event Listeners=========================== */

/* Close menu on resize */
window.addEventListener('resize', closeMenuOnResize)
/*------------------------------------------------------------ */

/* Close modal by Esc */
document.addEventListener('keydown', e => {
	handleCloseModalByEsc(e)
	handleCloseMenuByEsc(e)
})

/* -----------------------SignUp Modal------------------------------------ */

const signUpAdmin = async () => {
	const loginValue = document.getElementById('signUp-login').value.trim()
	const emailValue = document.getElementById('signUp-email').value.trim()
	const passwordValue = document.getElementById('signUp-password').value
	const loginMessage = document.querySelector('.signUp__login-message')
	const emailMessage = document.querySelector('.signUp__email-message')
	const passwordMessage = document.querySelector('.signUp__password-message')

	const setErrorToMessage = (selector, message) => {
		selector.textContent = message
		selector.classList.add('error')
	}

	const hideError = selector => {
		selector.textContent = ''
		selector.classList.remove('error')
	}

	if (!validator.isEmail(emailValue)) {
		setErrorToMessage(emailMessage, 'Please enter a valid email address')
		return
	} else {
		hideError(emailMessage)
	}

	if (loginValue.length < 3) {
		setErrorToMessage(loginMessage, 'Name must be at least 3 characters long')
		return
	} else {
		hideError(loginMessage)
	}

	if (!validator.isStrongPassword(passwordValue) || passwordValue.length < 8) {
		setErrorToMessage(passwordMessage, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
		return
	} else {
		hideError(passwordMessage)
	}

	const users = await getDBData('/users')
	if (users.some(user => user.email === emailValue)) {
		setErrorToMessage(emailMessage, 'This email is already joined')
		return
	} else {
		hideError(emailMessage)
	}

	if (users.some(user => user.login === loginValue)) {
		setErrorToMessage(loginMessage, 'This login is already taken')
		return
	} else {
		hideError(loginMessage)
	}

	const newUser = {
		login: loginValue,
		email: emailValue,
		password: passwordValue,
		role: 'admin',
	}

	await pushDBData('/users', newUser)
	signUpModal.classList.add('modal_closed')

	setTimeout(() => {
		signUpModal.close()
		signUpModal.classList.remove('modal_closed')
	}, 3000)
}

/* ----------------------------------------------------------- */

html.addEventListener('click', e => {
	/* Open || Close Modal */
	if (e.target.closest('.header__action_modal')) {
		modal.show()
		addClassNameToHTML('modal-open')
		modal.classList.contains('.modal_closed') && modal.classList.remove('modal_closed')
	} else if (!e.target.closest('.modal__content') && html.classList.contains('modal-open')) {
		modal.close()
		removeClassNameFromHTML('modal-open')
	}

	// Open || Close Menu
	if (e.target.closest('.header__action_burger')) {
		html.classList.toggle('menu-open')
	} else if (html.classList.contains('menu-open') && !e.target.closest('.header__menu')) {
		removeClassNameFromHTML('menu-open')
	}

	/* Open || Close SignUp Modal */
	if (e.target.closest('#register')) {
		signUpModal.showModal()
	}

	if (e.target == signUpModal) {
		signUpModal.close()
	}

	/* Set active genre for catalog page */
	if (e.target.closest('.catalog__link')) localStorage.setItem('genre', e.target.textContent)

	/* Add joined user */
	if (e.target.closest('#join-submit')) {
		addJoinedUser()
	}

	/* Sign up admin */
	if (e.target.closest('#signUp-submit')) {
		e.preventDefault()
		signUpAdmin()
	}
})

if (header) {
	window.addEventListener('scroll', e => {
		header.classList.toggle('header_scrolled', window.scrollY > 50)
	})
}
/* ----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	if (window.location.pathname.includes('admin.html')) {
		checkAuth()
	}

	const wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animate__animated',
		offset: 0,
		mobile: true,
		live: true,
		resetAnimation: true,
	})
	wow.init()
})
