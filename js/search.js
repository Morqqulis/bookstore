
// async function searchBooks() {
//     const searchInput = document.getElementById("searchBook").value;
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
//     const data = await response.json();
//     if (data.items && data.items.length > 0) {
//         const book = data.items[0].volumeInfo;
//         const bookCover = document.getElementById("bookCover");
//         bookCover.src = book.imageLinks ? book.imageLinks.thumbnail : "";
//         const bookDetails = document.getElementById("bookInfo");
//         bookDetails.innerHTML = `
//             <div id="bookDetails">
//                 <h2>${book.title}</h2>
//                 <p><strong>Author:</strong> ${book.authors ? book.authors.join(", ") : "Unknown"}</p>
//                 <p><strong>Description:</strong> ${book.description ? book.description : "No description available"}</p>
//             </div>
//         `;
//         // Показываем столбец с результатами поиска
//         document.getElementById("searchContent").style.display = 'block';
//     } else {
//         const bookInfo = document.getElementById("bookInfo");
//         bookInfo.innerHTML = "No books found.";
//         document.getElementById("searchContent").style.display = 'block';
//     }
// }

// const searchBookBtn = document.getElementById('searchBookBtn');
// searchBookBtn.addEventListener('click', searchBooks);
let currentIndex = 0; // Текущий индекс книги
let searchResults = []; // Массив найденных книг

async function searchBooks() {
    const searchInput = document.getElementById("searchBook").value;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        searchResults = data.items.map(item => item.volumeInfo); // Сохраняем все найденные книги
        displayBook(currentIndex); // Отображаем книгу с текущим индексом
        document.getElementById("searchContent").style.display = 'block';
    } else {
        const bookInfo = document.getElementById("bookInfo");
        bookInfo.innerHTML = "No books found.";
        document.getElementById("searchContent").style.display = 'block';
    }
}

function displayBook(index) {
    const book = searchResults[index];
    const bookCover = document.getElementById("bookCover");
    bookCover.src = book.imageLinks ? book.imageLinks.thumbnail : "";
    const bookDetails = document.getElementById("bookInfo");
    bookDetails.innerHTML = `
        <div id="bookDetails">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.authors ? book.authors.join(", ") : "Unknown"}</p>
            <p><strong>Description:</strong> ${book.description ? book.description : "No description available"}</p>
        </div>
    `;
}

// Обработчики событий для кнопок "Вперёд" и "Назад"
document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % searchResults.length;
    displayBook(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + searchResults.length) % searchResults.length;
    displayBook(currentIndex);
});

const searchBookBtn = document.getElementById('searchBookBtn');
searchBookBtn.addEventListener('click', searchBooks);
