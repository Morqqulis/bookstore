import { getDBData } from './global.js'

getDBData('/admins').then(snapshot => {
	const data = snapshot.val()
	console.log(data)
})
