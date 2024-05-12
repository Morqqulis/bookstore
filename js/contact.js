import { getDBData, pushDBData, setDBData,  } from './global.js'
const contactsData = []

const setContactsData = async () => {
	const nameInput = document.querySelector('.fullName')
	const emailInput = document.querySelector('.email')
	const addressInput = document.querySelector('.adress')
	const phoneInput = document.querySelector('.phone')
	const noteInput = document.querySelector('.note')

	const name = nameInput.value
	const email = emailInput.value
	const address = addressInput.value
	const phone = phoneInput.value
	const note = noteInput.value

	if (!name && !email && !address && !phone && !note) return

	const userContactData = {
		name,
		email,
		address,
		phone,
		note,
	}

	try {
		await pushDBData('/contacts', userContactData)
	} catch (error) {
		console.error('Error writing contact data to the database:', error)
	}

	nameInput.value = ''
	emailInput.value = ''
	addressInput.value = ''
	phoneInput.value = ''
	noteInput.value = ''
}

document.querySelector('.sendButton').addEventListener('click', async e => {
	e.preventDefault()
	await setContactsData()
})

getDBData('/contacts').then(data => {
	console.log(data)
})
