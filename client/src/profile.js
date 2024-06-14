document.addEventListener('DOMContentLoaded', () => {
    /* profile-pic-2 container */
    const user = JSON.parse(localStorage.getItem('user'));
    const container = document.getElementById('profile-pic-2');
    // console.log('pic url = ',user.profilePicUrl);

    if (user && user.profilePicUrl) {
        const img = document.createElement('img');
        img.id = 'profile-pic-img';
        img.src = user.profilePicUrl;
        img.alt = 'profile-pic';
        container.appendChild(img);
    } else {
        console.log('Default profile');
        const img = document.createElement('img');
        img.id = 'profile-pic-img';
        img.src = 'img/profile-default.png';
        img.alt = 'profile-pic';
        container.appendChild(img);
    }

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = '<i class="fas fa-camera"></i> &nbsp;Upload';

    const fileInput = document.getElementById('fileInput');
    if (!fileInput) {
        console.error("File input not found!");
        return;
    }

    // Set onclick to trigger file input dialog
    overlay.onclick = () => fileInput.click();
    container.appendChild(overlay);

    /* profile-pic-2 container */

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

async function deleteBook(bookId) {
    const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    const book = searchResults.find(book => book.id === bookId);
    
    if (book) {
        // TODO: perform delete feature book here
        const user = JSON.parse(localStorage.getItem('user'));

        try {
            const response = await fetch('/api/deletebook', {
            method: 'DELETE',
            body: JSON.stringify({
                bookId: bookId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
            });
            if (response.ok) {
            alert(`${book.name} has been successfully deleted`);
            window.location.reload();
            } else {
                alert('Something went wrong');
                console.error('Failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else{
        alert('Something went wrong');
    }
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the file that was uploaded
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const container = document.getElementById('profile-pic-2');
            // Remove any existing images
            const existingImage = container.querySelector('img');
            if (existingImage) {
                container.removeChild(existingImage);
            }

            // Create a new image element and set its properties
            const img = document.createElement('img');
            img.id = 'profile-pic-img';
            img.src = e.target.result; // Set the image source to the file content
            img.alt = 'Profile Picture';
            container.appendChild(img); // Append the image to the container

            // Remove existing overlay
            const existingOverlay = container.querySelector('.overlay');
            if (existingOverlay) {
                container.removeChild(existingOverlay);
            }

            //create upload overlay
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.innerHTML = '<i class="fas fa-camera"></i> &nbsp;Upload';

            const fileInput = document.getElementById('fileInput');
            if (!fileInput) {
                console.error("File input not found!");
                return;
            }
        
            // Set onclick to trigger file input dialog
            overlay.onclick = () => fileInput.click();
            container.appendChild(overlay);
        };
        reader.readAsDataURL(file); // Read the file as a data URL to trigger onload
    }
});

function uploadProfilePicture() {
    const token = localStorage.getItem('jwt');
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('profilePicture', file);
        console.log('Sending profile picture\n');

        fetch('/api/changeprofilePic', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Profile picture updated successfully!');
            // Retrieve the existing user data from local storage
            let userData = localStorage.getItem('user');
            if (userData) {
                userData = JSON.parse(userData); // Parse it to an object
                userData.profilePicUrl = data.profilePicUrl; // Update the profilePicUrl
                localStorage.setItem('user', JSON.stringify(userData)); // Convert it back to string and store it again
            }
            window.location.href = 'profile.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to update profile picture.');
        });
    } else {
        alert('Please select a file to upload.');
    }
}

// change email
const changemail = document.getElementById('changemailform');
changemail.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(changemail);
    
  try {
    const response = await fetch('/api/changemail', {
      method: 'PUT',
      body: JSON.stringify({
        changemailpassword: formData.get('changemailpassword'),
        oldemail: formData.get('oldemail'),
        newemail: formData.get('newemail')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const emailElement = document.querySelector('.profile-description.email');
      const user = JSON.parse(localStorage.getItem('user'));
      user.email = formData.get('newemail');
      localStorage.setItem('user', JSON.stringify(user));
      emailElement.textContent = `Current Email: ${formData.get('newemail')}`;
      alert('Please check your new email for our message!');
      document.getElementById('closeemail').click();
    } else {
        alert('Something went wrong');
        console.error('Failed:', response.statusText);
    }
} catch (error) {
    console.error('Error:', error);
}
});

// change password
const changepassword = document.getElementById('changepasswordform');
changepassword.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(changepassword);
    const user = JSON.parse(localStorage.getItem('user'));

    const passwordInput = formData.get('newpassword');
    const confirmPasswordInput = formData.get('confirmpassword')
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    let valid = true;
    
    // Clear previous error messages
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    
    // Check if password is 6-12 characters long and contains only letters and numbers
    if (!passwordRegex.test(passwordInput)) {
        document.getElementById('passwordError').textContent = 'Password must be 6-12 characters long and contain both letters and numbers.';
        valid = false;
    }
    
    // Check if passwords match
    if (passwordInput !== confirmPasswordInput) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        valid = false;
    }

    if(valid){
        try {
            const response = await fetch('/api/changepassword', {
            method: 'PUT',
            body: JSON.stringify({
                currentpassword: formData.get('currentpassword'),
                newpassword: formData.get('newpassword'),
                useremail: user.email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
            });
            if (response.ok) {
            alert('password change successful!');
            document.getElementById('closepassword').click();
            } else {
                alert('Something went wrong');
                console.error('Failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

// change username
const changeusername = document.getElementById('changeusernameform');
changeusername.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(changeusername);
    const user = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch('/api/changeusername', {
      method: 'PUT',
      body: JSON.stringify({
        changenamepassword: formData.get('changeusernamepassword'),
        newname: formData.get('username'),
        useremail: user.email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const usernameElement = document.querySelector('.profile-description.username');
      const user = JSON.parse(localStorage.getItem('user'));
      user.username = formData.get('username');
      localStorage.setItem('user', JSON.stringify(user));
      usernameElement.textContent = `Current Username: ${formData.get('username')}`;
      alert('Username change successful!');
      document.getElementById('closeusername').click();
    } else {
        alert('Something went wrong');
        console.error('Failed:', response.statusText);
    }
} catch (error) {
    console.error('Error:', error);
}
});

function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('uploadResults');
    localStorage.removeItem('currentBook');
    localStorage.removeItem('bookId');
    localStorage.removeItem('pdfUrl');
    window.location.href = './index.html';
}

const deleteuser = document.getElementById('deleteuserform');
deleteuser.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(deleteuser);
    const user = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch('/api/deleteuser', {
      method: 'DELETE',
      body: JSON.stringify({
        deleteuserpassword: formData.get('deleteuserpassword'),
        useremail: user.email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      alert('Please check your email for our message!');
      logout();
    } else if (response.status == 401){
        alert('Wrong password');
    } else {
        alert('Something went wrong');
        console.error('Failed:', response.statusText);
    }
} catch (error) {
    console.error('Error:', error);
}
});