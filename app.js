const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const latest = document.getElementById('latest');

getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    
    showMovies(respData.results);
}

function showMovies(movies){

    main.innerHTML=``;

    movies.forEach(movie =>{
        if(movie.poster_path!==null){
            const movieEl = document.createElement("div");
            movieEl.classList.add("movies");
            movieEl.innerHTML = `
                <img src="${IMGPATH+movie.poster_path}" alt="movie-img">
                <div class="movie-in">
                    <h5>${movie.title}</h5>
                    <span class=${getColor(movie.vote_average)}>${movie.vote_average}</span>
                </div>
                <div class="overview">
                    ${movie.overview}
                </div>`;
            main.appendChild(movieEl);
        }
    });
}

function getColor(num){
    if(num>=7.8){
        return "green";
    }else{
        return "orange";
    }
}

latest.addEventListener('click', ()=>{
    getMovies(APIURL);
})


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name = search.value;
    if(name){
        getMovies(SEARCHAPI + name);
    }
    search.value='';
});
