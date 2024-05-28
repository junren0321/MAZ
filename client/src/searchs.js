document.addEventListener("DOMContentLoaded", function() {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    console.log('Loaded from localStorage:', searchResults);  // 調試日誌
    const resultsContainer = document.getElementById('search-results');

    if (searchResults.length === 0) {
        resultsContainer.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    searchResults.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-result';
        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title} cover" onclick="viewBook(${book.id})">
            <h2>${book.title}</h2>
            <p>Author: ${Array.isArray(book.author) ? book.author.join(', ') : book.author || 'Unknown'}</p>
            <p>Language: ${book.language}</p>
            <p>Theme: ${Array.isArray(book.theme) ? book.theme.slice(0, 3).join(', ') : book.theme || 'Unknown'}</p>
        `;
        resultsContainer.appendChild(bookElement);
    });
});

function viewBook(bookId) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        localStorage.setItem('bookId', bookId);  // 將 bookId 存儲到 localStorage
        console.log('Book details stored in localStorage:', book);  // 調試日誌
        window.location.href = 'explore_book.html';
    }
}
