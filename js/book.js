'use strict'

import { getBooks } from './global.js'

/* ================================================ */
// getBooks('', localStorage.getItem('bookId')).then(data => {
// 	console.log(data.items[0].volumeInfo)
// })

const bookDate = document.querySelector('.bookDate')
const bookName = document.querySelector('.bookName')
// const bookAddDate = document.querySelector('.bookAddDate');
const bookAuthor = document.querySelector('.bookAuthor')
const bookAbout = document.querySelector('.bookAbout')
const bookImage = document.querySelector('.bookImage')
const bookCategory = document.querySelector('.bookCategory')

getBooks('', localStorage.getItem('bookId'))
	.then(data => {
		const book = data.items[0].volumeInfo
		console.log(book)

		if (data) {
			if (book.publishedDate) {
				bookDate.textContent = book.publishedDate
			}
			if (book.title) {
				bookName.textContent = book.title
			}
			if (book.authors && book.authors.length > 0) {
				bookAuthor.textContent = book.authors.join(', ')
			}
			if (book.description) {
				bookAbout.textContent = book.description
			}
			if (book.imageLinks && book.imageLinks.thumbnail) {
				bookImage.src = book.imageLinks.thumbnail
			} else {
				console.log('Book image not found.')
			}
			if (book.categories && book.categories.length > 0) {
				bookCategory.textContent = `Categories: ${book.categories.join(', ')}`
			}
		}
	})
	.catch(error => {
		console.log(error.message)
	})

const commentInput = document.querySelector('.commentInput')
const commentButton = document.querySelector('.commentButton')
const commentsContainer = document.querySelector('.commentsContainer')

const commentsKey = 'savedComments'

window.addEventListener('DOMContentLoaded', () => {
	const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || []
	savedComments.forEach(comment => {
		addCommentToDOM(comment)
	})
})

commentButton.addEventListener('click', function (event) {
	event.preventDefault()
	const text = commentInput.value.trim()
	if (text !== '') {
		const userName = 'Anonim'
		const currentDate = new Date().toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			weekday: 'long',
		})

		const newComment = { id: generateId(), userName, date: currentDate, text }
		addCommentToDOM(newComment)

		const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || []
		savedComments.unshift(newComment)
		localStorage.setItem(commentsKey, JSON.stringify(savedComments))

		commentInput.value = ''
	}
})

function addCommentToDOM(comment) {
	const newDiv = document.createElement('div')
	const userNameDate = document.createElement('span')
	const commentText = document.createElement('p')
	const deleteButton = document.createElement('button')

	userNameDate.innerHTML = `<b>${comment.userName}</b> ${comment.date}`

	commentText.textContent = comment.text

	// -Function delete  comment-
	// deleteButton.textContent = 'Delete';
	// deleteButton.addEventListener('click', () => {
	//     deleteComment(comment.id);
	//     newDiv.remove();
	// });

	newDiv.appendChild(userNameDate)
	newDiv.appendChild(commentText)
	newDiv.appendChild(deleteButton)

	commentsContainer.insertBefore(newDiv, commentsContainer.firstChild)
}

// -Function delete  comment-
// function deleteComment(commentId) {
//     const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
//     const updatedComments = savedComments.filter(comment => comment.id !== commentId);
//     localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
// }

function generateId() {
	return Math.random().toString()
}
