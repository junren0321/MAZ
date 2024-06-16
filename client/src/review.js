document.addEventListener("DOMContentLoaded", function() {
    const bookId = localStorage.getItem('bookId');
    fetchReviews(bookId);
});
// document.getElementById("reviewInput").addEventListener('keydown', async function(event) {
//     if (event.key === 'Enter') {
//         // event.preventDefault(); // Prevent default behavior of Enter key (e.g., submitting the form)
//         // event.stopImmediatePropagation();
//     }
// });

async function submitReview() {
    const userObject = JSON.parse(localStorage.getItem('user'));
    const currentUser = userObject ? userObject.username : null;

    const currentbookId = localStorage.getItem('bookId');
    const token = localStorage.getItem('jwt');
    if (!currentUser || !token) {
        alert('You need to be logged in to submit a review.');
        return;
    }
    const reviewInput = document.getElementById('reviewInput');
    const reviewText = reviewInput.value.trim();

    if (!reviewText) {
        // alert('Review cannot be empty');
        reviewInput.value = '';
        return;
    }
    try{    
        const response = await fetch(`/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                userId: userObject.userId, 
                bookId: currentbookId,
                review: document.getElementById('reviewInput').value
            }),
        });


        if (response.ok) {
           reviewInput.value = '';
        
            // alert('Review submitted successfully');
        } 
        // else {
        //     alert('Review submission failed');
        // }
        }catch (error) {
        console.error('Error submitting review:', error);
    }
    fetchReviews(currentbookId);
}

async function fetchReviews(bookId) {
    const { formatDistance } = dateFns;
    try {
        const response = await fetch(`api/reviews/${bookId}`);
        const reviews = await response.json();
        
        const userObject = JSON.parse(localStorage.getItem('user'));
        const resultsContainer = document.getElementById('review-results');
        resultsContainer.innerHTML = '';
        
        reviews.forEach((review) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-box';

            const reviewDate = new Date(review.createdAt);
            const now = new Date();
            const relativeTime = formatDistance(reviewDate, now, { addSuffix: true });

            reviewItem.innerHTML = 
            `<div class="left-review-box">
                <div class="profile-pic-1">
                    <img class="profile-pic-img" src="uploads/${review.profilePicURL}" alt="profile-pic">
                </div>
            </div>
            <div class="right-review-box">
                <p style="font-size:18px; margin-bottom: -2px;"><strong>${review.username}</strong></p>
                <p style="font-size:13px;">${relativeTime}</p>
                <p style="white-space: pre-line;">${review.review}</p>
            </div>`;

            if (userObject.userId === review.userId & userislogin()){
                const spacer = document.createElement('div');
                spacer.style.height = '20px';
                reviewItem.appendChild(spacer);

                const editButton = document.createElement('div');
                editButton.innerHTML = '<img src="./img/edit.png" class="edit-review"/>';
                editButton.addEventListener('click', () => editReview(review.id, review.review));
                reviewItem.appendChild(editButton);

                const deleteButton = document.createElement('div');
                deleteButton.innerHTML = `<img src="./img/delete.png" class="delete-review"/>`;
                deleteButton.addEventListener('click', () => deleteReview(review.id, review.review));
                reviewItem.appendChild(deleteButton);
            }
            
            resultsContainer.appendChild(reviewItem);
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

async function deleteReview(reviewId, currentReview) {
    let isSure = confirm(`Do you really want to delete this review?`);
    if (isSure) {
        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const bookId = localStorage.getItem('bookId');
                fetchReviews(bookId);
            } else {
                console.error('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    }
}

async function editReview(reviewId, currentReview) {
    const newReviewText = prompt('Edit your review:', currentReview);
    if (newReviewText && newReviewText.trim() !== '') {
        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review: newReviewText })
            });
            if (response.ok) {
                const bookId = localStorage.getItem('bookId');
                fetchReviews(bookId);
            } else {
                console.error('Failed to edit review');
            }
        } catch (error) {
            console.error('Error editing review:', error);
        }
    }
}