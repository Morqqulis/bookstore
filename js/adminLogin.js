import { getDBData } from './global.js'

const checkAdminCredentials = async () => {
	const usernameInput = document.getElementById('login__username')
	const passwordInput = document.getElementById('login__password')

	const username = usernameInput.value.trim()
	const userPassword = passwordInput.value.trim()

	await getDBData('/admins').then(data => {
		const { login, password } = data

		if (username === login && userPassword === password) {
			sessionStorage.setItem('adminAuthenticated', 'true')
			window.location.href = 'admin.html'
		} else {
			alert('Wrong username or password')
		}
	})
}

document.querySelector('#admin-join').addEventListener('click', async e => {
	e.preventDefault()
	await checkAdminCredentials()
})
