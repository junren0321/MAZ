document.addEventListener('DOMContentLoaded', () => {
    if (userislogin()) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
            const emailElement = document.querySelector('.profile-description.email');
            emailElement.textContent = `Current Email: ${user.email}`;
        }
        if (user && user.username) {
            const usernameElement = document.querySelector('.profile-description.username');
            usernameElement.textContent = `Current Username: ${user.username}`;
        }
    }
    fetchBooks();

    setTimeout(() => {
        const resultsContainer = document.getElementById('search-results');
        const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
        console.log('Loaded from localStorage:', searchResults);  // 調試日誌

        if (searchResults.length === 0) {
            resultsContainer.innerHTML = '<p>You haven\'t searched any picture books yet.</p>';
            return;
        }

        function updateGridLayout(numberOfItems) {
            const rows = Math.ceil(numberOfItems / 2);
            resultsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            resultsContainer.style.gridTemplateRows = `repeat(${rows}, auto)`;
        }

        searchResults.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'profile-box';

            // TODO: if delete feature not needed anymore, remove delete button here

            bookElement.innerHTML = `
                <div onclick="deleteBook(${book.id})"><img src="./img/delete.png" class="delete-upload"/></div>
                <div id="pdf-cover-${book.id}" class="pdf-cover" onclick="viewBook(${book.id})"></div>
                <div style="font-size: 15px; font-weight: 500;">${book.name}</div>`
                + book.authors.map(author => `<span class="profile-author-box">${author}</span>`).join(" ");
            
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

function deleteBook(bookId) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    if (book) {
        // localStorage.setItem('currentBook', JSON.stringify(book));
        // localStorage.setItem('bookId', bookId);
        // console.log('Book details stored in localStorage:', book);

        // TODO: perform delete feature book here
        alert(`${book.name} has been successfully deleted`);
        window.location.reload();
    }
}

function uploadPic() {
    // TODO: perform upload profile pic feature here
    alert("Profile Picture has been successfully uploaded!");
    window.location.reload();
}

async function fetchBooks() {
    const token = localStorage.getItem('jwt');
    try {
        const response = await fetch(`/api/userBooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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