/**
 * Audio Player - Background music only
 * No typewriter sound effects (per requirements)
 */

class AudioPlayer {
  constructor() {
    this.music = null;
    this.musicVolume = 0.7;
    this.isMuted = false;
  }

  playMusic(src, options = {}) {
    // Stop current music if playing
    this.stopMusic();

    // Create new audio element
    this.music = new Audio(src);
    this.music.volume = options.volume !== undefined ? options.volume : this.musicVolume;
    this.music.loop = options.loop !== false; // Default to loop

    // Play
    const playPromise = this.music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Music started playing');
        })
        .catch(error => {
          console.warn('Music playback failed:', error);
        });
    }
  }

  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
    }
  }

  pauseMusic() {
    if (this.music && !this.music.paused) {
      this.music.pause();
    }
  }

  resumeMusic() {
    if (this.music && this.music.paused) {
      this.music.play().catch(error => {
        console.warn('Music resume failed:', error);
      });
    }
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.music) {
      this.music.volume = this.musicVolume;
    }
  }

  mute() {
    this.isMuted = true;
    if (this.music) {
      this.music.muted = true;
    }
  }

  unmute() {
    this.isMuted = false;
    if (this.music) {
      this.music.muted = false;
    }
  }

  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }
}

// Global audio player instance
if (typeof window !== 'undefined') {
  window.audioPlayer = new AudioPlayer();
}
