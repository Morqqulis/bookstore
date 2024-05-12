import { getDBData } from './global.js'

const checkAdminCredentials = () => {
	const usernameInput = document.getElementById('login__username')
	const passwordInput = document.getElementById('login__password')

	const username = usernameInput.value.trim()
	const userPassword = passwordInput.value.trim()

	getDBData('/admins').then(snapshot => {
		const { login, password } = snapshot.val()

		if (username === login && userPassword === password) {
			window.location.href = './admin.html'
		} else {
			alert('Wrong username or password')
		}
	})
}

document.querySelector('#join-submit').addEventListener('submit', e => {
	e.preventDefault()
	checkAdminCredentials()
})
