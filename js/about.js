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
const getData = () => {
	let about = []

	get(ref(db, 'aboutStore/'))
		.then(snapshot => {
			if (snapshot.exists()) {
                about.push(snapshot.val())
                                document.getElementById('title').innerText = about[0].title;
                                document.getElementById('description').innerText = about[0].description;
                                document.getElementById("main-image").src = about[0].image
				console.log(about)
				// about.push(snapshot.val())
                //                 document.getElementById('description').innerText = about[0].description;
				// console.log(about)
			} else {
				console.log('No data available')
			}
		})
		.catch(error => {
			console.error(error)
		})
}
getData()