/**
 * Chapter Player - Loads and plays all scenes in a chapter sequentially
 * Auto-advances between scenes
 */

class ChapterPlayer {
  constructor(scenesConfigPath) {
    this.scenesConfigPath = scenesConfigPath;
    this.scenesConfig = null;
    this.currentSceneIndex = 0;
    this.currentScenePlayer = null;
    this.container = null;
  }

  async init(containerId = 'scene-container') {
    this.container = document.getElementById(containerId);

    if (!this.container) {
      throw new Error(`Container element #${containerId} not found`);
    }

    // Load scenes configuration
    try {
      const response = await fetch(this.scenesConfigPath);
      this.scenesConfig = await response.json();

      console.log('Chapter config loaded:', this.scenesConfig);

      // Start background music if specified
      if (this.scenesConfig.music && window.audioPlayer) {
        window.audioPlayer.playMusic(this.scenesConfig.music, {
          volume: this.scenesConfig.musicVolume || 0.7,
          loop: true
        });
      }
    } catch (error) {
      console.error('Failed to load scenes config:', error);
      throw error;
    }
  }

  async start() {
    if (!this.scenesConfig) {
      await this.init();
    }

    this.currentSceneIndex = 0;
    this.playCurrentScene();
  }

  async playCurrentScene() {
    if (!this.scenesConfig || !this.scenesConfig.scenes) {
      console.error('No scenes configured');
      return;
    }

    if (this.currentSceneIndex >= this.scenesConfig.scenes.length) {
      console.log('All scenes completed, looping back to start');
      this.currentSceneIndex = 0;
    }

    const scenePath = this.scenesConfig.scenes[this.currentSceneIndex];
    console.log(`Playing scene ${this.currentSceneIndex + 1}/${this.scenesConfig.scenes.length}: ${scenePath}`);

    // Load scene config
    try {
      const response = await fetch(scenePath);
      const sceneConfig = await response.json();

      // Resolve relative paths in scene config
      const basePath = scenePath.substring(0, scenePath.lastIndexOf('/') + 1);
      sceneConfig.background = basePath + sceneConfig.background;

      // Resolve sprite and frame paths
      if (sceneConfig.timeline) {
        sceneConfig.timeline.forEach(action => {
          if (action.config) {
            if (action.config.image) {
              action.config.image = basePath + action.config.image;
            }
            if (action.config.frames) {
              action.config.frames = action.config.frames.map(frame => basePath + frame);
            }
          }
        });
      }

      // Set end callback
      sceneConfig.onEnd = () => {
        this.onSceneEnd();
      };

      // Play scene
      this.currentScenePlayer = new ScenePlayer(sceneConfig, this.container);
      await this.currentScenePlayer.play();

    } catch (error) {
      console.error('Failed to load/play scene:', error);
      // Try next scene
      setTimeout(() => {
        this.nextScene();
      }, 2000);
    }
  }

  onSceneEnd() {
    console.log('Scene ended');

    // Auto-advance to next scene
    if (this.scenesConfig.scenes[this.currentSceneIndex]) {
      const sceneConfig = this.scenesConfig.scenes[this.currentSceneIndex];
      // Use scene's advanceDelay or default 1 second
      const delay = 1000;

      setTimeout(() => {
        this.nextScene();
      }, delay);
    }
  }

  nextScene() {
    this.currentSceneIndex++;

    if (this.currentSceneIndex >= this.scenesConfig.scenes.length) {
      // Loop back to first scene
      this.currentSceneIndex = 0;
    }

    this.playCurrentScene();
  }

  previousScene() {
    this.currentSceneIndex--;

    if (this.currentSceneIndex < 0) {
      this.currentSceneIndex = this.scenesConfig.scenes.length - 1;
    }

    this.playCurrentScene();
  }

  restart() {
    if (this.currentScenePlayer) {
      this.currentScenePlayer.stop();
    }
    this.currentSceneIndex = 0;
    this.playCurrentScene();
  }

  pause() {
    if (this.currentScenePlayer) {
      this.currentScenePlayer.pause();
    }
    if (window.audioPlayer) {
      window.audioPlayer.pauseMusic();
    }
  }

  resume() {
    if (this.currentScenePlayer) {
      this.currentScenePlayer.resume();
    }
    if (window.audioPlayer) {
      window.audioPlayer.resumeMusic();
    }
  }

  stop() {
    if (this.currentScenePlayer) {
      this.currentScenePlayer.stop();
    }
    if (window.audioPlayer) {
      window.audioPlayer.stopMusic();
    }
    this.currentSceneIndex = 0;
  }
}

// Make ChapterPlayer available globally
if (typeof window !== 'undefined') {
  window.ChapterPlayer = ChapterPlayer;
}
