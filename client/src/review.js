localStorage.setItem('currentUser', 'abc');
localStorage.setItem('currentBookId', '1');

async function submitReview() {
    
    const currentUser = localStorage.getItem('currentUser');
    const currentbookId = localStorage.getItem('currentBookId');
    // const token = localStorage.getItem('jwt');
    // if (!currentUser || !token) {
    //     // Optionally notify the user they need to log in
    //     alert('You need to be logged in to submit a review.');
    //     return;
    // }
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
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                username: currentUser, 
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

document.getElementById('reviewInput').addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior of Enter key (e.g., inserting a newline)
        await submitReview(); // Call the submitReview function
    }
});

async function fetchReviews(bookId) {
    try {
        // const bookId = localStorage.getItem('currentBookId');
    //  // Assuming bookId is stored in localStorage
    //     if (!bookId) {
    //         console.error('No book ID found in localStorage.');
    //         return;
    //     }   

        // const response = await fetch(`api/reviews/${bookId}`);
        const response = await fetch(`api/reviews/${bookId}`);
        const reviews = await response.json();
        // console.log(reviews);

        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';
        
        // let index = 0;
        reviews[0].forEach((review) => {
            // console.log(review);
            const listItem = document.createElement('li');
            // Concatenate username and review text
            const reviewDate = new Date(review.createdAt);
            const formattedDate = `${reviewDate.getFullYear()}/${reviewDate.getMonth() + 1}/${reviewDate.getDate()}`;
            // listItem.textContent = `${review.username}: ${review.review}    ${formattedDate}`;
            // listItem.textContent = `${review.username}: ${review.review}       ${new Date(review.createdAt).toLocaleString()}`;
            // console.log(review.username);
            // listItem.textContent = `${review.username}: ${review.review}`;
            listItem.innerHTML = `${review.username}<br>: ${review.review}`;
            // console.log(listItem.textContent);
           
            const timestampSpan = document.createElement('span');
            timestampSpan.classList.add('timestamp');
            timestampSpan.textContent = formattedDate; // Your formatted timestamp value
            listItem.appendChild(timestampSpan);
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.innerHTML = '<i class="fas fa-pen"></i>';
            editButton.addEventListener('click', () => editReview(review.id, review.review));
            listItem.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener('click', () => deleteReview(review.review));
            listItem.appendChild(deleteButton);

            reviewsList.appendChild(listItem);
            // index++;
            // console.log(index);
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

async function deleteReview(review) {
    try {
        // const token = localStorage.getItem('jwt');
        const response = await fetch(`/api/reviews/${review}`, {
            method: 'DELETE',
            // headers: {
            //     // 'Authorization': `Bearer ${token}`
            // }
        });
        if (response.ok) {
            // If the deletion is successful, fetch and display reviews again
            const currentbookId = localStorage.getItem('currentBookId');
            fetchReviews(currentbookId);
        } else {
            console.error('Failed to delete review');
        }
    } catch (error) {
        console.error('Error deleting review:', error);
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