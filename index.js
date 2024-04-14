const moviesArray = []

document.getElementById('search-form').addEventListener('submit', getSearchInput)

async function getSearchInput(e){

  e.preventDefault()

  const searchInput = document.getElementById('search-input').value

  const res = await fetch(`https://www.omdbapi.com/?apikey=adf1f2d7&s=${searchInput}`)
  const data = await res.json()
  // console.log(data.Search)
  const fetchPromises = data.Search.map(async (movie) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=adf1f2d7&t=${movie.Title}`)
    const data =  await res.json()
    const movieObj = {
      title: `${data.Title}`,
      rating: `${data.imdbRating}`,
      runtime: `${data.Runtime}`,
      genre: `${data.Genre}`,
      plot: `${data.Plot}`,
      poster: `${data.Poster}`
    }
    return movieObj
  })
  const resolvedPromises = await Promise.all(fetchPromises)
  moviesArray.push(...resolvedPromises)
  renderMovies()
}

function renderMovies() {
 const moviesHtml = moviesArray.map(movie =>
    `<div class="movie-card">
      <img src="${movie.poster}" alt="">
      <div>
        <div class="movie-card-top">
          <h2>${movie.title}</h2>
          <p>⭐️ ${movie.rating}</p>
        </div>
      <div class="movie-card-mid">
        <p>${movie.runtime}</p>
        <p>${movie.genre}</p>
      </div>
      <p>${movie.plot}</p>
    </div>
  </div>`
  ).join('')
  document.getElementById('movies-container').innerHTML = moviesHtml
}
