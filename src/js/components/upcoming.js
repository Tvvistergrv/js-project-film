// import {fetchData} from '../api/fetchUpcoming'
const BASE_URL = 'https://api.themoviedb.org/3/';
const END_POINT = 'movie/upcoming';
const API_KEY = 'api_key=bd0a4499e3f0b036025d12595397227a';


// const upcomingList = document.querySelector('.js-upcoming')
// const addLibrary = document.querySelector('.js-add-library')


// async function fetchData() {
//     try {
        
//       const response = await fetch(`${BASE_URL}${END_POINT}?${API_KEY}`);
//       return await response.json();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
//   fetchData()
//   .then(data => upcomingList.insertAdjacentHTML('beforeend', createMarkup(data.results)));
  
// function createMarkup(arr) {
//     return arr.map(
//         ({
//         poster_path,
//         title,
//         release_date,
//         popularity,
//         vote_average,
//         vote_count,
//         genre_ids,
//         overview
//     }) => 
//     `
//     <div class ="wrap">
//   <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title} loading="lazy">
//     </div>
//     <div class ="cardFilm">  
//     <span class="info-item-film>${title}</span>
//       <p class="info-item"><b>release_date</b>${release_date}</p>
//       <p class="info-item"><b>popularity</b>${popularity}</p>
//       <p class="info-item"><b>vote_average</b>${vote_average}</p>
//       <p class="info-item"><b>vote_count</b>${vote_count}</p>
//       <p class="info-item"><b>vote_count</b>${genre_ids}</p>
//       <p class="info-item"><b>about</b>${overview}</p>
//       </div>
//     `
//     ).join('');
// }
// // "elva-fairy-320w.jpg 320w,
// //              elva-fairy-480w.jpg 480w,
// //              elva-fairy-800w.jpg 800w"
// //      sizes="(max-width: 320px) 280px,
// //             (max-width: 480px) 440px,
// //             800px"
// //      src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">


const ulRef = document.querySelector('.js-upcoming');
const btnRef = document.querySelector('.js-add-library');

// WORKSPACE

window.addEventListener('load', onPageLoad);

//LISTENER

function onPageLoad() {
  fetchMovieDetails(END_POINT, options).then(movieData => {
    const markup = generateMarkup(movieData);
    addMarkup(ulRef, markup);
  });
}
// FETCH
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDBhNDQ5OWUzZjBiMDM2MDI1ZDEyNTk1Mzk3MjI3YSIsInN1YiI6IjY0N2YxZDM3Y2FlZjJkMDEzNjJjZDBjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.04GEOyHwNXnOZB4gUWNaiyPlLlOZ0z9Ttfl7T5UFMuk',
    },
  };

async function fetchData(END_POINT, options) {
const response = await fetch(`https:api.themoviedb.org/3/${END_POINT}`, options);
  const data = await response.json();
  return data.results[0];
}

async function fetchGenres(options) {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    options
  );
  const data = await response.json();
  return data.genres;
}

async function fetchMovieDetails(END_POINT, options) {
  const movieData = await fetchData(END_POINT, options);
  const genreData = await fetchGenres(options);
  console.log(movieData);
  const transformedData = transformData(movieData, genreData);
  return transformedData;
}
// MARKUP

function renderMarkup(movieData) {
  return fetchGenres(options).then(genreData => {
    const transformedData = transformData(movieData, genreData);

    return generateMarkup(transformedData);
  });
}

function generateMarkup(movie) {
  console.log(movie);

  const markup = `<div class="movie-card">
  <img src="https://image.tmdb.org/t/p/w500/${movie.poster}" alt="${movie.title}" class="movie-poster">
  </div>
  <div>
  <p>${movie.release_date}</p>
  <p>${movie.popularity}</p>
  <p>${movie.vote}</p>
  <p>${movie.vote_count}</p>
  <p>${movie.genreFirst},${movie.genreSecond}</p>
  <div class="movie-details">
    <h2 class="movie-title">${movie.title}</h2>
    <p class="movie-genres"></p>
    <p>${movie.about}</p>

  </div>
</div>`;

  return markup;
}

function addMarkup(element, markup) {
  element.innerHTML = markup;
  console.log(markup)
}

function transformData(movieData, genreData) {
  const movie = movieData;
  const genreIds = movie.genre_ids;
  const genres = genreIds.map(id => genreData.find(genre => genre.id === id).name);

  return {
    popularity: Math.floor(movie.popularity),

    vote: movie.vote_average,
    vote_count: movie.vote_count,
    about: movie.overview,
    release_date: movie.release_date,
    id: movie.id,
    title: movie.title,
    poster: movie.backdrop_path,
    genreFirst: genres[0],
    genreSecond: genres[1],
  };
}