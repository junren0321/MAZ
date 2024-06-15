/*
    url redirection
*/
document.addEventListener('DOMContentLoaded', function() {
    const buttonActions = [
        { id: 'logo-1', url: './index.html' },
        { id: 'logo-2', url: './userpage.html' },
        // { id: 'announce', url: './announce.html' },
        { id: 'popular', url: './popular.html' },
        { id: 'about', url: './about.html' },
        { id: 'contact', url: './contact.html' },
        { id: 'login', url: './login.html' },
        { id: 'register-1', url: './register.html' },
        { id: 'register-2', url: './login.html' },
        { id: 'profile', url: './profile.html' },
        // { id: 'setting', url: './setting.html' },
        { id: 'explore', url: './search.html' },
        { id: 'upload', url: './upload.html' }
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

/*
    user login feature
*/
function userislogin() {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          return true;
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const profileOptions = document.querySelectorAll('.dropdown-menu div');
    const profileOption = document.getElementById('profile');
    // const settingOption = document.getElementById('setting');
    const logoutOption = document.getElementById('logout');
    const loginOption = document.getElementById('login');
    const registerOption = document.getElementById('register-1');
    const logo1Option = document.getElementById('logo-1');
    const logo2Option = document.getElementById('logo-2');
    const usernameOption = document.getElementById('username');
    const guestOption = document.getElementById('guest');

    profileOptions.forEach(option => {
        option.style.display = 'block';
    });

    if (userislogin()) {
        loginOption.style.display = 'none';
        registerOption.style.display = 'none';
        logo1Option.style.display = 'none';
        guestOption.style.display = 'none';
    } else {
        profileOption.style.display = 'none';
        // settingOption.style.display = 'none';
        logoutOption.style.display = 'none';
        logo2Option.style.display = 'none';
        usernameOption.style.display = 'none';
    }
});

function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('uploadResults');
    localStorage.removeItem('currentBook');
    localStorage.removeItem('bookId');
    localStorage.removeItem('pdfUrl');
    window.location.href = './index.html';
}

document.getElementById('logout').addEventListener('click', function() {
    logout();
    alert('You have successfully logged out!');
});

/*
    username feature
*/
document.addEventListener('DOMContentLoaded', () => {
    if (userislogin()) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username) {
            document.getElementById('username').textContent = user.username;
        }
        if (user && user.profilePicUrl) {
            const img = document.createElement('img');
            img.id = 'profile-pic-img';
            img.src = user.profilePicUrl;
            img.alt = 'profile-pic';
            document.getElementById('profile-pic').appendChild(img);
        }
    } else {
        const img = document.createElement('img');
        img.id = 'profile-pic-img';
        img.src = 'img/profile-default.png';
        img.alt = 'profile-pic';
        document.getElementById('profile-pic').appendChild(img);
    }
});
