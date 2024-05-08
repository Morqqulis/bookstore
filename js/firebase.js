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

/* TEST FIREBASE */

const createUserObject = () => {
	const usernameInput = document.getElementById('username')
	const emailInput = document.getElementById('user-email')

	const username = usernameInput.value.trim()
	const email = emailInput.value.trim()

	if (!username || !email) {
		console.error('Username or email cannot be empty.')
		return null
	}

	return {
		username,
		email,
		role: 'user',
	}
}

document.querySelector('.modal__button').addEventListener('click', e => {
	e.preventDefault()

	const user = createUserObject()
	if (!user) return

	set(ref(db, 'users/'), user)
		.then(() => {
			console.log('User data written successfully!')
			usernameInput.value = ''
			emailInput.value = ''
		})
		.catch(error => {
			console.error('Error writing data:', error)
		})
})

const getData = () => {
	let users = []

	get(ref(db, 'users/'))
		.then(snapshot => {
			if (snapshot.exists()) {
				users.push(snapshot.val())
				console.log(users)
			} else {
				console.log('No data available')
			}
		})
		.catch(error => {
			console.error(error)
		})
}
// getData()
