const inputEl = document.getElementById("movieTitle")
const movieEl = document.getElementById("moviesList")
const watchList = JSON.parse(localStorage.getItem("watchlist")) || []
let searchedMovies = []

document.addEventListener("click", (e) => {
    if (e.target.id === "searchBtn") {
        movieEl.innerHTML = ""
        getMovies()
    } else if (e.target.dataset.imdbid) {
        addMovie(e.target.dataset.imdbid)
    }
})

// render a message to the DOM if no movie has been searched
movieEl.innerHTML
    ? getMovies()
    : (movieEl.innerHTML = `
            <div class="emptyBlock">
                <img class="filmIcon" src="./images/film-icon.png"/>
            </div>
            <p class="emptyWatchlist">Start exploring</p>
        `)

/* getMovies:
Makes call for movie data to the OMBd API */
function getMovies() {
    fetch(`https://www.omdbapi.com/?apikey=511cf6a5&s=${inputEl.value}&r=json`) // Make GET request by name to the API, and get the movies ID
        .then((res) => res.json())
        .then((movies) => {
            const titles = movies.Search.map((movie) => movie.Title) //creates an array of titles
            const moviesTitles = [...new Set(titles)] //creates a new instance of titles without the duplicates
            moviesTitles.map((title) => {
                // Using the movie IDs from the first fetch, gets movie data
                fetch(
                    `https://www.omdbapi.com/?apikey=511cf6a5&t=${title}&r=json&type=movie&plot=short`
                )
                    .then((res) => res.json())
                    .then((details) => {
                        searchedMovies.push(details.imdbID)
                        checkLocalStorage()
                        if (details.Response === "True") getMoviesHtml(details)
                    })
            })
        })
        .catch((err) => {
            movieEl.innerHTML = `
                <p class="emptyWatchlist">Unable to find what you are looking<br>
                for. Please try another search.</p>
            `
        })
}

/* getMoviesHtml:
Generates HTML string using the movies details passed from getMovies() */
function getMoviesHtml(details) {
    const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = details
    movieEl.innerHTML += `
            <div class="movieContainer">
                <div>
                    <img class="moviePoster" src="${
                        Poster === "N/A" ? "./images/not-found.png" : Poster
                    }"/>
                </div>
                
                <div class="contentDetails">
                    <div class="movieTitleRating">
                        <h4 class="movieTitle">${Title}</h4>
                        <p class="movieRating"><i class="fa-solid fa-star"></i> ${imdbRating}</p>
                    </div>
                    
                    <div class="movieDetails">
                        <p class="movieRunTime">${Runtime}</p>
                        <p class="movieGenre">${Genre}</p>
                        <div class="addRemove">
                            <img id="addBtn" class="addBtn" data-imdbId="${imdbID}" src="./images/add-icon.png"/>
                            <p class="movieWatchlist">Watchlist</p>
                        </div>
                    </div>
                    <p class="moviePlot">${Plot}</p>
                </div>
            </div>
        `
}

/* checkLocalStorage:
If the searched movie is already in localStorage, then the add icon is turned
into an checkmark */
function checkLocalStorage() {
    watchList.some((element) => {
        if (searchedMovies.includes(element)) {
            document.querySelectorAll(".addBtn").forEach((button) => {
                if (button.dataset.imdbid === element) {
                    button.src = "./images/checkmark-icon.png"
                }
            })
        }
    })
}

/* addMovie:
Receive the id of the selected movie and stored it in localStorage */
function addMovie(id) {
    if (watchList.indexOf(id) === -1) watchList.push(id) // verifies if the movie is already stored in watchList array
    checkLocalStorage()
    localStorage.setItem("watchlist", JSON.stringify(watchList)) //add movie to localStorage
}
