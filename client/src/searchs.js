document.addEventListener("DOMContentLoaded", function() {
    const resultsContainer = document.getElementById('search-results');
    if (!(localStorage.getItem('searchResults'))) {
        resultsContainer.innerHTML = `
        <div class="search-fail-box">Please provide search criteria.</div>`;
        return;
    }
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    console.log('Loaded from localStorage:', searchResults);  // 調試日誌


    if (searchResults.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-fail-box">No matching results found.</div>`;
        return;
    }

    function updateGridLayout(numberOfItems) {
        const rows = Math.ceil(numberOfItems / 3);
        resultsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        resultsContainer.style.gridTemplateRows = `repeat(${rows}, auto)`;
    }

    searchResults.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'search-box';

        bookElement.innerHTML = `
        <div id="pdf-cover-${book.id}" class="pdf-cover" onclick="viewBook(${book.id})"></div>
        <div style="font-size: 15px; font-weight: 500;">${book.name}</div>`
        + book.authors.map(author => `<span class="search-author-box">${author}</span>`).join(" ")
        + book.tags.map(tag => `<span class="search-theme-box">${tag}</span>`).join(" ")
        + `<span class="search-language-box">${book.language}</span>`;
    
        resultsContainer.appendChild(bookElement);

        const loadingTask = pdfjsLib.getDocument(book.url);
        loadingTask.promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const scale = 0.3;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (canvas.width > 180) {
                    canvas.width = 180;
                }
                if (canvas.height > 240) {
                    canvas.height = 240;
                }

                page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                    document.getElementById(`pdf-cover-${book.id}`).appendChild(canvas);
                });
            });
        }).catch(error => {
            console.error('Error loading PDF:', error);
        });
    });
    updateGridLayout(searchResults.length);
});

function viewBook(bookId) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book)); //debug
        localStorage.setItem('bookId', bookId);  // 將 bookId 存儲到 localStorage
        console.log('Book details stored in localStorage:', book);  // 調試日誌
        window.location.href = 'explore_book.html';
    }
}
