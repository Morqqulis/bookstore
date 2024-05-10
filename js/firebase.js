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

const addJoinedUser = () => {
	const nameValue = document.getElementById('join-name').value
	const emailValue = document.getElementById('join-email').value
    const submitBtn = document.querySelector('.modal__button')
    
	if (nameValue === '' || emailValue === '') return



	setDBData('/users', {
		name: nameValue,
		email: emailValue,
		id: Date.now(),
		role: 'user',
	})
}

document.querySelector('.modal__button').addEventListener('click', e => {
	// e.preventDefault()
	addJoinedUser()

	getDBData('/users')
})

export const setDBData = (path, data) => set(ref(db, path), data)

export const getDBData = path => get(ref(db, path)).then(snapshot => console.log(snapshot.val()))
