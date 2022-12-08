import"./modulepreload-polyfill.c7c6310f.js";let e=JSON.parse(localStorage.getItem("watchlist"))||[];const s=document.getElementById("moviesList");e.length?v():s.innerHTML=o();document.addEventListener("click",t=>{t.target.dataset.imdbid&&p(t.target.dataset.imdbid)});function v(){e.map(t=>{fetch(`https://www.omdbapi.com/?apikey=511cf6a5&i=${t}&r=json&type=movie&plot=short`).then(i=>i.json()).then(i=>r(i))})}function r(t){const{Poster:i,Title:n,imdbRating:l,Runtime:m,Genre:c,Plot:d,imdbID:a}=t;s.innerHTML+=`
            <div id=${a} class="movieContainer">
                <div>
                    <img class="moviePoster" src="${i==="N/A"?"../../images/not-found.png":i}" />
                </div>
                
                <div class="contentDetails">
                    <div class="movieTitleRating">
                        <h4 class="movieTitle">${n}</h4>
                        <p class="movieRating"><i class="fa-solid fa-star"></i> ${l}</p>
                    </div>
                    
                    <div class="movieDetails">
                        <p class="movieRunTime">${m}</p>
                        <p class="movieGenre">${c}</p>
                        <div class="addRemove">
                            <img id="removeBtn" class="addBtn" data-imdbId="${a}" src="../../images/remove-icon.png"/>
                            <p class="movieWatchlist">Remove</p>
                        </div>
                    </div>
                    <p class="moviePlot">${d}</p>
                </div>
            </div>
        `}function p(t){for(const i of s.children)t===i.id&&s.removeChild(i);e=e.filter(i=>i!==t),localStorage.setItem("watchlist",JSON.stringify(e)),e.length===0&&(s.innerHTML=o())}function o(){return`
        <p class="emptyWatchlist">Your watchlist is looking a little empty...</p>
        <div class="emptyBlock">
            <a href="../../index.html"><img class="addBtnEmpty" src="../../images/add-icon.png"/></a>
            <p>Let's add some movies!</p>
        </div>
    `}
