let watchList = JSON.parse(localStorage.getItem("watchlist")) || []
const movieEl = document.getElementById("moviesList")

watchList.length ? getMovies() : (movieEl.innerHTML = getMessageHtml())

function getMovies() {
    watchList.map((id) => {
        fetch(
            `https://www.omdbapi.com/?apikey=511cf6a5&i=${id}&r=json&type=movie&plot=short`
        )
            .then((res) => res.json())
            .then((details) => getMoviesHtml(details))
    })
}

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

document.addEventListener("click", (e) => {
    if (e.target.dataset.imdbid) removeMovie(e.target.dataset.imdbid)
})

// this function remove movie from the DOM and from localstorage
function removeMovie(element) {
    for (const movie of movieEl.children) {
        console.log(movie)
        if (element === movie.id) {
            movieEl.removeChild(movie)
        }
    }
    // // deletes an specific element from the watchList array
    watchList = watchList.filter((item) => item !== element)
    console.log(watchList)
    // //updates localStorage
    localStorage.setItem("watchlist", JSON.stringify(watchList))
    if (watchList.length === 0) {
        movieEl.innerHTML = getMessageHtml()
    }
}

function getMessageHtml() {
    return `
        <p class="emptyWatchlist">Your watchlist is looking a little empty...</p>
        <div class="emptyBlock">
            <a href="../../index.html"><img class="addBtnEmpty" src="../../images/add-icon.png"/></a>
            <p>Let's add some movies!</p>
        </div>
    `
}
