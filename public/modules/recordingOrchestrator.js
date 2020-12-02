function RecordingOrchestrator ({startButton, stopButton, pauseButton}, audioRecorder, editorRecorder) {
  this.startButton = startButton;
  this.stopButton = stopButton;
  this.pauseButton = pauseButton;
  this.audioRecorder = audioRecorder;
  this.editorRecorder = editorRecorder;

  console.log(this);

  this.initialize()
}

RecordingOrchestrator.prototype.initialize = function () {
  this.startButton.onclick = () => this.start();
  this.stopButton.onclick = () => this.stop();
  this.pauseButton.onclick = () => this.pause();
}

RecordingOrchestrator.prototype.start = function () {
  this.audioRecorder.start();
  this.editorRecorder.start();
}

RecordingOrchestrator.prototype.stop = function () {
  this.audioRecorder.stop();
  this.editorRecorder.stop();
};

RecordingOrchestrator.prototype.pause = function () {
  this.audioRecorder.pause();
  this.editorRecorder.pause();
};

export default RecordingOrchestrator;