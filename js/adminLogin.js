import { getDBData } from './global.js'

const checkAdminCredentials = e => {
	e.preventDefault()
	const usernameInput = document.getElementById('login__username')
	const passwordInput = document.getElementById('login__password')

	const usernameValue = usernameInput.value.trim()
	const userPasswordValue = passwordInput.value.trim()
	let credentialsMatched = false

	getDBData('/users').then(data => {
		const admins = Object.values(data).filter(admin => admin.role === 'admin')

		admins.forEach(admin => {
			const { name, password } = admin
			if (usernameValue === name && userPasswordValue === password) {
				sessionStorage.setItem('adminAuthenticated', 'true')
				sessionStorage.setItem('adminName', name)
				window.location.href = 'admin.html'
				credentialsMatched = true
				return
			}
		})

		if (!credentialsMatched) {
			alert('Wrong credentials')
		}
	})
}

document.querySelector('.welcome__login').addEventListener('submit', checkAdminCredentials)
