// document.addEventListener('DOMContentLoaded', function () {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.profilePicUrl) {
//         document.getElementById('profile-pic-img').src = user.profilePicUrl;
//     } else {
//         document.getElementById('profile-pic-img').src = 'img/profile-default.png'; // Fallback to default image
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));

    const container = document.getElementById('profile-pic');
    // console.log('pic url = ',user.profilePicUrl);
    
    if (user && user.profilePicUrl) {
        const img = document.createElement('img');
        img.id = 'profile-pic-img';
        img.src = user.profilePicUrl;
        img.alt = 'profile-pic';
        container.appendChild(img);
    } else {
        // console.log('Default profile');
        const img = document.createElement('img');
        img.id = 'profile-pic-img';
        img.src = 'img/profile-default.png';
        img.alt = 'profile-pic';
        container.appendChild(img);
    }
});