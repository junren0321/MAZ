document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch and display images in the gallery
  async function loadGallery() {
    try {
      const response = await fetch('/api/images');
      if (response.ok) {
        const images = await response.json();
        const gallery = document.getElementById('imageGallery');
        gallery.innerHTML = images.map(img => `<img src="${img.url}" alt="${img.altText}">`).join('');
      } else {
        console.error('Failed to load images:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('You have successfully registered!');
        console.log('User registered successfully');
      } else {
        alert('This username has been taken. Try another one.');
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt', data.token); // Store the JWT in localStorage
        alert('You have successfully login!');
        console.log('Login successfully');
      } else {
        alert('User does not exist or wrong password!');
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const logoutButton = document.getElementById('logoutButton');

  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Remove the token from localStorage
    localStorage.removeItem('jwt');
    
    // Provide user feedback or redirect to login
    alert('You have successfully logout!');
    console.log('Logout successful');
  });

  // Event listener for the upload form
  const uploadForm = document.getElementById('uploadForm');
  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(uploadForm);
    const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`  // Ensure this line correctly adds the token
        }
      });
      if (response.ok) {
        loadGallery(); // Refresh gallery after successful upload
      } else {
        alert('You must login before uploading an image!');
        console.error('Image upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Load the gallery when the page loads
  loadGallery();
});
