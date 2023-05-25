let song
document.addEventListener('DOMContentLoaded', async ()=> {
    let response = await axios.get('https://api.deezer.com/playlist/3155776842')
    rank = Math.floor((Math.random()*99))
    song = new Audio(response.data.tracks.data[rank].preview)
    song.crossOrigin = "anonymous";
})

//submitButton.addEventListener('click', checkGuess)
document.onkeydown=function(){
    if(window.event.keyCode=='13'){
       //Audio Visualizer - https://blog.logrocket.com/audio-visualizer-from-scratch-javascript/

const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d")

//audio source, analyzer, and context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

song.play()
audioSource = audioCtx.createMediaElementSource(song)
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser)
analyser.connect(audioCtx.destination)

//Calculating the visualizer's bar dimension
analyser.fftSize = 128
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength)
const barWidth = canvas.width / bufferLength

//Function to animate the bars
let x = 0
const animate = () => {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = "white";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
        console.log('hi')
    }

    requestAnimationFrame(animate);
}
animate()


    }
}
