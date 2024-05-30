document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    setTimeout(() => {
        const resultsContainer = document.getElementById('search-results');
        const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
        console.log('Loaded from localStorage:', searchResults);  // 調試日誌

        if (searchResults.length === 0) {
            resultsContainer.innerHTML = '<p>You haven\'t searched any picture books yet.</p>';
            return;
        }

        searchResults.forEach((book, index) => {
            if (index > 7) return;
            const bookElement = document.createElement('div');
            bookElement.className = 'my-card';

            const bookAuthors = Array.isArray(book.author) ? book.author.join(', ') : 'Unknown Author';
            const bookTags = Array.isArray(book.tags) ? book.tags.slice(0, 3).join(', ') : 'No Tags';

            bookElement.innerHTML = `
                <div id="pdf-cover-${book.id}" class="pdf-cover" onclick="viewBook(${book.id})"></div>
                <div style="font-size: 15px;">Title: ${book.name}</div>
                <div style="font-size: 15px;">Author: ${book.authors}</div>
                <!-- <div style="font-size: 15px;">Language: ${book.language}</div> -->
                <!-- <div style="font-size: 15px;">Tags: ${bookTags}</div> -->
            `;
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

                    page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                        document.getElementById(`pdf-cover-${book.id}`).appendChild(canvas);
                    });
                });
            }).catch(error => {
                console.error('Error loading PDF:', error);
            });
        });

        $num = $('.my-card').length;
        $even = $num / 2;
        $odd = ($num + 1) / 2;

        if ($num % 2 == 0) {
            $('.my-card:nth-child(' + $even + ')').addClass('active');
            $('.my-card:nth-child(' + $even + ')').prev().addClass('prev');
            $('.my-card:nth-child(' + $even + ')').next().addClass('next');
        } else {
            $('.my-card:nth-child(' + $odd + ')').addClass('active');
            $('.my-card:nth-child(' + $odd + ')').prev().addClass('prev');
            $('.my-card:nth-child(' + $odd + ')').next().addClass('next');
        }

        $('.my-card').click(function() {
            $slide = $('.active').width();
            console.log($('.active').position().left);
        
            if ($(this).hasClass('next')) {
                $('.card-carousel').stop(false, true).animate({left: '-=' + $slide});
            } else if ($(this).hasClass('prev')) {
                $('.card-carousel').stop(false, true).animate({left: '+=' + $slide});
            }

            $(this).removeClass('prev next');
            $(this).siblings().removeClass('prev active next');

            $(this).addClass('active');
            $(this).prev().addClass('prev');
            $(this).next().addClass('next');
        });

        // Keyboard nav
        $('html body').keydown(function(e) {
            if (e.keyCode == 37) { // left
                $('.active').prev().trigger('click');
            } else if (e.keyCode == 39) { // right
                $('.active').next().trigger('click');
            }
        });
    }, 500);
});

function viewBook(bookId) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        localStorage.setItem('bookId', bookId);
        console.log('Book details stored in localStorage:', book);
        window.location.href = 'explore_book.html';
    }
}

async function fetchBooks() {
    try {
        const response = await fetch(`/api/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        console.log('Data parsed:', data);
        // console.log('Filtered results:', results);
        localStorage.setItem('searchResults', JSON.stringify(data));
        // console.log('Stored in localStorage:', JSON.parse(localStorage.getItem('searchResults')));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

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