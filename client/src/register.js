const registerForm = document.getElementById('registerform');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;
  const confirmPasswordInput = document.getElementById('confirmPassword').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
  let valid = true;

  // Clear previous error messages
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';

  // Check if email is in a valid format
  if (!emailRegex.test(emailInput)) {
      alert('Please enter a valid email address.');
      valid = false;  
  }

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
    const formData = new FormData(registerForm);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: formData.get('username'),
          email: formData.get('email'),
          birthdate: formData.get('birthdate'),
          password: formData.get('password'),
          security_question: formData.get('security_question'),
          security_answer: formData.get('security_answer')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        window.location.href = './login.html';
        alert('You have successfully registered!');
        console.log('User registered successfully');
      } else {
        const data = await response.json();
        if (data.error === 'duplicate_email') {
          alert('Email has already been taken. Please try another one.');
        } else if (data.error === 'duplicate_username') {
          alert('Username has already been taken. Please try another one.');
        } else {
          alert('An error occurred during registration. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }      
  }
});
