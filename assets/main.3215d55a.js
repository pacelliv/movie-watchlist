import"./index.7a991a0b.js";const v=document.getElementById("movieTitle"),a=document.getElementById("moviesList"),o=JSON.parse(localStorage.getItem("watchlist"))||[];let c=[];document.addEventListener("click",e=>{e.target.id==="searchBtn"?(a.innerHTML="",l()):e.target.dataset.imdbid&&g(e.target.dataset.imdbid)});a.innerHTML?l():a.innerHTML=`
            <div class="emptyBlock">
                <img class="filmIcon" src="./images/film-icon.png"/>
            </div>
            <p class="emptyWatchlist">Start exploring</p>
        `;function l(){fetch(`https://www.omdbapi.com/?apikey=511cf6a5&s=${v.value}&r=json`).then(e=>e.json()).then(e=>{const i=e.Search.map(s=>s.Title);[...new Set(i)].map(s=>{fetch(`https://www.omdbapi.com/?apikey=511cf6a5&t=${s}&r=json&type=movie&plot=short`).then(t=>t.json()).then(t=>{c.push(t.imdbID),d(),t.Response==="True"&&h(t)})})}).catch(e=>{a.innerHTML=`
                <p class="emptyWatchlist">Unable to find what you are looking<br>
                for. Please try another search.</p>
            `})}function h(e){const{Poster:i,Title:n,imdbRating:s,Runtime:t,Genre:m,Plot:r,imdbID:p}=e;a.innerHTML+=`
            <div class="movieContainer">
                <div>
                    <img class="moviePoster" src="${i==="N/A"?"./images/not-found.png":i}"/>
                </div>
                
                <div class="contentDetails">
                    <div class="movieTitleRating">
                        <h4 class="movieTitle">${n}</h4>
                        <p class="movieRating"><i class="fa-solid fa-star"></i> ${s}</p>
                    </div>
                    
                    <div class="movieDetails">
                        <p class="movieRunTime">${t}</p>
                        <p class="movieGenre">${m}</p>
                        <div class="addRemove">
                            <img id="addBtn" class="addBtn" data-imdbId="${p}" src="./images/add-icon.png"/>
                            <p class="movieWatchlist">Watchlist</p>
                        </div>
                    </div>
                    <p class="moviePlot">${r}</p>
                </div>
            </div>
        `}function d(){o.some(e=>{c.includes(e)&&document.querySelectorAll(".addBtn").forEach(i=>{i.dataset.imdbid===e&&(i.src="./images/checkmark-icon.png")})})}function g(e){o.indexOf(e)===-1&&o.push(e),d(),localStorage.setItem("watchlist",JSON.stringify(o))}
