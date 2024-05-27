document.addEventListener('DOMContentLoaded', function() {
    const buttonActions = [
        { id: 'logo-1', url: './index.html' },
        { id: 'register-1', url: './register.html' },
        { id: 'login', url: './login.html' },
        { id: 'register-2', url: './login.html' }
    ];

    const linksToUpdate = [
        { id: 'register-link', url: './register.html' },
        { id: 'forgot-password-link', url: './forgot_password.html' },
        { id: 'login-link', url: './login.html' } // Added comma here
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

    // Update href attributes of specified links
    linksToUpdate.forEach(function(link) {
        const elem = document.getElementById(link.id);
        if (elem) {
            elem.href = link.url;
        }
    });
});
