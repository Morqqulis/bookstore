
async function searchBooks() {
    const searchInput = document.getElementById("searchBook").value;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
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
        // Показываем столбец с результатами поиска
        document.getElementById("searchContent").style.display = 'block';
    } else {
        const bookInfo = document.getElementById("bookInfo");
        bookInfo.innerHTML = "No books found.";
        document.getElementById("searchContent").style.display = 'block';
    }
}

const searchBookBtn = document.getElementById('searchBookBtn');
searchBookBtn.addEventListener('click', searchBooks);