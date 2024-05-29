document.addEventListener("DOMContentLoaded", function() {
    const tagsButtons = document.querySelectorAll('.theme-button');
    const tagsInput = document.getElementById('theme');
    const tagsContainer = document.getElementById('selected-tags');

    // Tag button click event listeners
    tagsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tagValue = this.textContent;
            let tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);

            if (tags.includes(tagValue)) {
                return;
            }

            if (tags.length >= 3) {
                alert('You can select up to 3 tags only.');
                return;
            }

            tags.push(tagValue);
            tagsInput.value = tags.join(', ');

            tagsContainer.innerHTML = '';

            tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'theme-tag';
                tagElement.textContent = tag;

                const removeTag = document.createElement('span');
                removeTag.className = 'remove-tag';
                removeTag.textContent = '×';
                removeTag.addEventListener('click', function() {
                    tagsContainer.removeChild(tagElement);
                    tags = tags.filter(t => t !== tag);
                    tagsInput.value = tags.join(', ');
                });

                tagElement.appendChild(removeTag);
                tagsContainer.appendChild(tagElement);
            });
        });
    });

    async function searchBooks() {
        const name = document.getElementById('name').value.toLowerCase();
        const author = document.getElementById('author').value.toLowerCase();
        const isbn = document.getElementById('isbn').value;
        const tags = document.getElementById('theme').value.split(',').map(t => t.trim().toLowerCase()).filter(t => t);
        const language = document.getElementById('language').value.toLowerCase();

        const queryParams = new URLSearchParams({
            name: name,
            isbn: isbn,
            tags: tags.join(','),
            language: language
        });

        // Adding authors as separate query parameters
        if (author) {
            const authorsArray = author.split(',').map(a => a.trim());
            authorsArray.forEach((author, index) => {
                queryParams.append(`author[${index}]`, author);
            });
        }

        console.log('Sending GET request to /api/books with query parameters:', queryParams.toString());

        try {
            const response = await fetch(`/api/books?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Data parsed:', data);

            const results = data.filter(book => {
                const bookName = book.name?.toLowerCase() || "";
                const bookAuthors = book.authors ? book.authors.map(author => author.toLowerCase()) : [];
                const bookTags = book.tags ? book.tags.map(tag => tag.toLowerCase()) : [];
                const bookLanguage = book.language?.toLowerCase() || "";

                return (name !== "" && bookName.includes(name)) ||
                       (author !== "" && bookAuthors.some(a => a.includes(author))) ||
                       (isbn !== "" && book.isbn?.includes(isbn)) ||
                       (tags.length > 0 && tags.some(t => bookTags.includes(t))) ||
                       (language !== "" && bookLanguage.includes(language));
            });

            console.log('Filtered results:', results);
            // Store the results in localStorage
            localStorage.setItem('searchResults', JSON.stringify(results));
            console.log('Stored in localStorage:', JSON.parse(localStorage.getItem('searchResults')));

            // Redirect to search.html
            window.location.href = 'search.html';
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', searchBooks);

    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    const languageParam = urlParams.get('language');
    
    if (themeParam) {
        const themeButton = document.getElementById(themeParam);
        if (themeButton) {
            themeButton.click();
            searchButton.click();
        }
    } else if (languageParam) {
        document.getElementById('language').value = languageParam;
        searchButton.click();
    }
});



