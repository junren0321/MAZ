document.addEventListener("DOMContentLoaded", function() {
    const bookId = localStorage.getItem('bookId');
    console.log('Loaded bookId from localStorage:', bookId);  // 调试日志
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id == bookId);
    
    if (book) {
        console.log('Book found with bookId:', book);  // 调试日志
        
        /* left-info-container */
        const resultsContainer = document.getElementById('info-results');
        const bookElement = document.createElement('div');
        bookElement.className = 'info-box';
        bookElement.innerHTML = 
        `<div style="font-size: 20px; font-weight: 600; text-align: center;">${book.name}</div>` +
        `<div style="text-align: center; margin: 10px 0;" id="pdf-cover-${book.id}" onclick="viewerBook(${book.id})"></div>` +
        `<p><strong>Author:</strong> ${book.authors.map(author => `<span class="info-author-box">${author}</span>`).join(" ")}</p>` +
        `<p><strong>Theme:</strong> ${book.tags.map(tag => `<span class="info-theme-box">${tag}</span>`).join(" ")}</p>` +
        `<p><strong>Language:</strong><span class="info-language-box">${book.language}</span></p>` +
        `<p><strong>Translator:</strong><span class="info-other-box">${book.translatedBy}</span></p>` +
        `<p><strong>Publisher:</strong><span class="info-other-box">${book.publisher}</span></p>` +
        `<p><strong>Publisher Date:</strong><span class="info-other-box">${book.publishDate.split('T')[0]}</span></p>` +
        `<p><strong>ISBN:</strong><span class="info-other-box">${book.isbn}</span></p>` +
        `<p><strong>Page Count:</strong><span class="info-other-box">${book.pageCount}</span></p>` +
        `<br><a class="debug-link" onclick="viewerBook(${book.id})">View This PicBook</a>`;


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

                if (canvas.width > 230) {
                    canvas.width = 230;
                }
                if (canvas.height > 280) {
                    canvas.height = 280;
                }

                page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                    document.getElementById(`pdf-cover-${book.id}`).appendChild(canvas);
                });
            });
        }).catch(error => {
            console.error('Error loading PDF:', error);
        });

        /* right-info-container */
        const results2Container = document.getElementById('info-results-2');
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'info-box';
        descriptionElement.style = 'width: 480px;';
        descriptionElement.innerHTML = 
        `<div style="font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 10px;">Description</div>`
        + `<div style="width: 100%; white-space: pre-line; text-align: justify;">${book.description}</div>`;

        results2Container.appendChild(descriptionElement);
    } else {
    console.error('No book found with the given ID in localStorage');
    }
});

function viewerBook(bookId) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('pdfUrl', book.url);
        console.log('PDF URL set in localStorage:', book.url);
        window.location.href = './pdfjs/web/viewer.html';
    }
}