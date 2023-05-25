//Code to pause/play song in set intervals
//Global Variables
let song
let stopTime = 2000
let guessTracker = 1
let response
let answer
let rank
let songData
//Functions
const loadRandSong = async () => {
    //load song track 
    response = await axios.get('https://api.deezer.com/playlist/3155776842')
    rank = Math.floor((Math.random()*99))
    song = new Audio(response.data.tracks.data[rank].preview)

    console.log(response.data.tracks.data[rank].title)
    answer = response.data.tracks.data[rank].title_short
    //retrieve necessary data from song
    let { title_short, link, duration, artist, album, id } = response.data.tracks.data[rank];
    let artistName = artist.name
    let albumTitle = album.title
    let albumArt = album.cover_medium

    let trackResponse = await axios.get(`https://api.deezer.com/track/${id}`)
    let releaseDate = trackResponse.data.release_date
    songData = [title_short, link, duration, artistName, albumTitle, albumArt, rank, releaseDate]

    song.addEventListener('timeupdate', updateProgressBar)
}

const playSong = async () => {
    //random integer to be passed into tracks.data[random]. For now hard-coded for testing
    //await song.fastSeek(20)
    await song.play()
    setTimeout(() => song.pause(), stopTime)
    song.currentTime = 0
    //setTimeout(() => song.play(), 10000)
}

const addTime = () => {
    if(guessTracker<7) 
    {
        stopTime+=2000
        let rect = document.querySelector(`#guess-${guessTracker}`)
        rect.style.backgroundColor = '#FFFFFF'
        guessTracker++
    }
    else updateFeedbackBox(3)
}

const updateFeedbackBox = (num) => {
    let headphones = document.querySelector(".gg-headset")
    let stats = document.querySelector(".song-info")
    let result = document.querySelector('.result')

    switch(num){
        case 1:
            headphones.style.opacity = 0.1
            stats.style.opacity = 1
            result.innerText='Nice!'
            updateSongStats()
            break;
        case 2:
            headphones.style.opacity = 1
            stats.style.opacity = 0
            console.log('hi')
            break;
        case 3:
            result.innerText='No more guesses!'

    }
}

const updateSongStats = () => {
    const albumArt = document.querySelector("#art")
    const songName = document.querySelector('.song-name')
    const songArtist = document.querySelector('.song-artist')
    const songStats = document.querySelectorAll('.stat')
    
    albumArt.src = songData[5]
    songName.innerText = songData[0]
    songArtist.innerText = songData[3]
    //album title
    songStats[0].innerText = `Album Name: ${songData[4]}`
    songStats[1].innerText = `Release: ${songData[7]}`
    songStats[2].innerText = `Top 100 Ranking: ${rank}`
    songStats[3].href = songData[1]
    songStats[3].innerText = songData[1]
    songStats[4].innerText = `${Math.trunc(songData[2]/60)}:${songData[2]%60}`


}


const checkGuess = () => {
    let guess = document.querySelector('#guess').value
    //compare strings, make all lower case and remove special characters
    if (guess.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') == answer.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')) updateFeedbackBox(1)

}

const updateProgressBar = () => {
    const musicBar = document.querySelector(".music-player")
    const progressBar = document.querySelector("#progress-bar")
    let width = (song.currentTime/14)*musicBar.clientWidth
    //console.log(song.currentTime, maxDuration, musicBar.clientWidth,width)
    progressBar.style.width = `${width}px`
    //console.log(progressBar.clientWidth)
}

//Buttons
const playButton = document.querySelector('.play')
const addButton = document.querySelector('.add-time')
//const submitButton = document.querySelector('#submit')


//EventListeners
playButton.addEventListener('click', async ()=> {

    playSong()
})

addButton.addEventListener('click', addTime)

document.addEventListener('DOMContentLoaded', async ()=> {
    await loadRandSong()
    updateFeedbackBox(2)
})

//submitButton.addEventListener('click', checkGuess)
document.onkeydown=function(){
    if(window.event.keyCode=='13'){
        checkGuess();
    }
}





