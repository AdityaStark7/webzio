
function fetchNews(category, sentiment) {
    // Clear previous news articles
    document.getElementById('newsArticles').innerHTML = '';

    // API endpoint for fetching news articles
    const apiUrl = 'https://api.webz.io/newsApiLite?token=391662d1-b0c6-454e-b3a6-7f40987436b8&q=' + category + '&sentiment=' + sentiment;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display news articles
            displayNews(data.posts);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

// Function to display news articles
function displayNews(posts) {
    const newsContainer = document.getElementById('newsArticles');

    // Check if there are articles to display
    if (posts.length === 0) {
        newsContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    // Loop through each article and create HTML elements to display them
    posts.forEach(post => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('col-md-6', 'mb-3');

        // Construct HTML for each article
        articleCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${post.thread.title}</h5>
                    <p class="card-text"><strong>Source:</strong> ${post.thread.site}</p>
                    <p class="card-text"><strong>Published:</strong> ${new Date(post.thread.published).toLocaleString()}</p>
                    <p class="card-text"><strong>Sentiment:</strong> ${post.sentiment}</p>
                    <p class="card-text"><strong>Social Engagement:</strong> Likes: ${post.thread.social.facebook.likes}, Shares: ${post.thread.social.facebook.shares}, Comments: ${post.thread.social.facebook.comments}</p>
                    <a href="${post.url}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        `;

        // Append the article card to the news container
        newsContainer.appendChild(articleCard);
    });
}

// Event listener for the "Fetch News" button
document.getElementById('fetchNewsBtn').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    const sentiment = document.getElementById('sentiment').value;

    // Fetch news articles based on selected category and sentiment
    fetchNews(category, sentiment);
});
