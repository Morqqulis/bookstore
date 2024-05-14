import { pushDBData } from './global.js'

const pushContactDataToDB = async () => {
	const nameInput = document.querySelector('.fullName')
	const emailInput = document.querySelector('.email')
	const addressInput = document.querySelector('.adress')
	const phoneInput = document.querySelector('.phone')
	const noteInput = document.getElementById('contact-note')

	const name = nameInput.value
	const email = emailInput.value
	const address = addressInput.value
	const phone = phoneInput.value
	const note = noteInput.value

	if (!name || !email || !address || !phone || !note) {
		alert('All fields are required')
		return
	}

	if (!validator.isEmail(email)) {
		alert('Please enter a valid email address')
		return
	}

	if (!validator.isMobilePhone(phone, 'any')) {
		alert('Please enter a valid phone number')
		return
	}

	const userContactData = {
		name,
		email,
		address,
		phone,
		note,
	}

	try {
		pushDBData('/contacts', userContactData)
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
	await pushContactDataToDB()
})
