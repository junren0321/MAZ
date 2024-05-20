document.addEventListener('DOMContentLoaded', function() {
    const buttonActions = [
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
