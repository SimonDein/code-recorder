const mouseRecorder = {
  init() {
    this.frames = [];
    this.currentFrameIndex = 0;
    this.recording = false;
    this.playing = false;
    this.cursor = document.querySelector('#cursor');
    console.log(this.cursor);

    window.addEventListener('mousemove', function (mouseEvent) {
      if (!this.recording) return

      if (this.frames.length === 0) {
        this.frames.push(mouseEvent)
        return;
      };

      if (this.isTimeForNewFrame()) {
        this.frames.push(mouseEvent);
      }
    }.bind(this));

    return this;
  },

  record() {
    console.log(this);
    this.recording = true;
  },

  stop() {
    this.recording = false;

    console.log(this.frames);
  },

  play() {
    if (this.frames.length === 0) return;

    this.playing = true;
    this.startTime = window.performance.now();
    this.playFrames()
  },

  playFrames() {
    const currentFrame = this.frames[this.currentFrameIndex];
    const nextFrame = this.frames[this.currentFrameIndex + 1];

    this.displayFrame(currentFrame)

    if (nextFrame === undefined) return;

    this.currentFrameIndex += 1;
    const self = this;

    const msElapsedSinceStartedPlaying = window.performance.now() - this.startTime;
    const msDifferenceBetweenCurrentAndNextFrame = nextFrame.timeStamp - currentFrame.timeStamp;
    const msDifferneceBetweenCurrentAndFirstFrame = currentFrame.timeStamp - this.frames[0].timeStamp;
    const msDelay = msElapsedSinceStartedPlaying - msDifferneceBetweenCurrentAndFirstFrame;

    setTimeout(function() {
      self.playFrames();
    }, (msDifferenceBetweenCurrentAndNextFrame) - (msDelay));
  },

  // Record frame if 16ms has passed since last frame (1 frame per 16ms === 60fps)
  isTimeForNewFrame() {
    const lastFrame = this.frames[this.frames.length - 1];
    return (performance.now() - lastFrame.timeStamp) >= 16
  },

  displayFrame(frame) {
    console.log(this.cursor);
    this.cursor.style.top = `${frame.y}px`;
    this.cursor.style.left = `${frame.x}px`;
  }
};

export { mouseRecorder };