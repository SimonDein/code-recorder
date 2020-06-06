import {mouseRecorder} from './modules/mouseRecorder.js';
const mouseRecorder1 = Object.create(mouseRecorder).init();

console.log(mouseRecorder1);
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const durationDisplay = document.querySelector('#duration');

let interval
let start;
let stop;

startButton.onclick = () => {
  interval = window.setInterval(increaseDuration, 1000, durationDisplay)
  mouseRecorder1.record();
}

// 700, 800, 830, 1200, 1400

stopButton.onclick = () => {
  clearInterval(interval);
  durationDisplay.innerHTML = '00:00';
  mouseRecorder1.stop();
}

playButton.onclick = () => {
  mouseRecorder1.play();
}

let secondsPassed = 0;

function increaseDuration() {
  secondsPassed += 1;

  let display = document.querySelector('#duration');
  display.innerHTML = format(secondsPassed);
}

function format(seconds) {
  let minutes = String(Math.floor(seconds / 60));
  seconds = String(seconds % 60);

  let minutesPadding = minutes.length > 1 ? '' : '0';
  let secondsPadding = seconds.length > 1 ? '' : '0';

  return `${minutesPadding}${minutes}:${secondsPadding}${seconds}`;
}

const keyrecorder = {
  frames: [],

  record() {
    this.frames.push
  }
}