document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    setTimeout(() => {
        const resultsContainer = document.getElementById('search-results');
        const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
        console.log('Loaded from localStorage:', searchResults);  // 調試日誌

        if (searchResults.length === 0) {
            resultsContainer.innerHTML = '<p>Surprise. Nothing is shown here.</p>';
            return;
        }

        searchResults.forEach((book, index) => {
            // if (index <3) return;
            if (index > 7) return;
            const bookElement = document.createElement('div');
            bookElement.className = 'my-card';

            bookElement.innerHTML = `
                <div id="pdf-cover-${book.id}" class="pdf-cover" onclick="viewBook(${book.id})"></div>
                <div style="font-size: 15px; font-weight: 500;">${book.name}</div>`
                + book.authors.map(author => `<span class="author-box">${author}</span>`).join(" ");
            
            resultsContainer.appendChild(bookElement);

            const loadingTask = pdfjsLib.getDocument(book.url);
            loadingTask.promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const scale = 0.3;
                    const viewport = page.getViewport({ scale: scale });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    
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

        $num = $('.my-card').length;
        $even = $num / 2;
        $odd = ($num + 1) / 2;

        const windowWidth = window.innerWidth;
        const cardWidth = $('.my-card').outerWidth(true); // Including margin
        const totalCardWidth = $num * cardWidth;

        // Center the carousel
        let newLeft;
        if ($num % 2 == 0){
            newLeft = 110 + ((windowWidth - totalCardWidth ) / 2);
        }
        else{
            newLeft = ((windowWidth - totalCardWidth ) / 2);
        }
        
        $('.card-carousel').css('left', newLeft + 'px');

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
    if (!userislogin()){
        alert("Please login first!");
        window.location.href = 'login.html';
        return;
    }
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    if (book) {
        localStorage.setItem('currentBook', JSON.stringify(book));
        localStorage.setItem('bookId', bookId);
        console.log('Book details stored in localStorage:', book);
        window.location.href = 'explore_book.html';
    }
}