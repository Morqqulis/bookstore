import { setDBData } from './global.js'
const contactsData = []
const setContactsData = () => {
	const fullnameInput = document.querySelector('.fullName').value
	const emailInput = document.querySelector('.email').value
	const addressInput = document.querySelector('.adress').value
	const phoneInput = document.querySelector('.phone').value
	const textarea = document.querySelector('.note').value

	if (!fullnameInput && !emailInput && !addressInput && !phoneInput && !note) return

	const userContactData = {
		name: fullnameInput,
		email: emailInput,
		address: addressInput,
		phone: phoneInput,
		note: textarea,
	}

	contactsData.push(userContactData)
    
	setDBData('/contacts', contactsData)
}

document.querySelector('.sendButton').addEventListener('click', setContactsData)
