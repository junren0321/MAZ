const loginForm = document.getElementById('loginform');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('jwt', data.token); // Store the JWT in localStorage
      
      localStorage.setItem('user', JSON.stringify({
        userId: data.user.userId,
        username: data.user.username, 
        email: data.user.email, 
        birthdate: data.user.birthdate, 
        profilePicUrl: data.user.profilePicUrl}));
      window.location.href = './userpage.html';
      
      alert('You have successfully login!');
    } else {
      alert('User does not exist or wrong password!');
      console.error('Login failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});