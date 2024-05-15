import { getDBData, pushDBData, setDBData } from './global.js'

const html = document.documentElement
const logoutModal = document.getElementById('logoutModal')
const search = document.querySelector('#searchBook')
const searchResultList = document.querySelector('.search-result__list')
const bookInputs = {
  name: document.getElementById("book-name"),
  author: document.getElementById("author-name"),
  imageUrl: document.getElementById("image-url"),
  description: document.getElementById("description"),
  bookType: document.getElementById("book-type"),
};

searchResultList.addEventListener("click", handleSearchResultClick);

function handleSearchResultClick(e) {
	const clickedListItem = e.target.closest('.search-result__list-item')
	if (!clickedListItem) return

	const { title, author, imageUrl, description, bookType } = clickedListItem.dataset

	bookInputs.name.value = title || 'Unknown Title'
	bookInputs.author.value = author || 'Unknown Author'
	bookInputs.imageUrl.value = imageUrl || 'https://via.placeholder.com/150'
	bookInputs.description.value = description || 'No description available'
	bookInputs.bookType.value = bookType || 'Unknown Category'
}

const handleSearch = (e) => {
  const searchTerm = e.target.value.trim();

  if (searchTerm === "") {
    clearResults();
    searchResultList.parentElement.classList.remove("search-result_show");
    return;
  }
  searchResultList.parentElement.classList.add("search-result_show");
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      const books = data.items.map((item) => {
        if (
          item.volumeInfo.title &&
          item.volumeInfo.authors &&
          item.volumeInfo.authors.length > 0 &&
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.thumbnail &&
          item.volumeInfo.description &&
          item.volumeInfo.categories &&
          item.volumeInfo.categories.length > 0
        ) {
          const title = item.volumeInfo.title;
          const author = item.volumeInfo.authors[0];
          const image = item.volumeInfo.imageLinks.thumbnail;
          const description = item.volumeInfo.description;
          const bookType = item.volumeInfo.categories[0];
          return { title, author, image, description, bookType };
        }
      });

      const filteredBooks = books.filter((book) => book);

      renderResults(filteredBooks);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
};

const renderResults = (results) => {
  clearResults();

  results.forEach((result) => {
    const { title, author } = result;
    const shortenedTitle =
      title.length > 10 ? `${title.slice(0, 10)}...` : title;
    const shortenedAuthor =
      author.length > 10 ? `${author.slice(0, 10)}...` : author;

    searchResultList.innerHTML += `
            <li class="search-result__list-item" 
                data-title="${title}" 
                data-author="${author}" 
                data-image-url="${result.image}" 
                data-description="${result.description}" 
                data-book-type="${result.bookType}">
                <svg class="search-result__icon" width="15.000000" height="17.000000" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="clip257_1849">
                            <rect id="clock" width="15.000000" height="17.000000" fill="white" fill-opacity="0" />
                        </clipPath>
                    </defs>
                    <rect id="clock" width="15.000000" height="17.000000" fill="#FFFFFF" fill-opacity="0" />
                    <g clip-path="url(#clip257_1849)">
                        <path id="Vector" d="M7.5 15.58C4.04 15.58 1.25 12.41 1.25 8.5C1.25 4.58 4.04 1.41 7.5 1.41C10.95 1.41 13.75 4.58 13.75 8.5C13.75 12.41 10.95 15.58 7.5 15.58Z"
                              stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" />
                        <path id="Vector" d="M7.5 4.25L7.5 8.5L10 9.91" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
                    </g>
                </svg>

                <p class="search-result__author">${shortenedAuthor}</p>
                <h3 class="search-result__title">${shortenedTitle}</h3>
            </li>
        `;
  });
};

const clearResults = () => (searchResultList.innerHTML = "");

search.addEventListener("input", handleSearch);

const pushBookInDB = () => {
  const title = bookInputs.name.value.trim();
  const author = bookInputs.author.value.trim();
  const imageUrl = bookInputs.imageUrl.value.trim();
  const description = bookInputs.description.value.trim();
  const bookType = bookInputs.bookType.value.trim();
  const bestsellersInput = document.querySelector("#bestsellers").checked;
  const newBooksInput = document.querySelector("#newBooks").checked;

  if (!title || !author || !imageUrl || !description || !bookType) {
    alert("All fields must be filled out");
    return;
  }
  const bookInfo = {
    title: bookInputs.name.value,
    description: bookInputs.description.value,
    category: bookInputs.bookType.value,
    image: bookInputs.imageUrl.value,
    author: bookInputs.author.value,
    bestsellers: bestsellersInput,
    newBooks: newBooksInput,
  };

  try {
    // Write the book data to the database
    pushDBData("/books", bookInfo);
    console.log("Book data successfully written to the database");
  } catch (error) {
    console.error("Error writing book data to the database:", error);
  }

  bookInputs.name.value = "";
  bookInputs.author.value = "";
  bookInputs.imageUrl.value = "";
  bookInputs.description.value = "";
  bookInputs.bookType.value = "";
};

document.querySelector(".addBookddDatabase").addEventListener("click", (e) => {
  e.preventDefault();
  pushBookInDB();
});

// About Store
const setAboutStoreInfoToDB = () => {
  const aboutStoreTitleInput = document.getElementById("aboutStore");
  const aboutStoreImageInput = document.getElementById("bookImageUrl");
  const aboutStoreDescriptionInput = document.getElementById("descriptionFor");

  const aboutStoreData = {
    title: aboutStoreTitleInput.value.trim(),
    image: aboutStoreImageInput.value.trim(),
    description: aboutStoreDescriptionInput.value.trim(),
  };
  console.log(aboutStoreData);
  const { title, image, description } = aboutStoreData;

  if (!title && !image && !description)
    return alert("All fields are required!");

  setDBData("/aboutStore", aboutStoreData);

  aboutStoreTitleInput.value = "";
  aboutStoreImageInput.value = "";
  aboutStoreDescriptionInput.value = "";
};

document
  .getElementById("addInfoButton")
  .addEventListener("click", setAboutStoreInfoToDB);

// ------------------Join Us----------------------

getDBData("/users").then((data) => {
  const users = Object.values(data);
  const userNumber = document.querySelector("#JoinUsLi");
  const userFullName = document.querySelector("#join-us-fullname");
  const userEmail = document.querySelector("#join-us-email");

  users.forEach((user, index) => {
    const { name, email } = user;

    userNumber.innerHTML += `
		<li class="join-us__list-item">${index + 1}</li>
		`;
    userFullName.innerHTML += `
		<li class="join-us__list-item"><span>${name}</span></li>
		`;
    userEmail.innerHTML += `
		<li class="join-us__list-item"><span>${email}</span></li>
		`;
  });
});

// -------------------Books--------------------------
getDBData("/books").then((data) => {
  const books = Object.values(data);

  const booksNumbers = document.querySelector("#booksNumber");
  const booksTitles = document.querySelector("#booksTitle");
  const booksDesc = document.querySelector("#booksDesc");
  const booksType = document.querySelector("#booksType");
  const booksAuthor = document.querySelector("#booksAuthor");

  books.forEach((book, index) => {
    let title =
      book?.title?.length > 20 ? book.title.slice(0, 20) + "..." : book.title;
    let description =
      book?.description?.length > 30
        ? book.description.slice(0, 30) + "..."
        : book.description;
    booksNumbers.innerHTML += `
            <li class="join-us__list-item join-us__list-item_flex">${
              index + 1
            }</li>
        `;
    booksTitles.innerHTML += `
            <li class="join-us__list-item join-us__list-item_flex">
                <img src="${book?.image}" alt="book images">
                <span>${title}</span>
            </li>
        `;
    booksDesc.innerHTML += `
            <li class="join-us__list-item join-us__list-item_flex"><span>${description}</span></li>
        `;
    booksType.innerHTML += `
            <li class="join-us__list-item join-us__list-item_flex"><span>${book.category}</span></li>
        `;
    booksAuthor.innerHTML += `
            <li class="join-us__list-item join-us__list-item_flex"><span>${book.author}</span></li>
        `;
  });
});
// ---------------------------Contact-----------------------------

getDBData("/contacts").then((data) => {
  const contacts = Object.values(data);
  const contactsNumber = document.querySelector("#contactsNumber");
  const contactsFullName = document.querySelector("#contactsFullName");
  const contactsAddress = document.querySelector("#contactsAddress");
  const contactsEmail = document.querySelector("#contactsEmail");
  const contactsPhoneNumber = document.querySelector("#contactsPhoneNumber");

  contacts.forEach((contact, index) => {
    contactsNumber.innerHTML += `<li class="join-us__list-item">${
      index + 1
    }</li>`;
    contactsFullName.innerHTML += `<li class="join-us__list-item join-us__list-item_flex"><span>${contact.name}</span></li>`;
    contactsAddress.innerHTML += `<li class="join-us__list-item join-us__list-item_flex"><span>${contact.address}</span></li>`;
    contactsEmail.innerHTML += `<li class="join-us__list-item join-us__list-item_flex"><span>${contact.email}</span></li>`;
    contactsPhoneNumber.innerHTML += `<li class="join-us__list-item join-us__list-item_flex"><span>${contact.phone}</span></li>`;
  });
});

// ----------------Logout-Modal--------------------
const confirmLogout = e => {
	switch (e.target.id) {
		case 'logoutBtn':
			logoutModal.showModal()
			html.style.overflow = 'hidden'
			break

		case 'no':
			logoutModal.close()
			html.style.overflow = 'auto'
			break

		case 'yes':
			window.location.href = 'adminLogin.html'
			break
		case 'logoutModal':
			logoutModal.close()
			html.style.overflow = 'auto'
		default:
			break
	}
}

html.addEventListener('click', confirmLogout)

// ------------------------------------

// getDBData('/users').then(data => {
// 	const adminNameSelector = document.getElementById('adminUsername')
// 	const [admin] = Object.values(data).filter(user => user.signedIn)
// 	adminNameSelector.textContent = admin.name
// })


