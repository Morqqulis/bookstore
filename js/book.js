'use strict'

import { getBooks } from './global.js'

/* ================================================ */
getBooks('', localStorage.getItem('bookId')).then(data => {
	console.log(data.items[0].volumeInfo)
})
