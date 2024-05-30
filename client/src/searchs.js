document.addEventListener("DOMContentLoaded", function() {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    console.log('Loaded from localStorage:', searchResults);  // 調試日誌
    const resultsContainer = document.getElementById('search-results');

    if (searchResults.length === 0) {
        resultsContainer.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    searchResults.forEach(book => {
        const bookContainer = document.createElement('div');
        bookContainer.className = 'book-container';
        bookContainer.onclick = function() {
            viewBook(book.id);
        };

        const coverDiv = document.createElement('div');
        coverDiv.id = `pdf-cover-${book.id}`;
        coverDiv.className = 'pdf-cover';

        // 使用 PDF.js 加載 PDF 並提取封面
        const loadingTask = pdfjsLib.getDocument(book.url);
        loadingTask.promise.then(pdf => {
            pdf.getPage(1).then(page => {
                // 获取初始视口
                const viewport = page.getViewport({ scale: 1 });
                
                // 设置固定的宽度和高度
                const fixedWidth = 100; // 固定宽度
                const fixedHeight = 150; // 固定高度

                // 创建 Canvas 元素
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                // 设置 Canvas 尺寸为视口大小
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // 渲染页面到 Canvas
                page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                    // 将 Canvas 添加到页面中
                    document.getElementById(`pdf-cover-${book.id}`).appendChild(canvas);
                });
            });
        }).catch(error => {
            console.error('Error loading PDF:', error);
        });

        const bookInfoDiv = document.createElement('div');
        bookInfoDiv.className = 'book-info';
        const titleP = document.createElement('p');
        titleP.innerHTML = `<strong>Title:</strong> <span>${book.name}</span>`;
        const authorsP = document.createElement('p');
        authorsP.innerHTML = `<strong>Author:</strong> <span>${book.authors.join(', ')}</span>`;
        const languageP = document.createElement('p');
        languageP.innerHTML = `<strong>Language:</strong> <span>${book.language}</span>`;
        const tagsP = document.createElement('p');
        tagsP.innerHTML = `<strong>Tags:</strong> <span>${book.tags.join(', ')}</span>`;
        bookInfoDiv.appendChild(titleP);
        bookInfoDiv.appendChild(authorsP);
        bookInfoDiv.appendChild(languageP);
        bookInfoDiv.appendChild(tagsP);

        bookContainer.appendChild(coverDiv);
        bookContainer.appendChild(bookInfoDiv);

        resultsContainer.appendChild(bookContainer);
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
