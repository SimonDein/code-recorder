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
    if (this.frames.length === 0) return;

    window.requestAnimationFrame(this.displayNextFrame.bind(this));
  },

  displayNextFrame(timestamp) {
    this.currentFrame = this.frames[this.currentFrameIndex];
    const nextFrame = this.frames[this.currentFrameIndex + 1];

    if (nextFrame === undefined) return;

    this.displayFrameTransform();
    this.currentFrameIndex += 1;

    window.requestAnimationFrame(this.displayNextFrame.bind(this));
  },
  // Record frame if 16.6ms has passed since last frame (1 frame per 16.67ms === 60fps)
  isTimeForNewFrame() {
    const lastFrame = this.frames[this.frames.length - 1];
    return (performance.now() - lastFrame.timeStamp) >= 16.67;
  },

  displayFrameTransform() {
    this.cursor.style.transform = `translate(${this.currentFrame.x}px, ${this.currentFrame.y}px)`;
  }
};

export { mouseRecorder };