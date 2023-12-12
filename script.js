const menu = document.querySelector(' nav .fa-bars');
const sideMenu = document.querySelector('.side-menu');
const sidebar = document.querySelector('.side-display');

const overlay = document.querySelector('.overlay-container');

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const videoCardContainer = document.querySelector('.video-card-container');

let apiKey ="AIzaSyCG4J2zPx1rr9YZkyfvEIJlXnymz0pDOqM";
let videoHttp ="https://www.googleapis.com/youtube/v3/videos?";
let channeHttp ="https://www.googleapis.com/youtube/v3/channels?";
let searchLink = "https://www.youtube.com/results?search_query=";


fetch(videoHttp + new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item)
    });
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channeHttp + new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video-container" onclick="location.href = 'https://www.youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}"
        alt="" class="thumbnail">
    <div class="channel-container div-flex">
        <div class="channel-logo"><img
                src="${data.channelThumbnail}"
                alt=""></div>
        <div class="video-details">
            <div class="title">${data.snippet.title}</div>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
    `;
}

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

menu.addEventListener('click', function(){
    sidebar.classList.toggle("side-display-block");
    overlay.classList.toggle('overlay');
});

sideMenu.addEventListener('click', function(){
    sidebar.classList.toggle("side-display-block");
    overlay.classList.toggle('overlay');
})