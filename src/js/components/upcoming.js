// import {fetchData} from '../api/fetchUpcoming'
const BASE_URL = 'https://api.themoviedb.org/3/';
const END_POINT_UPCOMING = 'movie/upcoming';
const END_POINT_GENRE = 'genre/movie/list?language=en';
const API_KEY = 'api_key=bd0a4499e3f0b036025d12595397227a';


const upcomingList = document.querySelector('.js-upcoming')
const addLibrary = document.querySelector('.js-add-library')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDBhNDQ5OWUzZjBiMDM2MDI1ZDEyNTk1Mzk3MjI3YSIsInN1YiI6IjY0N2YxZDM3Y2FlZjJkMDEzNjJjZDBjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.04GEOyHwNXnOZB4gUWNaiyPlLlOZ0z9Ttfl7T5UFMuk',
  },
};

async function fetchGenres() {
  try {
    const response = await fetch(`${BASE_URL}${END_POINT_GENRE}`, options);
    const data = await response.json();

    return data.genres;
  } catch (error) {
    console.log(error.message);
  }
}


async function fetchData() {
  try { 
    const response = await fetch(`${BASE_URL}${END_POINT_UPCOMING}`, options);
    const data = await response.json();

    return data.results[Math.floor(Math.random()*data.results.length)];
  } catch (error) {
    console.log(error.message);
  }
}


async function fetchMovieDetails() {
  const movie = await fetchData();
  const genreData = await fetchGenres();

  movie.genres = movie.genre_ids.map(id => genreData.find(genre => genre.id === id).name).join(', ');
  

  return movie;
}
  
function createMarkup(movie) {
    return `
    <div class ="cardFilm">
    <div class ="wrap">
  <img class = "img-upcoming" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} loading="lazy">
        
    <p class="movie-name">${movie.title}</p>
    </div>
    <div class ="info-film">
      <p class="info-item">Release_date</p>
      <p class="info-item">Popularity</p>
      <p class="info-item">Vote / Votes</p>
      <p class="info-item">Genre</p>
      <p class="info-item color-releas">${movie.release_date}</p>
      <p class="info-item">${Math.floor(movie.popularity, -1)}</p>
      <div сlass = vote-votes>
      <p class="info-item vote-style">${movie.vote_average} / ${movie.vote_count}</p>
      </div>
      <p class="info-item genre-style">${movie.genres}</p>
    </div>
    <p class="header-about">ABOUT</p>
    <p class="movie-overview">${movie.overview}</p>
        `;
}

window.addEventListener('load', onPageLoad);

//LISTENER

function onPageLoad() {
  fetchMovieDetails().then(movie => {
    upcomingList.insertAdjacentHTML('beforeend', createMarkup(movie));
  });
}



// function transformData(movieData, genreData) {
//   const movie = movieData;
//   const genreIds = movie.genre_ids;
//   


// "elva-fairy-320w.jpg 320w,
//              elva-fairy-480w.jpg 480w,
//              elva-fairy-800w.jpg 800w"
//      sizes="(max-width: 320px) 280px,
//             (max-width: 480px) 440px,
//             800px"
//      src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">


// const ulRef = document.querySelector('.js-upcoming');
// const btnRef = document.querySelector('.js-add-library');

// // WORKSPACE

// window.addEventListener('load', onPageLoad);

// //LISTENER

// function onPageLoad() {
//   fetchMovieDetails(END_POINT, options).then(movieData => {
//     const markup = generateMarkup(movieData);
//     addMarkup(ulRef, markup);
//   });
// }
// // FETCH


// async function fetchData(END_POINT, options) {
// const response = await fetch(`https:api.themoviedb.org/3/${END_POINT}`, options);
//   const data = await response.json();
//   return data.results[0];
// }

// async function fetchGenres(options) {
//   const response = await fetch(
//     'https://api.themoviedb.org/3/genre/movie/list?language=en',
//     options
//   );
//   const data = await response.json();
//   return data.genres;
// }

// async function fetchMovieDetails(END_POINT, options) {
//   const movieData = await fetchData(END_POINT, options);
//   const genreData = await fetchGenres(options);
//   console.log(movieData);
//   const transformedData = transformData(movieData, genreData);
//   return transformedData;
// }
// // MARKUP

// function renderMarkup(movieData) {
//   return fetchGenres(options).then(genreData => {
//     const transformedData = transformData(movieData, genreData);

//     return generateMarkup(transformedData);
//   });
// }

// function generateMarkup(movie) {
//   console.log(movie);

//   const markup = `<div class="movie-card">
//   <img src="https://image.tmdb.org/t/p/w500/${movie.poster}" alt="${movie.title}" class="movie-poster">
//   </div>
//   <div>
//   <p>${movie.release_date}</p>
//   <p>${movie.popularity}</p>
//   <p>${movie.vote}</p>
//   <p>${movie.vote_count}</p>
//   <p>${movie.genreFirst},${movie.genreSecond}</p>
//   <div class="movie-details">
//     <h2 class="movie-title">${movie.title}</h2>
//     <p class="movie-genres"></p>
//     <p>${movie.about}</p>

//   </div>
// </div>`;

//   return markup;
// }

// function addMarkup(element, markup) {
//   element.innerHTML = markup;
//   console.log(markup)
// }



//   return {
//     popularity: Math.floor(movie.popularity),

//     vote: movie.vote_average,
//     vote_count: movie.vote_count,
//     about: movie.overview,
//     release_date: movie.release_date,
//     id: movie.id,
//     title: movie.title,
//     poster: movie.backdrop_path,
//     genreFirst: genres[0],
//     genreSecond: genres[1],
//   };
// }


{/* <p class="movie-name">${movie.title}</p>
<p class="info-item"><b>release_date</b>${movie.release_date}</p>
<p class="info-item"><b>popularity</b>${movie.popularity}</p>
<p class="info-item"><b>vote_average</b>${movie.vote_average} / ${movie.vote_count}</p>
<p class="info-item"><b>vote_count</b>${movie.vote_count}</p>
<p class="info-item"><b>genre</b>${movie.genres}</p>
<p class="info-item"><b>about</b>${movie.overview}</p> */}