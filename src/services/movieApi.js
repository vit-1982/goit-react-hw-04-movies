const baseUrl = "https://api.themoviedb.org/3";
const api_key = "fa99029049f2a861590b7b15ea037cf3";

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>> // запрос популярных
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>> // запрос деталей фильма по id
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false // запрос по query
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>> // Cast
// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>> // Reviews
// https://image.tmdb.org/t/p/w500/ // Image path

const fetchHomePage = () => {
  return fetch(`${baseUrl}/trending/movie/day?api_key=${api_key}`).then((res) =>
    res.json().then((entries) => entries.results)
  );
};

const fetchMovieDetails = (movieId) => {
  return fetch(`${baseUrl}/movie/${movieId}?api_key=${api_key}`).then((res) =>
    res.json()
  );
};

const fetchMovieWithQuery = (searchQuery) => {
  return fetch(
    `${baseUrl}/search/movie?api_key=${api_key}&query=${searchQuery}`
  )
    .then((res) => res.json())
    .then((entries) => entries.results);
};

const fetchMovieCast = (movieId) => {
  return fetch(
    `${baseUrl}/movie/${movieId}/credits?api_key=${api_key}`
  ).then((res) => res.json());
};

const fetchMovieReviews = (movieId) => {
  return fetch(
    `${baseUrl}/movie/${movieId}/reviews?api_key=${api_key}`
  ).then((res) => res.json());
};

const movieAPI = {
  fetchMovieWithQuery,
  fetchMovieDetails,
  fetchHomePage,
  fetchMovieCast,
  fetchMovieReviews,
};

export default movieAPI;
