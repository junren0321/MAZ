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