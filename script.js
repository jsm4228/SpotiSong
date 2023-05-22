//Code to pause/play song in set intervals
//Global Variables
let song
let stopTime = 2000

//Functions
const loadRandSong = async () => {
    let response = await axios.get('https://api.deezer.com/playlist/3155776842')
    let randInt = Math.floor((Math.random()*99))
    song = new Audio(response.data.tracks.data[randInt].preview)
}

const playSong = async () => {
    //random integer to be passed into tracks.data[random]. For now hard-coded for testing
    //await song.fastSeek(20)
    await song.play()
    setTimeout(() => song.pause(), stopTime)
    song.currentTime = 0
    //setTimeout(() => song.play(), 10000)
}


//Buttons
const playButton = document.querySelector('.play')
const addButton = document.querySelector('.add-time')


//EventListeners
playButton.addEventListener('click', async ()=> {

    playSong()
})
addButton.addEventListener('click', ()=> {
    stopTime+=(2000)
})

document.addEventListener('DOMContentLoaded', async ()=> {
    await loadRandSong()
})


