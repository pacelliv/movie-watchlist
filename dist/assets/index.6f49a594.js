(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d=document.getElementById("searchBtn"),m=document.getElementById("movieTitle"),c=document.getElementById("moviesList");JSON.parse(localStorage.getItem("watchlist"));d.addEventListener("click",()=>{c.innerHTML="",a()});c.innerHTML?a():c.innerHTML=`
            <div class="emptyBlock">
                <img class="filmIcon" src="./images/film-icon.png"/>
            </div>
            <p class="emptyWatchlist">Start exploring</p>
        `;function a(){fetch(`https://www.omdbapi.com/?apikey=511cf6a5&s=${m.value}&r=json`).then(o=>o.json()).then(o=>{const i=o.Search.map(s=>s.Title);[...new Set(i)].map(s=>{fetch(`https://www.omdbapi.com/?apikey=511cf6a5&t=${s}&r=json&type=movie&plot=short`).then(e=>e.json()).then(e=>{e.Response==="True"&&p(e)})})}).catch(o=>{c.innerHTML=`
                <p class="emptyWatchlist">Unable to find what you are looking<br>
                for. Please try another search.</p>
            `})}function p(o){const{Poster:i,Title:r,imdbRating:s,Runtime:e,Genre:t,Plot:n,imdbID:l,watchId:f}=o;c.innerHTML+=`
            <div class="movieContainer">
                <div>
                    <img class="moviePoster" src="${i==="N/A"?"./images/not-found.png":i}"/>
                </div>
                
                <div class="contentDetails">
                    <div class="movieTitleRating">
                        <h4 class="movieTitle">${r}</h4>
                        <p class="movieRating"><i class="fa-solid fa-star"></i> ${s}</p>
                    </div>
                    
                    <div class="movieDetails">
                        <p class="movieRunTime">${e}</p>
                        <p class="movieGenre">${t}</p>
                        <div class="addRemove">
                            <img id="${l}" class="addBtn" onclick="addMovie(${l})" src="./images/add-icon.png"/>
                            <p class="movieWatchlist">Watchlist</p>
                        </div>
                    </div>
                    <p class="moviePlot">${n}</p>
                </div>
            </div>
        `}
