let verification_code = -1;
let userID = -1;

const forgotForm = document.getElementById('forgotform');
forgotForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(forgotForm);
  try {
    const response = await fetch('/api/forgot', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      verification_code = data.verification_code;
      userID = data.userID;
      alert('Please check your email for the verification code!');
      document.getElementById('forgotform').style.display = 'none';
      document.getElementById('verifyform').style.display = 'block';
    } else {
        alert('Email does not exist!');
        console.error('failed:', response.statusText);
    }
} catch (error) {
    console.error('Error:', error);
}
});

const verifyForm = document.getElementById('verifyform');
verifyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(verifyForm);
    const verification_input = formData.get('verify');
    if (verification_input === verification_code) {
      alert('Please enter your new password!');
      document.getElementById('verifyform').style.display = 'none';
      document.getElementById('changepassform').style.display = 'block';
    } else {
        alert('Verification failed, please re-enter email.');
        document.getElementById('verifyform').style.display = 'none';
        document.getElementById('forgotform').style.display = 'block';
    }
});

const changepassForm = document.getElementById('changepassform');
changepassForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const passwordInput = document.getElementById('changepass').value;
  const confirmPasswordInput = document.getElementById('confirmPassword').value;
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
    const formData = new FormData(changepassForm);
    try {
      const response = await fetch('/api/changepass', {
        method: 'PUT',
        body: JSON.stringify({
          new_password: formData.get('password'),
          userID: userID
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('You have successfully changed your password!');
        console.log('User changed password successfully');
        window.location.href = './login.html'
      } else {
        alert('Cannot change password!');
        console.error('Change Password failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }      
  }
});
