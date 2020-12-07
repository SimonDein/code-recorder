import EditorRecorder from './modules/editorRecorder.js';
import AudioRecorder from './modules/audioRecorder.js';
import RecordingOrchestrator from './modules/recordingOrchestrator.js';

const recButtons = {
  startButton: document.querySelector('#start'),
  stopButton: document.querySelector('#stop'),
  pauseButton: document.querySelector('#pause'),
};

// const playButton = document.querySelector('#play');
// const durationDisplay = document.querySelector('#duration');
// const audioPlayer = document.querySelector('#audio-player');

const textArea = document.querySelector('#editor');
const editor = CodeMirror.fromTextArea(textArea, {
  lineNumbers: true
});

(async () => {
  const audioStream = await getAudioStream();

  // ====== Recorders ======
  const audioRecorder = new AudioRecorder(audioStream);
  const editorRecorder = new EditorRecorder(editor);
  const recordingOrchestrator = new RecordingOrchestrator(recButtons, audioRecorder, editorRecorder);
})();

  let secondsPassed = 0
  let interval

// // START Button
// startButton.onclick = () => {
//   interval = window.setInterval(increaseDuration, 1000, durationDisplay) // Increment time each second and display it
//   mouseRecorder1.record();
//   // mediaRecorder.start();
// }

// // STOP button
// stopButton.onclick = () => {
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

async function getAudioStream () {
  let audioStream;
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    console.log('An audio stream could not be created: ', error);
    return;
  }

  return audioStream;
}