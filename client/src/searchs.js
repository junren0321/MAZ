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

        // 確保 book.authors 是一個數組並處理未定義的情況
        const bookAuthors = Array.isArray(book.author) ? book.author.join(', ') : 'Unknown Author';
        const bookTags = Array.isArray(book.tags) ? book.tags.slice(0, 3).join(', ') : 'No Tags';

        bookElement.innerHTML = `
            <div id="pdf-cover-${book.id}" class="pdf-cover" onclick="viewBook(${book.id})"></div>
            <p>Title: ${book.name}</p>
            <p>Author: ${book.authors}</p>
            <p>Language: ${book.language}</p>
            <p>Tags: ${bookTags}</p>
        `;
        resultsContainer.appendChild(bookElement);

        // 使用 PDF.js 加載 PDF 並提取封面
        const loadingTask = pdfjsLib.getDocument(book.url);
        loadingTask.promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                    document.getElementById(`pdf-cover-${book.id}`).appendChild(canvas);
                });
            });
        }).catch(error => {
            console.error('Error loading PDF:', error);
        });
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 2216c6e (huge updates)
