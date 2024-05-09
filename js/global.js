'use strict'
/* Swup Animation */
import Swup from 'https://unpkg.com/swup@4?module'

const swup = new Swup({
	animateOnLoad: true,
	plugins: [
		new SwupHeadPlugin({
			persistAssets: true,
		}),
	],
})
swup.transitions = {
	default: {
		animateOnLoad: true,
	},
}

/* ======================================================================== */

/* Modal */
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
/* Active navigation */

const navLinks = document.querySelectorAll('.header__menu-link')

navLinks.forEach(link => {
	link.addEventListener('click', e => {
		navLinks.forEach(link => link.classList.remove('header__menu-link_active'))
		e.target.classList.add('header__menu-link_active')
	})
})

/* ===================================================================== */
