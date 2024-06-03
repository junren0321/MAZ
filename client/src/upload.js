// Initialize arrays to store authors and categories
let authorsarray = [];
let categories = [];

document.getElementById("author").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        appendAuthor();
    }
});

function appendAuthor() {
    const authorInput = document.getElementById("author");
    const authorValue = authorInput.value.trim();
    if (authorValue) {
        authorsarray.push(authorValue); // Store in array for submission
        authorInput.value = "";
        displayAuthors();
    }
}

function displayAuthors() {
    const addedAuthorsElement = document.getElementById("addedAuthors");
    addedAuthorsElement.innerHTML = authorsarray.map(author => `<span class="author-box">${author}</span>`).join(" ");
}


function deleteAuthor() {
    authorsarray = []; // Clear the array
    displayAuthors();
}


/*  use format of search
    // function appendCategory() {
    //   const categorySelect = document.getElementById("tags");
    //   const selectedCategory = categorySelect.value.trim(); // Assuming a single selection for simplicity
    //   if (selectedCategory && !categories.includes(selectedCategory)) {
    //     if (categories.length < 3) {
    //         categories.push(selectedCategory); // Add to array if not already included
    //         //   categorySelect.value = "";
    //         displayCategories(); // Update the display
    //     } else {
    //         alert("You can't add more than three categories.");
    //     }
    //   }
    // }

    // function deleteCategory() {
    //     categories = []; // Clear the array
    //     displayCategories();
// }
*/


function displayCategories() {
    const selectedCategoriesElement = document.getElementById("selected-tags");
    selectedCategoriesElement.innerHTML = categories.map(category => `<span class="category-box">${category}</span>`).join(" ");
}

const tagsButtons = document.querySelectorAll('.theme-button');
const tagsInput = document.getElementById('theme');
const tagsContainer = document.getElementById('selected-tags');

document.addEventListener("DOMContentLoaded", function() {

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

                    categories = categories.filter(c => c !== tag);
                });

                tagElement.appendChild(removeTag);
                tagsContainer.appendChild(tagElement);

                if (!categories.includes(tag)) {
                    categories.push(tag);
                }
            });
        });
    });
});

const uploadForm = document.getElementById('uploadform');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!token) {
        // Optionally notify the user they need to log in
        alert('You need to be logged in to upload a picture book.');
        return;
    }
    // Validate input
    if (authorsarray.length === 0 || categories.length === 0) {
        alert("Please add at least one author and one category.");
        return;
    }

    const ISBNInput = document.getElementById('isbn').value;
    if(ISBNInput == ""){
      alert("Please provide the ISBN.");
      return;
    }

    // Prepare FormData
    const formData = new FormData(uploadForm);
    formData.delete('author');
    formData.delete('tags');
    
    authorsarray.sort(); // Sort authors array alphabetically
    categories.sort(); // Sort categories array alphabetically
    
    authorsarray.forEach(author => formData.append('authors', author));
    categories.forEach(category => formData.append('tags', category));

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData, // Sending FormData directly
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Book successfully uploaded!');
            console.log('Book uploaded successfully');
            // Reset the form and arrays after successful upload
            uploadForm.reset();
            authorsarray = [];
            categories = [];
            displayAuthors();
            displayCategories();
            tagsInput.value = '';
        } else {
            alert('Failed to upload book. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during uploading. Please check the console for details.');
    }
});
