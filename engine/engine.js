/**
 * Animation Engine - Core Scene Player
 * Loads and plays scene configurations with timeline-based actions
 */

class ScenePlayer {
  constructor(sceneConfig, container) {
    this.config = sceneConfig;
    this.container = container;
    this.timeline = sceneConfig.timeline || [];
    this.timeouts = [];
    this.sprites = new Map();
    this.textElements = new Map();
    this.isPlaying = false;
    this.isPaused = false;
    this.startTime = 0;
    this.pauseTime = 0;
  }

  async play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.isPaused = false;
    this.startTime = Date.now();

    // Clear container
    this.container.innerHTML = '';

    // Set background
    if (this.config.background) {
      const bg = document.createElement('img');
      bg.src = this.config.background;
      bg.className = 'scene-bg';
      bg.alt = 'Scene Background';
      this.container.appendChild(bg);
    }

    // Schedule all timeline actions
    this.timeline.forEach(action => {
      const timeout = setTimeout(() => {
        this.executeAction(action);
      }, action.time);

      this.timeouts.push(timeout);
    });

    // Schedule scene end
    if (this.config.duration) {
      const endTimeout = setTimeout(() => {
        this.end();
      }, this.config.duration);

      this.timeouts.push(endTimeout);
    }
  }

  executeAction(action) {
    if (this.isPaused) return;

    switch (action.action) {
      case 'showText':
        this.showText(action.config);
        break;
      case 'hideText':
        this.hideText(action.config);
        break;
      case 'showSprite':
        this.showSprite(action.config);
        break;
      case 'hideSprite':
        this.hideSprite(action.config);
        break;
      case 'animateSprite':
        this.animateSprite(action.config);
        break;
      case 'playSound':
        this.playSound(action.config);
        break;
      default:
        console.warn('Unknown action:', action.action);
    }
  }

  showText(config) {
    const textId = config.id || 'text_' + Date.now();

    // Create text element
    const textEl = document.createElement('div');
    textEl.className = 'text-overlay';
    textEl.id = textId;

    // Detect English text and apply MSX International font with LTR direction
    const isEnglish = /^[a-zA-Z0-9\s.,!?'"()-]+$/.test(config.text);
    if (isEnglish) {
      textEl.classList.add('english-text');
      textEl.setAttribute('dir', 'ltr');
    }

    // Apply type class (overlay, box, dialog, etc.)
    if (config.type) {
      textEl.classList.add(`text-${config.type}`);
      if (config.type === 'box') textEl.classList.add('text-box');
      if (config.type === 'dialog') textEl.classList.add('dialog-box');
    }

    // Apply position
    if (config.position) {
      if (typeof config.position.x === 'string') {
        if (config.position.x === 'center') {
          textEl.style.left = '50%';
          textEl.style.transform = 'translateX(-50%)';
        } else if (config.position.x.includes('px') || config.position.x.includes('%')) {
          textEl.style.left = config.position.x;
        }
      } else if (typeof config.position.x === 'number') {
        textEl.style.left = config.position.x + 'px';
      }

      if (typeof config.position.y === 'string') {
        if (config.position.y === 'center') {
          textEl.style.top = '50%';
          const currentTransform = textEl.style.transform;
          textEl.style.transform = currentTransform
            ? currentTransform + ' translateY(-50%)'
            : 'translateY(-50%)';
        } else if (config.position.y.includes('px') || config.position.y.includes('%')) {
          textEl.style.top = config.position.y;
        }
      } else if (typeof config.position.y === 'number') {
        textEl.style.top = config.position.y + 'px';
      }
    }

    // Apply custom styles
    if (config.style) {
      Object.assign(textEl.style, config.style);
    }

    // Add to container
    this.container.appendChild(textEl);
    this.textElements.set(textId, textEl);

    // Animate text
    if (config.animation && config.animation.type === 'typewriter') {
      const typewriter = new TypewriterEffect(textEl, config.text, {
        speed: config.animation.speed || 80,
        showCursor: config.animation.showCursor !== false
      });
      typewriter.start();
    } else {
      textEl.textContent = config.text;
    }

    return textId;
  }

  hideText(config) {
    const textEl = this.textElements.get(config.id);
    if (textEl) {
      textEl.remove();
      this.textElements.delete(config.id);
    }
  }

  showSprite(config) {
    const sprite = document.createElement('img');
    sprite.src = config.image;
    sprite.className = 'sprite';
    sprite.id = config.id;
    sprite.alt = config.alt || 'Sprite';

    // Set size
    if (config.width) sprite.style.width = config.width;
    if (config.height) sprite.style.height = config.height;

    // Set position
    if (config.position) {
      this.applyPosition(sprite, config.position);
    }

    // Set z-index
    if (config.zIndex) sprite.style.zIndex = config.zIndex;

    this.container.appendChild(sprite);
    this.sprites.set(config.id, sprite);
  }

  hideSprite(config) {
    const sprite = this.sprites.get(config.id);
    if (sprite) {
      sprite.remove();
      this.sprites.delete(config.id);
    }
  }

  animateSprite(config) {
    const sprite = document.createElement('img');
    sprite.className = 'sprite';
    sprite.id = config.id;
    sprite.alt = 'Animated Sprite';

    // Set size
    if (config.width) sprite.style.width = config.width;
    if (config.height) sprite.style.height = config.height;

    // Set z-index
    if (config.zIndex) sprite.style.zIndex = config.zIndex;

    this.container.appendChild(sprite);
    this.sprites.set(config.id, sprite);

    // Start animation
    const animator = new SpriteAnimator(sprite, {
      frames: config.frames,
      positions: config.positions,
      frameDelay: config.frameDelay || 400
    });
    animator.start();
  }

  applyPosition(element, position) {
    // X Position
    if (typeof position.x === 'string') {
      if (position.x === 'center') {
        element.style.left = '50%';
        element.style.transform = 'translateX(-50%)';
      } else if (position.x.startsWith('right-')) {
        element.style.right = position.x.replace('right-', '');
      } else if (position.x.startsWith('left-')) {
        element.style.left = position.x.replace('left-', '');
      } else {
        element.style.left = position.x;
      }
    } else if (typeof position.x === 'number') {
      element.style.left = position.x + 'px';
    }

    // Y Position - IMPROVED LOGIC
    if (typeof position.y === 'string') {
      if (position.y === 'bottom') {
        // "bottom" = sits at bottom (0px from bottom)
        element.style.bottom = '0px';
      } else if (position.y === 'top') {
        // "top" = sits at top (0px from top)
        element.style.top = '0px';
      } else if (position.y === 'center') {
        element.style.top = '50%';
        const transform = element.style.transform || '';
        element.style.transform = transform ? transform + ' translateY(-50%)' : 'translateY(-50%)';
      } else if (position.y.startsWith('bottom-')) {
        // "bottom-100px" = 100px from bottom
        element.style.bottom = position.y.replace('bottom-', '');
      } else if (position.y.startsWith('top-')) {
        // "top-100px" = 100px from top
        element.style.top = position.y.replace('top-', '');
      } else {
        element.style.top = position.y;
      }
    } else if (typeof position.y === 'number') {
      // NUMBER = pixels from BOTTOM (more intuitive for ground-based sprites)
      element.style.bottom = position.y + 'px';
    }
  }

  playSound(config) {
    // Sound will be handled by AudioPlayer
    if (window.audioPlayer) {
      window.audioPlayer.playEffect(config.sound);
    }
  }

  pause() {
    this.isPaused = true;
    this.pauseTime = Date.now();
    // Clear all pending timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;

    const pauseDuration = Date.now() - this.pauseTime;
    // TODO: Reschedule remaining timeline actions
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
    this.sprites.clear();
    this.textElements.clear();
    this.container.innerHTML = '';
  }

  end() {
    this.isPlaying = false;

    // Trigger end callback if provided
    if (this.config.onEnd) {
      this.config.onEnd();
    }

    // Auto-advance to next scene if configured
    if (this.config.autoAdvance && window.chapterPlayer) {
      setTimeout(() => {
        window.chapterPlayer.nextScene();
      }, this.config.advanceDelay || 1000);
    }
  }
}
