const mouseRecorder = {
  init() {
    this.frames = [];
    this.currentFrameIndex = 0;
    this.recording = false;
    this.playing = false;
    this.cursor = document.querySelector('#cursor');

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
    this.currentFrame = this.frames[this.currentFrameIndex];
    const nextFrame = this.frames[this.currentFrameIndex + 1];

    if (nextFrame === undefined) return;

    // const self = this;

    // const msElapsedSinceStartedPlaying = window.performance.now() - this.startTime;
    // const msDifferenceBetweenCurrentAndNextFrame = nextFrame.timeStamp - currentFrame.timeStamp;
    // const msDifferneceBetweenCurrentAndFirstFrame = currentFrame.timeStamp - this.frames[0].timeStamp;
    // const msDelay = msElapsedSinceStartedPlaying - msDifferneceBetweenCurrentAndFirstFrame;
    // console.log(msDelay);

    // setTimeout(function() {
      //   self.playFrames();
      // }, (msDifferenceBetweenCurrentAndNextFrame) - (msDelay));

      /*
      - If enough time has passed since last draw
      - requestAnimation(Draw)
      - Call recursive

      */

    const msElapsedSinceStartedPlaying = window.performance.now() - this.startTime;
    const msDifferenceBetweenCurrentAndNextFrame = nextFrame.timeStamp - currentFrame.timeStamp;
    const msDifferneceBetweenCurrentAndFirstFrame = currentFrame.timeStamp - this.frames[0].timeStamp;
    const msDelay = msElapsedSinceStartedPlaying - msDifferneceBetweenCurrentAndFirstFrame;

    if (msElapsedSinceStartedPlaying >= msDifferneceBetweenCurrentAndFirstFrame) {
      requestAnimationFrame(this.displayFrame.bind(this));
      this.currentFrameIndex += 1;
    };

    this.playFrames();
  },

  // Record frame if 16.6ms has passed since last frame (1 frame per 16.6ms === 60fps)
  isTimeForNewFrame() {
    const lastFrame = this.frames[this.frames.length - 1];
    return (performance.now() - lastFrame.timeStamp) >= 16.6;
  },

  displayFrame() {
    this.cursor.style.top = `${this.currentFrame.y}px`;
    this.cursor.style.left = `${this.currentFrame.x}px`;
  }
};

export { mouseRecorder };