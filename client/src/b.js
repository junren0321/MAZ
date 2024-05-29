document.addEventListener('DOMContentLoaded', (event) => {
    const bookId = localStorage.getItem('bookId');
    console.log('Loaded bookId from localStorage:', bookId);  // 调试日志
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id == bookId);

    if (book) {
        console.log('Book found with bookId:', book);  // 调试日志
        const bookCover = document.getElementById('book-cover');
        const bookName = document.getElementById('book-title');
        const bookAuthors = document.getElementById('book-authors');
        const bookLanguage = document.getElementById('book-language');
        const bookTags = document.getElementById('book-tags');
        const bookPublisher = document.getElementById('book-publisher');
        const bookPublishDate = document.getElementById('book-publish-date');
        const bookTranslator = document.getElementById('book-translator');
        const bookISBN = document.getElementById('book-isbn');
        const bookPageCount = document.getElementById('book-count');
        const bookDescription = document.getElementById('book-description');

        bookCover.src = book.cover;
        bookName.textContent = book.name;
        bookAuthors.textContent = book.authors.join(', ');
        bookLanguage.textContent = book.language;
        bookTags.textContent = book.tags.join(', ');
        bookPublisher.textContent = book.publisher;
        // format the date
        const publishDate = new Date(book.publishDate);
        const formattedPublishDate = `${publishDate.getFullYear()}/${publishDate.getMonth() + 1}/${publishDate.getDate()}`;
        bookPublishDate.textContent = formattedPublishDate;

        bookTranslator.textContent = book.translatedBy;
        bookISBN.textContent = book.isbn;
        bookPageCount.textContent = book.pageCount;
        bookDescription.textContent = book.remark;

        // 点击封面图片设置 PDF URL 并跳转到 view.html
        bookCover.addEventListener('click', () => {
            localStorage.setItem('pdfUrl', book.url);
            console.log('PDF URL set in localStorage:', book.url);  // 调试日志
            window.location.href = 'view.html';
        });
    } else {
        console.error('No book found with the given ID in localStorage');
    }
});
