
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`/file/upload`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('File uploaded successfully');
        } else {
            alert('File upload failed');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

async function submitReview() {
    const fileId = document.getElementById('fileIdInput').value;
    const review = document.getElementById('reviewInput').value;

    try {
        const response = await fetch(`/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileId, review }),
        });

        // if (response.ok) {
            // alert('Review submitted successfully');
        // } else {
        //     alert('Review submission failed');
        // }
    } catch (error) {
        console.error('Error submitting review:', error);
    }
    fetchReviews();
}

async function fetchReviews() {
    try {
        const response = await fetch(`/api/reviews`);
        const reviews = await response.json();

        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';

        reviews.forEach((review) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${review.file.filename}: ${review.review}`;
            reviewsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Fetch reviews on page load
window.onload = fetchReviews;
