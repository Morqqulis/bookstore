import { getDBData } from './global.js'

const checkAdminCredentials = () => {
	const usernameInput = document.getElementById('login__username')
	const passwordInput = document.getElementById('login__password')

	const username = usernameInput.value.trim()
	const userPassword = passwordInput.value.trim()

	getDBData('/users').then(data => {
		const admins = Object.values(data).filter(admin => admin.role === 'admin')

		admins.forEach(admin => {
			console.log(admin)
			if (username === admin.username && userPassword === admin.password) {
				sessionStorage.setItem('adminAuthenticated', true)
			}
		})
	})
}

document.querySelector('#admin-join').addEventListener('click', e => {
	e.preventDefault()
	checkAdminCredentials()
	window.location.href = 'admin.html'
})
