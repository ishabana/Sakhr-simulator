/**
 * Sprite Animator - Frame-based sprite animation
 * Handles frame sequences and position changes
 */

class SpriteAnimator {
  constructor(element, config) {
    this.element = element;
    this.frames = config.frames || [];
    this.positions = config.positions || [];
    this.frameDelay = config.frameDelay || 400; // ms per frame
    this.loop = config.loop || false;
    this.currentFrame = 0;
    this.isRunning = false;
    this.intervalId = null;
  }

  start() {
    if (this.isRunning || this.frames.length === 0) return;

    this.isRunning = true;
    this.currentFrame = 0;

    // Show first frame immediately
    this.showFrame(0);

    // Start animation
    this.intervalId = setInterval(() => {
      this.nextFrame();
    }, this.frameDelay);
  }

  nextFrame() {
    this.currentFrame++;

    if (this.currentFrame < this.frames.length) {
      this.showFrame(this.currentFrame);
    } else {
      // Animation finished
      if (this.loop) {
        this.currentFrame = 0;
        this.showFrame(0);
      } else {
        this.stop();
      }
    }
  }

  showFrame(index) {
    // Update frame image
    this.element.src = this.frames[index];

    // Update position if provided
    if (this.positions[index]) {
      const pos = this.positions[index];

      // Clear previous position styles but preserve transform
      const currentTransform = this.element.style.transform;
      this.element.style.left = '';
      this.element.style.right = '';
      this.element.style.top = '';
      this.element.style.bottom = '';
      this.element.style.transform = '';

      // Apply new position
      if (typeof pos === 'object') {
        // Position object with x and y

        // X Position
        if (typeof pos.x === 'string') {
          if (pos.x === 'center') {
            this.element.style.left = '50%';
            this.element.style.transform = 'translateX(-50%)';
          } else if (pos.x.startsWith('right-')) {
            this.element.style.right = pos.x.replace('right-', '');
          } else if (pos.x.startsWith('left-')) {
            this.element.style.left = pos.x.replace('left-', '');
          } else {
            this.element.style.left = pos.x;
          }
        } else if (typeof pos.x === 'number') {
          this.element.style.left = pos.x + 'px';
        }

        // Y Position
        if (pos.y !== undefined) {
          if (typeof pos.y === 'string') {
            if (pos.y === 'bottom') {
              this.element.style.bottom = '0px';
            } else if (pos.y === 'top') {
              this.element.style.top = '0px';
            } else if (pos.y === 'center') {
              this.element.style.top = '50%';
              const xform = this.element.style.transform;
              this.element.style.transform = xform ? xform + ' translateY(-50%)' : 'translateY(-50%)';
            } else if (pos.y.startsWith('bottom-')) {
              this.element.style.bottom = pos.y.replace('bottom-', '');
            } else if (pos.y.startsWith('top-')) {
              this.element.style.top = pos.y.replace('top-', '');
            } else {
              this.element.style.top = pos.y;
            }
          } else if (typeof pos.y === 'number') {
            // NUMBER = pixels from BOTTOM
            this.element.style.bottom = pos.y + 'px';
          }
        }
      } else if (typeof pos === 'number') {
        // Simple left position (backward compatibility)
        this.element.style.left = pos + 'px';
      }
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  resume() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.nextFrame();
    }, this.frameDelay);
  }

  reset() {
    this.stop();
    this.currentFrame = 0;
    this.showFrame(0);
  }
}
