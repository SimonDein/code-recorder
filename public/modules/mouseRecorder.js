const mouseRecorder = {
  init() {
    this.frames = [];
    this.currentFrameIndex = 0;
    this.recording = false;
    this.playing = false;
    this.cursor = document.querySelector('#cursor');
    this.startTime;

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
    window.requestAnimationFrame(this.animateNextFrame.bind(this));
  },

  animateNextFrame(timeStamp) {
    if (!this.startTime) this.startTime = timeStamp;
    this.currentFrame = this.frames[this.currentFrameIndex];
    const nextFrame = this.frames[this.currentFrameIndex + 1];

    if (nextFrame === undefined) {
      this.playing = false;
      return;
    }

    this.cursor.style.transform = `translate(${this.currentFrame.x}px, ${this.currentFrame.y}px)`;
    this.currentFrameIndex += 1;

    const msElapsedSinceStartedPlaying = timeStamp - this.startTime;
    const msDifferenceBetweenCurrentAndNextFrame = nextFrame.timeStamp - this.currentFrame.timeStamp;
    const msDifferneceBetweenCurrentAndFirstFrame = this.currentFrame.timeStamp - this.frames[0].timeStamp;
    const msDelay = msElapsedSinceStartedPlaying - msDifferneceBetweenCurrentAndFirstFrame;
    const self = this;

    let timeOut = msDifferenceBetweenCurrentAndNextFrame - msDelay;
    timeOut = timeOut < 0 ? 0 : timeOut;
    console.log(timeOut)

    setTimeout(function() {
      window.requestAnimationFrame(self.animateNextFrame.bind(self));
    }, timeOut);

  },
  // Record frame if 16.6ms has passed since last frame (1 frame per 16.67ms === 60fps)
  isTimeForNewFrame() {
    const lastFrame = this.frames[this.frames.length - 1];
    return (performance.now() - lastFrame.timeStamp) >= 16.67;
  },
};

export { mouseRecorder };