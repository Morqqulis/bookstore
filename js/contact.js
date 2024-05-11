import { setDBData } from "./global.js";
const contactsData = []

const setContactsData = () => {
    const name = document.querySelector('.fullName').value 
    const email = document.querySelector('.email').value 
    const address = document.querySelector('.adress').value
    const phone = document.querySelector('.phone').value
    const note = document.querySelector('.note').value

    if (!name && !email && !address && !phone && !note ) return

    const userContactData = {
        name,
        email,
        address,
        phone,
        note
    }
    
    contactsData.push(userContactData)

    setDBData('/contacts', contactsData)
}

document.querySelector('.sendButton').addEventListener('click', setContactsData)
