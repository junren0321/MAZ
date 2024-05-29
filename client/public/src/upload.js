// authors
let authors = ""; // Initialize an empty string to store authors
let authorsarray = [];

function appendauthor() {
    const authorInput = document.getElementById("author");
    const authorValue = authorInput.value.trim(); // Get the trimmed value of the input
    // Check if the input value is not empty
    if (authorValue) {
        // Append the author value to the authors string with a comma
        authors += (authors ? ", " : "") + authorValue;
        authorsarray.push(authorValue);
        authorInput.value = ""; // Clear the input field
        displayAuthors(); // Update the displayed authors
    }
}

function deleteauthor() {
  const authorInput = document.getElementById("author");
  // Check if the input value is not empty
  if (authors) {
      authors = "";
      authorsarray,length = 0;
      authorInput.value = ""; // Clear the input field
      displayAuthors(); // Update the displayed authors
  }
}

function displayAuthors() {
    const addedAuthorsElement = document.getElementById("addedAuthors");
    addedAuthorsElement.textContent = "Added Authors: " + authors;
}

// categories
let categories = []; // Initialize an empty array to store categories

function addcategory() {
    const categoriesSelect = document.getElementById("tags");
    const selectedOptions = Array.from(categoriesSelect.selectedOptions);

    selectedOptions.forEach(option => {
        const categoryValue = option.value.trim(); // Get the trimmed value of the option
        if (!categories.includes(categoryValue)) {
            categories.push(categoryValue); // Add the category to the array if it's not already present
        }
    });
    displayCategories(); // Update the displayed categories
}

function deletecategory() {
  categories.length = 0;
  displayCategories();
}

function displayCategories() {
    const selectedCategoriesElement = document.getElementById("selectedcategories");
    selectedCategoriesElement.textContent = "Selected Categories: " + categories.join(", ");
}


const uploadForm = document.getElementById('uploadform');
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const booknameInput = document.getElementById('bookname').value;
  let valid = true;

  // Check if Authors and Categories
  if (authorsarray.length == 0) {
    valid = false;
  }
  if (categories.length == 0) {
    valid = false;
  }

  if(valid){
    const formData = new FormData(uploadForm);
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({
            pdfupload: formData.get('pdfupload'),
            name: formData.get('bookname'),
            authors: authorsarray,
            language: formData.get('language'),
            tags: categories,
            publisher: formData.get('publisher'),
            publish_date: formData.get('publish_date'),
            translated_by: formData.get('translator'),
            page_count: formData.get('pagecount'),
            isbn: formData.get('isbn'),
            description: formData.get('description')
          }),
          headers: {
            'Authorization': `Bearer ${token}` 
          }
      });
      if (response.ok) {
        alert('You have successfully uploaded!');
        console.log('User uploaded successfully');
      } else {
          alert('An error occurred during uploading. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }      
  }
});
