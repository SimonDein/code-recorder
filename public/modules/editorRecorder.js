function EditorRecorder (editor) {
  this.editor = editor;
  this.editor.setTheme("ace/theme/gruvbox");
  this.editor.session.setMode("ace/mode/javascript");
  this.events = [];
  console.log(this.editor)
  this.initialize();
};

EditorRecorder.prototype.initialize = function () {
  this.editor.session.on('change', function(delta) {
    // delta.start, delta.end, delta.lines, delta.action
    console.log(delta);
  });

  this.editor.session.selection.on('changeSelection', function(delta) {
    // delta.start, delta.end, delta.lines, delta.action
    console.log(delta);
  });

  this.editor.session.selection.on('changeCursor', function(delta) {
    // delta.start, delta.end, delta.lines, delta.action
    console.log(delta);
  });
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