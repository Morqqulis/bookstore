// import { getDBData, setDBData } from './global.js'

const search = document.querySelector("#searchBook");
const infos = document.querySelector("#infos");
const bookName = document.querySelector("#book-name");
const author = document.querySelector("#author-name");
const imageUrl = document.querySelector("#image-url");
const description = document.querySelector("#description");
const bookType = document.querySelector("#book-type");
const title = document.querySelector("#aboutStore");
const descriptionForStore = document.querySelector("#descriptionFor");
const imageUrl2 = document.querySelector("#bookImageUrl");
const btnAdd = document.querySelector("#addButton");

let serachTimer = null;
search.addEventListener("input", (e) => {
	clearTimeout(serachTimer);
	infos.innerHTML = "";
	window.addEventListener("keydown", (e) => {
		if (e.key == "Enter") {
			fillInfo(search.value);
			infos.classList.add("changeVisibility");
		}
	})
	serachTimer = setTimeout(() => {
		loadInformation(e.target.value);
	}, 50);
});

async function loadInformation(text) {
	let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
	let response = await request.json();
	let arr = response.items;
	if (Array.isArray(arr)) {
		infos.classList.remove("changeVisibility");
		arr.forEach((item) => {
			infos.innerHTML += `<button>${item.volumeInfo.title}</button>`;
		});
		chooseBook();
	} else {
		infos.classList.add("changeVisibility");
	}
}

function chooseBook() {
	const buttons = document.querySelectorAll("#infos button");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			search.value = button.textContent;
			fillInfo(button.textContent.trim());
			infos.classList.add("changeVisibility");
		})
	})
}

// fill book form starts
async function fillInfo(text) {
	let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
	let response = await request.json();
	let arr = response.items;
	console.log(arr)
	if (Array.isArray(arr)) {
		bookName.value = arr[0].volumeInfo.title;
		for (let i = 0; i < arr[0].volumeInfo.authors.length; i++) {
			author.value = arr[0].volumeInfo.authors[i] + " ";
		}
		imageUrl.value = arr[0].volumeInfo.imageLinks.thumbnail;
		description.value = arr[0].volumeInfo.description;

		for (let i = 0; i < arr[0].volumeInfo.categories.length; i++) {
			bookType.value = arr[0].volumeInfo.categories[i] + " ";
		}

		if (bookName.value.trim().length > 0 && author.value.trim().length > 0) {
			btnAdd.addEventListener("click", () => {
				// burada bazaya gonderirik melumatlari
				bookName.value = "";
				author.value = "";
				imageUrl.value = "";
				description.value = "";
				bookType.value = "";
				btnAdd.disabled = true;
			})
		}
	}
}
// fill book form ends
