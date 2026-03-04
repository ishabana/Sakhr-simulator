/**
 * Typewriter Effect - Character-by-character text animation
 * No sound effects (per requirements)
 */

class TypewriterEffect {
  constructor(element, text, options = {}) {
    this.element = element;
    this.text = text;
    this.speed = options.speed || 80; // ms per character
    this.showCursor = options.showCursor !== false;
    this.currentIndex = 0;
    this.isRunning = false;
    this.intervalId = null;
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentIndex = 0;

    // Initial state - show cursor
    if (this.showCursor) {
      this.element.innerHTML = '<span class="cursor"></span>';
    } else {
      this.element.textContent = '';
    }

    // Start typing
    this.intervalId = setInterval(() => {
      this.typeNextCharacter();
    }, this.speed);
  }

  typeNextCharacter() {
    if (this.currentIndex < this.text.length) {
      const currentText = this.text.substring(0, this.currentIndex + 1);

      if (this.showCursor) {
        this.element.innerHTML = currentText + '<span class="cursor"></span>';
      } else {
        this.element.textContent = currentText;
      }

      this.currentIndex++;
    } else {
      // Finished typing
      this.stop();
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
    if (this.isRunning || this.currentIndex >= this.text.length) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.typeNextCharacter();
    }, this.speed);
  }

  reset() {
    this.stop();
    this.currentIndex = 0;
    if (this.showCursor) {
      this.element.innerHTML = '<span class="cursor"></span>';
    } else {
      this.element.textContent = '';
    }
  }
}
