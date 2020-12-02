function AudioRecorder (stream) {
  const audioChunks = [];
  let isRecording = false;

  const recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (event) => {
    if (isRecording) audioChunks.push(event.data);
  };

  recorder.onstart = (_event) => {
    isRecording = true;
  };

  recorder.onpause = (_event) => {
    isRecording = false;
  };

  recorder.onstop = (_event) => {
    isRecording = false;

    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return recorder;

}

export default AudioRecorder;