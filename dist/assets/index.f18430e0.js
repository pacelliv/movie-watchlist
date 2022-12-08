(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=a(e);fetch(e.href,i)}})();const p=document.getElementById("movieTitle"),c=document.getElementById("moviesList"),r=JSON.parse(localStorage.getItem("watchlist"))||[];let l=[];document.addEventListener("click",t=>{t.target.id==="searchBtn"?(c.innerHTML="",d()):t.target.dataset.imdbid&&v(t.target.dataset.imdbid)});c.innerHTML?d():c.innerHTML=`
            <div class="emptyBlock">
                <img class="filmIcon" src="./images/film-icon.png"/>
            </div>
            <p class="emptyWatchlist">Start exploring</p>
        `;function d(){fetch(`https://www.omdbapi.com/?apikey=511cf6a5&s=${p.value}&r=json`).then(t=>t.json()).then(t=>{const s=t.Search.map(o=>o.Title);[...new Set(s)].map(o=>{fetch(`https://www.omdbapi.com/?apikey=511cf6a5&t=${o}&r=json&type=movie&plot=short`).then(e=>e.json()).then(e=>{l.push(e.imdbID),m(),e.Response==="True"&&u(e)})})}).catch(t=>{c.innerHTML=`
                <p class="emptyWatchlist">Unable to find what you are looking<br>
                for. Please try another search.</p>
            `})}function u(t){const{Poster:s,Title:a,imdbRating:o,Runtime:e,Genre:i,Plot:n,imdbID:f}=t;c.innerHTML+=`
            <div class="movieContainer">
                <div>
                    <img class="moviePoster" src="${s==="N/A"?"./images/not-found.png":s}"/>
                </div>
                
                <div class="contentDetails">
                    <div class="movieTitleRating">
                        <h4 class="movieTitle">${a}</h4>
                        <p class="movieRating"><i class="fa-solid fa-star"></i> ${o}</p>
                    </div>
                    
                    <div class="movieDetails">
                        <p class="movieRunTime">${e}</p>
                        <p class="movieGenre">${i}</p>
                        <div class="addRemove">
                            <img id="addBtn" class="addBtn" data-imdbId="${f}" src="./images/add-icon.png"/>
                            <p class="movieWatchlist">Watchlist</p>
                        </div>
                    </div>
                    <p class="moviePlot">${n}</p>
                </div>
            </div>
        `}function m(){r.some(t=>{l.includes(t)&&document.querySelectorAll(".addBtn").forEach(s=>{s.dataset.imdbid===t&&(s.src="./images/checkmark-icon.png")})})}function v(t){r.indexOf(t)===-1&&r.push(t),m(),localStorage.setItem("watchlist",JSON.stringify(r))}
