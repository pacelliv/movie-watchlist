import"./modulepreload-polyfill.c7c6310f.js";let t=JSON.parse(localStorage.getItem("watchlist"))||[];const s=document.getElementById("moviesList");t.length?v():s.innerHTML=a();document.addEventListener("click",e=>{e.target.dataset.imdbid&&p(e.target.dataset.imdbid)});function v(){t.map(e=>{fetch(`https://www.omdbapi.com/?apikey=511cf6a5&i=${e}&r=json&type=movie&plot=short`).then(i=>i.json()).then(i=>r(i))})}function r(e){const{Poster:i,Title:n,imdbRating:d,Runtime:l,Genre:m,Plot:c,imdbID:o}=e;s.innerHTML+=`
            <div id=${o} class="movieContainer">
                <div>
                    <img class="moviePoster" src="${i==="N/A"?"../../images/not-found.png":i}" />
                </div>
                
                <div class="contentDetails">
                    <div class="movieTitleRating">
                        <h4 class="movieTitle">${n}</h4>
                        <p class="movieRating"><i class="fa-solid fa-star"></i> ${d}</p>
                    </div>
                    
                    <div class="movieDetails">
                        <p class="movieRunTime">${l}</p>
                        <p class="movieGenre">${m}</p>
                        <div class="addRemove">
                            <img id="removeBtn" class="addBtn" data-imdbId="${o}" src="../../images/remove-icon.png"/>
                            <p class="movieWatchlist">Remove</p>
                        </div>
                    </div>
                    <p class="moviePlot">${c}</p>
                </div>
            </div>
        `}function p(e){for(const i of s.children)e===i.id&&s.removeChild(i);t=t.filter(i=>i!==e),localStorage.setItem("watchlist",JSON.stringify(t)),t.length===0&&(s.innerHTML=a())}function a(){return`
        <p class="emptyWatchlist">Your watchlist is looking a little empty...</p>
        <div class="emptyBlock">
            <a href="../../index.html"><img class="addBtnEmpty" src="../../images/add-icon.png"/></a>
            <p>Let's add some movies!</p>
        </div>
    `}
