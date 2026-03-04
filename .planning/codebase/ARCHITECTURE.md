# Architecture

**Analysis Date:** 2026-01-11

## Pattern Overview

**Overall:** Modular Client-Side Animation System with JSON-Driven Scenes

**Key Characteristics:**
- Static HTML pages (no server-side rendering)
- Timeline-based animation engine
- JSON configuration for scenes
- Class-based JavaScript modules
- Event-driven audio/animation coordination

## Layers

**Presentation Layer:**
- Purpose: HTML pages that load and display animated scenes
- Contains: Player HTML files (`ch1/ch1-player.html`, `ch1/sc1/sc1-intro.html`)
- Location: `src/animation/ch1/*.html`, `src/animation/emulator/*.html`
- Depends on: Engine layer, styling layer
- Used by: End users (browser opens these files)

**Engine Layer:**
- Purpose: Core animation and scene playback logic
- Contains: JavaScript classes for scene control, animation, audio
- Location: `src/animation/engine/*.js`
  - `engine.js` - `ScenePlayer` class (timeline execution)
  - `chapter-player.js` - `ChapterPlayer` class (scene sequencing)
  - `typewriter.js` - `TypewriterEffect` class (text animation)
  - `sprite-animator.js` - `SpriteAnimator` class (frame animation)
  - `audio-player.js` - `AudioPlayer` class (background music)
- Depends on: Browser APIs (DOM, setTimeout, Audio)
- Used by: Presentation layer (loaded via <script> tags)

**Configuration Layer:**
- Purpose: Scene definitions and chapter structure
- Contains: JSON files defining timeline, sprites, text, music
- Location: `src/animation/ch1/sc1/scene.json`, `src/animation/ch1/scenes.json`
- Depends on: Nothing (data files)
- Used by: Engine layer (loaded via fetch)

**Asset Layer:**
- Purpose: Images, audio, fonts
- Contains: PNG sprites, MP3 audio files, CSS fonts
- Location:
  - Images: `src/animation/ch1/sc1/*.png`
  - Audio: `src/animation/audio/music/*.mp3`
  - Fonts: `design-system/fonts.css` (loaded from `assets/fonts/`)
- Depends on: Nothing
- Used by: Engine layer, styling layer

**Styling Layer:**
- Purpose: Visual presentation and layout
- Contains: CSS files for 1280x800 MSX screen layout
- Location:
  - `src/animation/styles/animation-base.css` - Base layout
  - `src/animation/styles/text-boxes.css` - Text styling
  - `design-system/fonts.css` - Font definitions
  - `design-system/tokens.css` - Design tokens
- Depends on: Asset layer (font files)
- Used by: Presentation layer (loaded via <link>)

## Data Flow

**Chapter Playback Lifecycle:**

1. User opens `src/animation/ch1/ch1-player.html` in browser
2. HTML loads CSS (design system + animation styles) and JavaScript (5 engine scripts)
3. `initChapter()` function executes on page load:
   - Creates `ChapterPlayer` instance
   - Loads inline `CHAPTER_CONFIG` (chapter 1 metadata + scene list)
   - Starts background music via `AudioPlayer` (if music file exists)
4. `ChapterPlayer.start()` loads first scene:
   - Fetches `ch1/sc1/scene.json` via fetch API
   - Creates `ScenePlayer` instance with scene config
5. `ScenePlayer.play()` executes scene:
   - Sets background image (`bg.png`)
   - Schedules timeline actions via setTimeout
6. Timeline actions execute at specified times:
   - 0ms: Show text with typewriter animation
   - 7000ms: Show static sprite (`still.png`)
   - 8000ms: Animate walking character (frame sequence)
7. Scene ends after `duration` (15 seconds):
   - `autoAdvance` triggers next scene load
   - If last scene, loops back to first scene
8. User controls (pause, restart) modify playback state

**State Management:**
- Scene state: Managed by `ScenePlayer` instance (timeouts, sprite map, elements)
- Chapter state: Managed by `ChapterPlayer` instance (current scene index, player reference)
- Audio state: Managed by `AudioPlayer` singleton (music volume, loop)
- No persistent state - each page load starts fresh

## Key Abstractions

**ScenePlayer:**
- Purpose: Execute a single scene's timeline
- Location: `src/animation/engine/engine.js`
- Pattern: Class with timeline execution via setTimeout
- Key methods: `play()`, `pause()`, `resume()`, `stop()`, `executeAction()`

**ChapterPlayer:**
- Purpose: Sequence multiple scenes in order
- Location: `src/animation/engine/chapter-player.js`
- Pattern: Chapter-level orchestrator
- Key methods: `start()`, `loadScene()`, `advanceScene()`, `restart()`

**TypewriterEffect:**
- Purpose: Animate text character-by-character
- Location: `src/animation/engine/typewriter.js`
- Pattern: Text animation utility
- Used by: ScenePlayer when `animation.type === 'typewriter'`

**SpriteAnimator:**
- Purpose: Animate sprite frames with position changes
- Location: `src/animation/engine/sprite-animator.js`
- Pattern: Frame-based animation with position interpolation
- Used by: ScenePlayer for `animateSprite` action

**AudioPlayer:**
- Purpose: Background music management
- Location: `src/animation/engine/audio-player.js`
- Pattern: Singleton (window.audioPlayer)
- Key methods: `playMusic()`, `stopMusic()`, `setVolume()`

## Entry Points

**Chapter Players:**
- Location: `src/animation/ch1/ch1-player.html`
- Triggers: User opens file in browser
- Responsibilities: Load design system, animation engine, start chapter playback

**Scene Players (Standalone):**
- Location: `src/animation/ch1/sc1/sc1-intro.html`
- Triggers: User opens file directly (for testing individual scenes)
- Responsibilities: Load single scene without chapter orchestration

**Emulator:**
- Location: `src/animation/emulator/index.html`
- Triggers: User opens file in browser
- Responsibilities: WebMSX emulator interface (separate system)

## Error Handling

**Strategy:** Console logging with graceful degradation

**Patterns:**
- Unknown actions logged as warnings: `console.warn('Unknown action:', action.action)`
- Failed chapter loads show error message in UI: `خطأ في تحميل الفصل`
- Missing music files don't block playback (silently skip)
- try/catch in `initChapter()` catches initialization errors

## Cross-Cutting Concerns

**Logging:**
- Console.log for initialization: `console.log('Chapter 1 started')`
- Console.warn for unexpected actions
- Console.error for load failures

**Timing Coordination:**
- All timing via setTimeout with action.time values
- Pause/resume handled by storing elapsed time
- No requestAnimationFrame (not needed for timeline-based actions)

**Resource Loading:**
- Lazy loading: Scenes loaded on-demand as chapter advances
- No preloading or resource bundling
- Images/audio loaded by browser on reference

**Internationalization:**
- Arabic text in RTL layout: `<html lang="ar" dir="rtl">`
- Arabic fonts via design system: `ff-sakhr` family
- All UI labels in Arabic (buttons: "إعادة", "إيقاف")

---

*Architecture analysis: 2026-01-11*
*Update when major patterns change*
