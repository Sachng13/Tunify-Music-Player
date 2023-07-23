
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let song_poster_playing = document.getElementById("song-poster-playing");
let playing_song_name = document.getElementById("playing-song-name");
let playing_song_artist = document.getElementById("playing-song-artist");


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
       Name:"Cheap Thrills",
       Artist:"Sia",
       Poster:"files/Music/queue1.jpg",
       music : "files/Music/queue1.mp3"
    },
    {
        Name:"Attention",
       Artist:"Charlie Puth",
       Poster:"files/Music/queue2.jpg",
       music : "files/Music/queue2.mp3"
    },
    {
        Name:"7 Rings",
       Artist:"Ariana Grande",
       Poster:"files/Music/queue3.jpg",
       music : "files/Music/queue3.mp3"
    },
    {
       Name:"Cheques",
       Artist:"Shubh",
       Poster:"files/Music/queue4.jpg",
       music : "files/Music/queue4.mp3"
    },
    {
        Name:"Peaches",
       Artist:"Justin Bieber",
       Poster:"files/Music/queue5.jpg",
       music : "files/Music/queue5.mp3"
    },
    {
        Name:"Janiye",
       Artist:"Vishal Mishra",
       Poster:"files/Music/queue6.jpg",
       music : "files/Music/queue6.mp3"
    },
    {
        Name:"Sugar",
       Artist:"Maroon 5",
       Poster:"files/Music/queue7.jpg",
       music : "files/Music/queue7.mp3"
    },
    {
        Name:"We're Good",
       Artist:"Dua Lipa",
       Poster:"files/Music/queue8.jpg",
       music : "files/Music/queue8.mp3"
    },
    {
        Name:"Shape Of You",
       Artist:"Ed Sheeran",
       Poster:"files/Music/queue9.jpg",
       music : "files/Music/queue9.mp3"
    },
    {
        Name:"Roar",
       Artist:"Katy Perry",
       Poster:"files/Music/queue10.jpg",
       music : "files/Music/queue10.mp3"
    },
    {
        Name:"Perfect",
       Artist:"Ed Sheeran",
       Poster:"files/Music/queue11.jpg",
       music : "files/Music/queue11.mp3"
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    song_poster_playing.src= music_list[track_index].Poster;
    playing_song_name.innerHTML = music_list[track_index].Name;
    playing_song_artist.innerHTML = music_list[track_index].Artist;


    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.remove('randomActive');
}
function pauseRandom(){
    isRandom = false;

    randomIcon.classList.add('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x randomActive"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x randomActive"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}