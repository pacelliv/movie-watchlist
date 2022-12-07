const inputEl = document.getElementById("movieTitle")
const movieEl = document.getElementById("moviesList")
const watchList = JSON.parse(localStorage.getItem("watchlist")) || []

document.getElementById("searchBtn").addEventListener("click", () => {
    movieEl.innerHTML = ""
    getMovies()
})

// render a message if no movie has been searched
movieEl.innerHTML
    ? getMovies()
    : (movieEl.innerHTML = `
            <div class="emptyBlock">
                <img class="filmIcon" src="./images/film-icon.png"/>
            </div>
            <p class="emptyWatchlist">Start exploring</p>
        `)

//gets the movies data from the API
function getMovies() {
    fetch(`https://www.omdbapi.com/?apikey=511cf6a5&s=${inputEl.value}&r=json`)
        .then((res) => res.json())
        .then((movies) => {
            const titles = movies.Search.map((movie) => movie.Title) //creates an array of titles
            const moviesTitles = [...new Set(titles)] //creates a new instance of titles without the duplicates
            moviesTitles.map((title) => {
                fetch(
                    `https://www.omdbapi.com/?apikey=511cf6a5&t=${title}&r=json&type=movie&plot=short`
                )
                    .then((res) => res.json())
                    .then((details) => {
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

//render the HTML to the DOM
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

document.addEventListener("click", (e) => {
    if (e.target.dataset.imdbid) addMovie(e.target.dataset.imdbid)
})

//add movie to My Watchlist
function addMovie(id) {
    if (watchList.indexOf(id) === -1) watchList.push(id) // verifies if the movie is already stored in watchList array
    document.querySelectorAll(".addBtn").forEach((button) => {
        if (button.dataset.imdbid === id) {
            button.disabled = true
            button.src = "./images/checkmark-icon.png"
        }
    })
    localStorage.setItem("watchlist", JSON.stringify(watchList)) //add movie to localStorage
}
