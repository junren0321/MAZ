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
        const viewButton = document.getElementById('view-book');

        const formattedDate = book.publishDate.split('T')[0];
        console.log(book.url);
        // bookCover.src = book.url;
        // console.log(bookCover); 
        bookName.textContent = book.name;
        bookAuthors.textContent = book.authors.join(', ');
        bookLanguage.textContent = book.language;
        bookTags.textContent = book.tags.join(', ');
        bookPublisher.textContent = book.publisher;
        // bookPublishDate.textContent = book.publishDate;
        bookPublishDate.textContent = formattedDate;
        bookTranslator.textContent = book.translatedBy;
        bookISBN.textContent = book.isbn;
        bookPageCount.textContent = book.pageCount;
        bookDescription.textContent = book.description;
        
        viewButton.addEventListener('click', () => {
            localStorage.setItem('pdfUrl', book.url);
            console.log('PDF URL set in localStorage:', book.url);
            window.location.href = './pdfjs/web/viewer.html';
        });
    } else {
        console.error('No book found with the given ID in localStorage');
    }

    const pdfUrl = book.url; // URL to your PDF
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    // Asynchronous function to load and render PDF
    async function renderPdfToImg(pdfUrl) {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);

      try {
        const pdf = await loadingTask.promise;
        const pageNum = 1; // Assuming you want to render the first page
        const page = await pdf.getPage(pageNum);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.getElementById('pdf-render');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext);

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png');
        const bookCover = document.getElementById('book-cover');
        bookCover.src = imgData;
        // console.log(imgData);
      } catch (error) {
        console.error('Error occurred while rendering PDF:', error);
      }
    }

    // Call the function to render PDF as image
    renderPdfToImg(pdfUrl);

});
