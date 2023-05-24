//Code to pause/play song in set intervals
//Global Variables
let song
let stopTime = 2000
let guessTracker = 1
let response
let answer
//Functions
const loadRandSong = async () => {
    response = await axios.get('https://api.deezer.com/playlist/3155776842')
    let randInt = Math.floor((Math.random()*99))
    song = new Audio(response.data.tracks.data[randInt].preview)
    console.log(response.data.tracks.data[randInt].title)
    answer = response.data.tracks.data[randInt].title
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
    stopTime+=2000
    let rect = document.querySelector(`#guess-${guessTracker}`)
    rect.style.backgroundColor = '#FFFFFF'
    guessTracker++

    if(guessTracker>=7) updateFeedbackBox()
}

const updateFeedbackBox = (num) => {
    let headphones = document.querySelector(".gg-headset")
    let stats = document.querySelector(".song-info")
    switch(num){
        case 1:
            headphones.style.opacity = 0.1
            stats.style.opacity = 1
            break;
        case 2:
            headphones.style.opacity = 1
            stats.style.opacity = 0
            break;
    }
}
updateFeedbackBox(1)
const checkGuess = () => {
    let guess = document.querySelector('#guess').value
    let result = document.querySelector('.result')
    //compare strings, make all lower case and remove special characters
    if (guess.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '') == answer.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')) result.innerText='Nice!'

}


//Buttons
const playButton = document.querySelector('.play')
const addButton = document.querySelector('.add-time')
const submitButton = document.querySelector('#submit')


//EventListeners
playButton.addEventListener('click', async ()=> {

    playSong()
})

addButton.addEventListener('click', addTime)

document.addEventListener('DOMContentLoaded', async ()=> {
    await loadRandSong()
})

submitButton.addEventListener('click', checkGuess)


