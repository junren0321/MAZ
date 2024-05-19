
function validateForm() {
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

    // Simulated email existence check
    if (emailInput === "existing@example.com") {
        alert('Email already exists.');
        valid = false;
    }

    // Check if username is taken
    const registerForm = document.getElementById('registerform');
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            username: formData.get('username'),
            email: formData.get('email'),
            date_of_birth: formData.get('birthdate'),
            password: formData.get('password'),
            security_question: formData.get('security-question'),
            security_answer: formData.get('security-answer')
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
          valid = false;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    return valid;
  }
