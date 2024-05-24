document.addEventListener('DOMContentLoaded', function() {
    fetchBooks();
});

function fetchBooks() {
    fetch('/api/books')  // Adjust the URL based on your actual API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(books => {
            displayBooks(books);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayBooks(books) {
    const gallery = document.getElementById('book-gallery');
    gallery.innerHTML = '';  // Clear the gallery first

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <h3>${book.name}</h3>
            <p>Authors: ${book.authors.join(', ')}</p>
            <p>Language: ${book.language}</p>
            <p>Tags: ${book.tags.join(', ')}</p>
            <p>Publisher: ${book.publisher}</p>
            <p>Publish Date: ${book.publishDate}</p>
            <p>ISBN: ${book.isbn}</p>
            <p>Page Count: ${book.pageCount}</p>
            <p><a href="${book.url}">Download PDF</a></p>
        `;
        gallery.appendChild(bookElement);
    });
}
