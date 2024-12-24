const apiKey = 'ce842fec'; // Replace with your OMDB API key
const moviesContainer = document.getElementById('moviesContainer');
const movieModal = document.getElementById('movieModal');
const movieDetails = document.getElementById('movieDetails');
const closeModal = document.getElementById('closeModal');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

async function fetchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&type=movie&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Response === 'True') {
            renderMovies(data.Search);
        } else {
            moviesContainer.innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function renderMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.map(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button onclick="viewMovieDetails('${movie.imdbID}')">View More</button>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

async function viewMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
        const details = await response.json();
        movieDetails.innerHTML = `
            <h2>${details.Title} (${details.Year})</h2>
            <img src="${details.Poster}" alt="${details.Title}" style="width: 100%;">
            <p><strong>Genre:</strong> ${details.Genre}</p>
            <p><strong>Director:</strong> ${details.Director}</p>
            <p><strong>Actors:</strong> ${details.Actors}</p>
            <p><strong>Plot:</strong> ${details.Plot}</p>
            <p><strong>IMDB Rating:</strong> ${details.imdbRating}</p>
        `;
        movieModal.style.display = 'flex';
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

closeModal.addEventListener('click', () => {
    movieModal.style.display = 'none';
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    }
});