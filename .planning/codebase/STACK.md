# Technology Stack

**Analysis Date:** 2026-01-11

## Languages

**Primary:**
- JavaScript ES6 - All application code (animation engine, chapter player, emulator scripts)
- HTML5 - Scene players, emulator interfaces
- CSS3 - Styling and animations

**Secondary:**
- JSON - Scene configuration files (`ch1/sc1/scene.json`, `ch1/scenes.json`)

## Runtime

**Environment:**
- Web Browser (Chrome, Firefox, Edge, Chromium on Raspberry Pi)
- No server required - runs entirely client-side via file:// protocol

**Package Manager:**
- Not detected - No package.json or dependency management
- Uses vanilla JavaScript (no build step)

## Frameworks

**Core:**
- None - Vanilla JavaScript implementation
- No UI frameworks (React, Vue, etc.)

**Testing:**
- Not detected

**Build/Dev:**
- None - No build process or bundler
- Direct script loading via <script> tags

## Key Dependencies

**Critical:**
- None - No external libraries or npm packages
- All functionality implemented from scratch

**Infrastructure:**
- Browser APIs only:
  - DOM manipulation
  - setTimeout/setInterval for timing
  - HTML5 Audio API - `audio/music/*.mp3` for background music
  - Fetch API - Loading JSON scene configs
  - Canvas API (likely in emulator) - Not yet explored

## Configuration

**Environment:**
- No environment variables
- Configuration via inline JavaScript objects in HTML files
- Example: `ch1/ch1-player.html` contains `CHAPTER_CONFIG` object

**Build:**
- No build configuration
- No TypeScript, Babel, or transpilation
- Direct browser execution

## Platform Requirements

**Development:**
- Any platform with modern web browser
- Text editor for editing JS/HTML/CSS/JSON
- No external dependencies or tooling

**Production:**
- Target: Raspberry Pi with 10.1" screen (1280x800 resolution)
- Browser: Chromium in fullscreen mode (F11)
- Deployment: Copy files to device, open HTML in browser
- No server hosting required (static files)

---

*Stack analysis: 2026-01-11*
*Update after major dependency changes*
