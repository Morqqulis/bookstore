'use strict'
/* Modals */
const html = document.documentElement

html.addEventListener('click', e => {
	const modalTrigger = e.target.closest('.header__action')
	const modal = document.getElementById('modal')

	if (e.target == modalTrigger) {
		modal.show()
		html.classList.add('modal-open')
	} else if (!e.target.closest('.modal__content') && html.classList.contains('modal-open')) {
		modal.close()
		html.classList.remove('modal-open')
	}
})

const handleCloseModalByEsc = e => {
	if (e.key === 'Escape') {
		const modal = document.getElementById('modal')
		modal.close()
		html.classList.remove('modal-open')
	}
}

document.addEventListener('keydown', handleCloseModalByEsc)
/* ===================================================================== */
