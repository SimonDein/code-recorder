function EditorRecorder (editor) {
  this.editor = editor;
  this.events = [];
  console.log(this.editor)
  this.initialize();
};

EditorRecorder.prototype.initialize = function () {
};

EditorRecorder.prototype.start = function () {
  this.isRecording = true;
};

EditorRecorder.prototype.pause = function () {
  this.isRecording = false;
};

EditorRecorder.prototype.stop = function () {
  this.isRecording = false;
};
export default EditorRecorder;