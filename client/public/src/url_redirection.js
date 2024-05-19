<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    const buttonActions = [
        { id: 'logo-1', url: './index.html' },
        { id: 'register-1', url: './register.html' },
        { id: 'login', url: './login.html' },
        { id: 'register-2', url: './login.html' }
    ];

    const added = new Set();
    
    buttonActions.forEach(function(action) {
        if (!added.has(action.id)) {
            const button = document.getElementById(action.id);
            if (button) {
                button.addEventListener('click', function() {
                    // Navigate to the specified URL
                    window.location.href = action.url;
                });
                added.add(action.id);
            }
        }
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('logo-1').addEventListener('click', function() {
//         window.location.href = '../teset/home.html';
//     });
// });
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('about').addEventListener('click', function() {
//         window.location.href = '../teset/home.html';
//     });
// });
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('login-2').addEventListener('click', function() {
//         window.location.href = '../teset/home.html';
//     });
// });
=======
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('register-2');

    signupButton.addEventListener('click', function() {
        // Navigate to the signup page
        window.location.href = './login.html';
    });
});
>>>>>>> e30fde2 (prototype)
