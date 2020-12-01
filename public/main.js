import {mouseRecorder} from './modules/mouseRecorder.js';
import MultiRecorder from './modules/multiRecorder.js'
import AudioRecorder from './modules/audioRecorder.js'

const recStartButton = document.querySelector('#start');
const playButton = document.querySelector('#play');
const recStopButton = document.querySelector('#stop');
const durationDisplay = document.querySelector('#duration');
const audioPlayer = document.querySelector('#audio-player');


const audioRecorder = new AudioRecorder;
const multirecorder = new MultiRecorder(recStartButton, recStopButton, audioRecorder, editorRecorder);

let secondsPassed = 0
let interval
const mouseRecorder1 = Object.create(mouseRecorder).init();
let mediaRecorder;
let audioChunks = [];

// (async () => {
//   try {
//     let audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(audioStream);
//     mediaRecorder.ondataavailable = (event) => {
//       audioChunks.push(event.data);
//     }

//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(audioChunks);
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);
//       audio.play();
//     }
//   } catch (error) {
//     console.log('An audio stream could not be created', error);
//   }
// })();

// START Button
// recStartButton.onclick = () => {
//   interval = window.setInterval(increaseDuration, 1000, durationDisplay) // Increment time each second and display it
//   mouseRecorder1.record();
//   // mediaRecorder.start();
// }

// // STOP button
// recStopButton.onclick = () => {
//   clearInterval(interval);
//   durationDisplay.innerHTML = '00:00';

//   mouseRecorder1.stop();
//   // mediaRecorder.stop();
// }

// // PLAY button
// playButton.onclick = () => {
//   mouseRecorder1.play();
// }

// function increaseDuration() {
//   secondsPassed += 1;

//   let display = document.querySelector('#duration');
//   display.innerHTML = format(secondsPassed);
// }

// // ==========================
// // Helper functions
// function format(seconds) {
//   let minutes = String(Math.floor(seconds / 60));
//   seconds = String(seconds % 60);

//   let minutesPadding = minutes.length > 1 ? '' : '0';
//   let secondsPadding = seconds.length > 1 ? '' : '0';

//   return `${minutesPadding}${minutes}:${secondsPadding}${seconds}`;
// }

// async function getAudioStream() {
//   try {
//     let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     console.log(stream);
//     return stream;
//   } catch(error) {
//     console.log('An audio stream could not be created', error);
//   }
// }