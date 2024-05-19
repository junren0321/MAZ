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
