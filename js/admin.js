import { getDBData, setDBData } from "./global.js";

const search = document.querySelector("#searchBook");
const infos = document.querySelector("#infos");
const btnSearch = document.querySelector("#btn-search");
const bookName = document.querySelector("#book-name");
const author = document.querySelector("#author-name");
const imageUrl = document.querySelector("#image-url");
const description = document.querySelector("#description");
const bookType = document.querySelector("#book-type");
const title = document.querySelector("#aboutStore");
const descriptionForStore = document.querySelector("#descriptionFor");
const imageUrl2 = document.querySelector("#bookImageUrl");
const btnAdd = document.querySelector("#addButton");
const btnAddInfo = document.querySelector("#addInfoButton");

let serachTimer = null;
search.addEventListener("input", (e) => {
  clearTimeout(serachTimer);
  infos.innerHTML = "";
  serachTimer = setTimeout(() => {
    loadInformation(e.target.value);
  }, 100);
});

async function loadInformation(text) {
  let request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${text}`
  );
  let response = await request.json();
  let arr = response.items;
  if (Array.isArray(arr)) {
    infos.classList.remove("changeVisibility");
    arr.forEach((item) => {
      infos.innerHTML += `<button>${item.volumeInfo.title}</button>`;
    });
    chooseBook();
  }
}

function chooseBook() {
  const buttons = document.querySelectorAll("#infos button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      search.value = button.textContent;
      infos.innerHTML = "";
      infos.classList.add("changeVisibility");
    });
  });
}

btnSearch.addEventListener("click", () => {
  const searchValue = search.value;
  if (searchValue.trim().length > 0) {
    fillInfo(searchValue.trim());
  }
});

// fill book form starts
async function fillInfo(text) {
  let request = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${text}`
  );
  let response = await request.json();
  let arr = response.items;

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
    // about store
    title.value = arr[0].volumeInfo.title;
    descriptionForStore.value = arr[0].volumeInfo.description;
    imageUrl2.value = arr[0].volumeInfo.imageLinks.thumbnail;
    // about store

    if (bookName.value.trim().length > 0 && author.value.trim().length > 0) {
      btnAdd.addEventListener("click", () => {
        // burada bazaya gonderirik melumatlari
        bookName.value = "";
        author.value = "";
        imageUrl.value = "";
        description.value = "";
        bookType.value = "";
        btnAdd.disabled = true;
      });
      btnAddInfo.addEventListener("click", () => {
        // burada bazaya gonderirik melumatlari
        title.value = "";
        descriptionForStore.value = "";
        imageUrl2.value = "";
        btnAddInfo.disabled = true;
      });
    }
  }
}
// fill book form ends

// Misal ! Dataya elave etmek.
const books = [];

const setBookInDB = () => {
  const bookInfo = {
    title: bookName.value,
    description: description.value,
    category: bookType.value,
    image: imageUrl.value,
    author: author.value,
  };

  if (
    bookInfo.title.length > 0 &&
    bookInfo.description.length > 0 &&
    bookInfo.category.length > 0 &&
    bookInfo.image.length > 0 &&
    bookInfo.author.length > 0
  ) {
    books.push(bookInfo);
  }

  setDBData("/books", books);

  bookName.value = "";
  author.value = "";
  imageUrl.value = "";
  description.value = "";
  bookType.value = "";
};

document.querySelector(".addBookddDatabase").addEventListener("click", (e) => {
  e.preventDefault();
  setBookInDB();
});

// const setBookInfo = () => {
//   if (window.location.href === "admin.html") {
//     const listNumber = document.querySelector(".admin-list__number");
//     const listTitle = document.querySelector(".admin-list__title");
//     const listDesc = document.querySelector(".admin-list__description");
//     const listCategory = document.querySelector(".admin-list__category");
//     const listAuthor = document.querySelector(".admin-list__author");

//     // Data elde etmek:
//     getDBData("/books").then((snapshot) => {
//       const data = snapshot.val();
//       // data = firebasedeki books.

//       const arr = Object.values(data);

//       listNumber.innerHTML = "";
//       listTitle.innerHTML = "";
//       listDesc.innerHTML = "";
//       listCategory.innerHTML = "";
//       listAuthor.innerHTML = "";

//       arr.forEach((book) => {
//         listNumber.innerHTML += `<li>${arr.length}</li>`;
//         listTitle.innerHTML += `
//                     <li class="books__box">
//                         <img class='books__image' src="${book.image}" alt="book name" width='27' height='36'>
//                         <span class='books__name'>${book.title}</span>
//                     </li>`;
//         listDesc.innerHTML += `<li>${book.description}</li>`;
//         listCategory.innerHTML += `<li>${book.category}</li>`;
//         listAuthor.innerHTML += `<li>${book.author}</li>`;
//       });
//     });
//   }
// };

// setBookInfo();

// About Store
const setAboutStoreToDB = () => {
  const aboutStoreTitleInput = document.getElementById("aboutStore");
  const aboutStoreImageInput = document.getElementById("bookImageUrl");
  const aboutStoreDescriptionInput = document.getElementById("descriptionFor");

  const aboutStoreData = {
    title: aboutStoreTitleInput.value,
    image: aboutStoreImageInput.value,
    description: aboutStoreDescriptionInput.value,
  };

  setDBData("/aboutStore", aboutStoreData);
};

document
  .querySelector(".about-store__button")
  .addEventListener("click", setAboutStoreToDB);

// ------------------Join Us----------------------

getDBData("/users").then((data) => {
  const users = data.val();
  const userNumber = document.querySelector("#JoinUsLi");
  const userFullName = document.querySelector("#join-us-fullname");
  const userEmail = document.querySelector("#join-us-email");
  if (users.length) {
    users.forEach((user, index) => {
      userNumber.innerHTML += `
		<li class="join-us__list-item">${index + 1}</li>
		`;
      userFullName.innerHTML += `
		<li class="join-us__list-item">${user.name}</li>
		`;
      userEmail.innerHTML += `
		<li class="join-us__list-item">${user.email}</li>
		`;
    });
  }
});

// -------------------Books--------------------------
getDBData("/books").then((data) => {
  const books = data.val();
  //   console.log(books);
  const booksNumbers = document.querySelector("#booksNumber");
  const booksTitles = document.querySelector("#booksTitle");
  const booksDesc = document.querySelector("#booksDesc");
  const booksType = document.querySelector("#booksType");
  const booksAuthor = document.querySelector("#booksAuthor");

  books.forEach((book, index) => {
    booksNumbers.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">${index + 1}</li>
	`;
    booksTitles.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">
	<img src="${book.image}" alt="book images ">
	${book.title}
	</li>
	`;
    booksDesc.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">${book.description}</li>
	`;
    booksType.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">${book.category}</li>
	`;
    booksAuthor.innerHTML += `
	<li class="join-us__list-item join-us__list-item_flex">${book.author}</li>
	`;
  });
});
// ---------------------------Contact-----------------------------

getDBData("/contacs").then((data) => {
  const contacts = data.val();
  console.log(contacts);
});
