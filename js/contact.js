import { setDBData } from './global.js'
const contactsData = []

const setContactsData = () => {
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

	contactsData.push(userContactData)

	setDBData('/contacts', contactsData)

	nameInput.value = ''
	emailInput.value = ''
	addressInput.value = ''
	phoneInput.value = ''
	noteInput.value = ''
}

document.querySelector('.sendButton').addEventListener('click', setContactsData)
