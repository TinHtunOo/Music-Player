let audio = document.querySelector('audio');
let playBtn = document.querySelector('.fa-play');
let nextBtn =document.querySelector('.fa-forward');
let prevBtn = document.querySelector('.fa-backward');
let img = document.querySelector('img');
let currentTime = document.querySelector('.current-time');
let totalTime = document.querySelector('.total-time');
let songName = document.querySelector('h2');
let artistName = document.querySelector('h3');
let progressBar = document.querySelector('.progress-bar');
let progress = document.querySelector('.progress');
const musicInfo = [
    { song: "Blinding Lights", artist: "The Weeknd", name:"jacinto-1" },
    { song: "Levitating", artist: "Dua Lipa feat. DaBaby",name:"jacinto-2" },
    { song: "Shallow", artist: "Lady Gaga & Bradley Cooper", name:"jacinto-3" },
    { song: "Shape of You", artist: "Ed Sheeran", name:"metric-1" }
];
let index = 0;
let isPlaying = false;
// Function


function playMusic() {
    if (!isPlaying) {
        isPlaying = true
        audio.play()
        playBtn.classList.replace('fa-play', 'fa-pause');
    }else {
        isPlaying =false
        audio.pause();
        playBtn.classList.replace('fa-pause', 'fa-play')
    }
}

function loadMusic (index) {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    audio.src = `./music/${musicInfo[index].name}.mp3`;
    img.src = `./img/${musicInfo[index].name}.jpg`;
    songName.textContent = `${musicInfo[index].song}`;
    artistName.textContent = `${musicInfo[index].artist}`;
   
}

function nextMusic(){
    index++;
    if (index > musicInfo.length -1) {
        index = 0
    }
    loadMusic(index)
    progress.style.width = `0%`
}

function prevMusic(){
    index--;
    if (index < 0) {
        index = musicInfo.length -1;
    }
    loadMusic(index)
    progress.style.width = `0%`
}

function updateTotalTime() {
    let duration = this.duration;
    let totalMinute = Math.floor(duration/60)
    let totalSecond = Math.floor(duration % 60); 
    if (totalSecond < 10) {
        totalSecond = `0${totalSecond}`
    }
    totalTime.textContent = `${totalMinute}:${totalSecond}`;
    
}

function updatePrograssbar(e) {
    let duration = e.srcElement.duration;
    let currentT = e.srcElement.currentTime;
    let currentMinute = Math.floor(currentT/60)
    let currentSecond = Math.floor(currentT % 60); 
    if (currentSecond < 10) {
        currentSecond = `0${currentSecond}`
    }
    currentTime.textContent = `${currentMinute}:${currentSecond}`;
    let progressPercent = (currentT/duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function updateSongDuration(e) {
    let songDuration = (e.offsetX/this.clientWidth) * audio.duration;
    audio.currentTime = songDuration;
    // progress.style.width = `${(songDuration/audio.currentTime) * 100}%`   
}

function NextAndPlay () {
    nextMusic ()
    playMusic()
}

// Event Listeneer
playBtn.addEventListener('click', playMusic)
nextBtn.addEventListener('click',nextMusic)
prevBtn.addEventListener('click',prevMusic)
audio.addEventListener('loadedmetadata', updateTotalTime);
audio.addEventListener('timeupdate', updatePrograssbar)
progressBar.addEventListener('click', updateSongDuration);
audio.addEventListener('ended', NextAndPlay);