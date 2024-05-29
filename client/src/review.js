document.getElementById("reviewForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const bookId = document.getElementById("bookId").value;
    const userId = document.getElementById("userId").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookId, userId, rating, comment })
        });

        if (!response.ok) {
            throw new Error('Failed to add review');
        }

        const data = await response.json();
        alert(data.message);
        document.getElementById("reviewForm").reset();
        loadReviewsForBook(bookId);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the review');
    }
});

async function loadReviewsForBook(bookId) {
    try {
        const response = await fetch(`/api/reviews/book/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews for book');
        }
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching reviews');
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = '';

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>No reviews available for this book.</p>";
        return;
    }

    const ul = document.createElement("ul");
    reviews.forEach(review => {
        const li = document.createElement("li");
        li.textContent = `User ID: ${review.user_id}, Rating: ${review.rating}, Comment: ${review.comment}`;
        ul.appendChild(li);
    });
    reviewsContainer.appendChild(ul);
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
                const currentBookId = localStorage.getItem('currentBookId');
                fetchReviews(currentBookId);
            } else {
                console.error('Failed to edit review');
            }
        } catch (error) {
            console.error('Error editing review:', error);
        }
    }
}


// Fetch reviews on page load
window.onload = function() {
    const bookId = localStorage.getItem('currentBookId');/* Retrieve bookId from somewhere */;
    fetchReviews(bookId);
};


// modified, rating
