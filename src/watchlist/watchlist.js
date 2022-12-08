let watchList = JSON.parse(localStorage.getItem("watchlist")) || []
const movieEl = document.getElementById("moviesList")

watchList.length ? getMovies() : (movieEl.innerHTML = getMessageHtml())

document.addEventListener("click", (e) => {
    if (e.target.dataset.imdbid) removeMovie(e.target.dataset.imdbid)
})

/* getMovies:
Makes call for movie data to the OMBd API using the movie IDs stored in localStorage */
function getMovies() {
    watchList.map((id) => {
        fetch(
            `https://www.omdbapi.com/?apikey=511cf6a5&i=${id}&r=json&type=movie&plot=short`
        )
            .then((res) => res.json())
            .then((details) => getMoviesHtml(details))
    })
}

/* getMoviesHtml:
Generates HTML string using the movies details passed from getMovies() */
function getMoviesHtml(details) {
    const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = details
    movieEl.innerHTML += `
            <div id=${imdbID} class="movieContainer">
                <div>
                    <img class="moviePoster" src="${
                        Poster === "N/A" ? "../../images/not-found.png" : Poster
                    }" />
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
                            <img id="removeBtn" class="addBtn" data-imdbId="${imdbID}" src="../../images/remove-icon.png"/>
                            <p class="movieWatchlist">Remove</p>
                        </div>
                    </div>
                    <p class="moviePlot">${Plot}</p>
                </div>
            </div>
        `
}

/* removeMovie:
removes a movie from the DOM and from localstorage */
function removeMovie(element) {
    for (const movie of movieEl.children) {
        if (element === movie.id) {
            movieEl.removeChild(movie)
        }
    }

    watchList = watchList.filter((item) => item !== element) // deletes an specific element from the watchList array
    localStorage.setItem("watchlist", JSON.stringify(watchList)) //updates localStorage
    if (watchList.length === 0) {
        movieEl.innerHTML = getMessageHtml()
    }
}

/* getMessageHtml: 
Render a message to the DOM if no movie has been searched */
function getMessageHtml() {
    return `
        <p class="emptyWatchlist">Your watchlist is looking a little empty...</p>
        <div class="emptyBlock">
            <a href="../../index.html"><img class="addBtnEmpty" src="../../images/add-icon.png"/></a>
            <p>Let's add some movies!</p>
        </div>
    `
}
