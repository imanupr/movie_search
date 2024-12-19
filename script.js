const apiKey = '7fc7954b'; // Replace with your OMDb API key

async function fetchMovieDetails() {
    const movieName = document.getElementById('movie-name').value;
    const errorMessage = document.getElementById('error-message');
    const movieDetails = document.getElementById('movie-details');

    // Clear previous results and error message
    movieDetails.style.display = 'none';
    errorMessage.style.display = 'none';
    movieDetails.innerHTML = '';

    if (movieName.trim() === '') {
        alert('Please enter a movie name!');
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === 'False') {
            errorMessage.style.display = 'block';
        } else {
            movieDetails.style.display = 'block';
            movieDetails.innerHTML = `
                <h2>${data.Title} (${data.Year})</h2>
                <img src="${data.Poster}" alt="${data.Title} Poster" />
                <p><strong>Plot:</strong> ${data.Plot}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching data from OMDb API:', error);
        alert('Something went wrong. Please try again later.');
    }
}
