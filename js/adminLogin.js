import { getDBData } from './global.js'

const checkAdminCredentials = e => {
	e.preventDefault()

	const usernameInput = document.getElementById('login__username')
	const passwordInput = document.getElementById('login__password')

	const username = usernameInput.value.trim()
	const pass = passwordInput.value.trim()

	getDBData('/admins').then(snapshot => {
		const data = snapshot.val()
		const { login, password } = data

		if (username === login && pass === password) {
			window.location.href = './admin.html'
		} else {
			alert('Wrong username or password')
		}
	})
}

document.querySelector('.welcome__login').addEventListener('submit', checkAdminCredentials)
