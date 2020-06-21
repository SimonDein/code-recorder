import {mouseRecorder} from './modules/mouseRecorder.js';

const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const durationDisplay = document.querySelector('#duration');

let secondsPassed = 0 //
const mouseRecorder1 = Object.create(mouseRecorder).init();
let mediaRecorder;
let interval
let start;
let stop;
let audioChunks = [];


// START Button
startButton.onclick = async () => {
  interval = window.setInterval(increaseDuration, 1000, durationDisplay) // Increment time each second and display it
  mouseRecorder1.record();

  let audioStream;
  try {
    audioStream =  await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    console.log('An audio stream could not be created', error);
    return;
  }

  mediaRecorder = new MediaRecorder(audioStream);
  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  }
  mediaRecorder.start();
}

// STOP button
stopButton.onclick = () => {
  clearInterval(interval);
  durationDisplay.innerHTML = '00:00';
  mouseRecorder1.stop();

  mediaRecorder.stop();
}

// PLAY button
playButton.onclick = () => {
  mouseRecorder1.play();
  console.log(audioChunks);
}

function increaseDuration() {
  secondsPassed += 1;

  let display = document.querySelector('#duration');
  display.innerHTML = format(secondsPassed);
}

// ==========================
// Helper functions
function format(seconds) {
  let minutes = String(Math.floor(seconds / 60));
  seconds = String(seconds % 60);

  let minutesPadding = minutes.length > 1 ? '' : '0';
  let secondsPadding = seconds.length > 1 ? '' : '0';

  return `${minutesPadding}${minutes}:${secondsPadding}${seconds}`;
}

async function getAudioStream() {
  try {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log(stream);
    return stream;
  } catch(error) {
    console.log('An audio stream could not be created', error);
  }
}