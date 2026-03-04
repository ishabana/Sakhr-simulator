# Codebase Structure

**Analysis Date:** 2026-01-11

## Directory Layout

```
sakhr-web-simulator/
├── .planning/          # Project planning documents
│   └── codebase/      # Codebase documentation (this doc)
├── assets/            # Static assets (fonts, images, reference)
│   ├── fonts/         # MSX and Sakhr fonts
│   └── reference/     # Authentic Sakhr screenshots
├── design-system/     # Design tokens and styles
│   ├── fonts.css      # Font definitions
│   ├── tokens.css     # CSS variables
│   └── reference.html # Design reference page
├── mfe_v1.6.2_src/    # Legacy MFE source (external)
├── src/animation/     # Animation system (main working area)
│   ├── audio/         # Background music
│   ├── ch1/           # Chapter 1 scenes
│   ├── emulator/      # WebMSX emulator
│   ├── engine/        # Animation engine modules
│   └── styles/        # Animation CSS
├── tools/             # Development utilities
└── *.md               # Project documentation
```

## Directory Purposes

**src/animation/**
- Purpose: Main animation system for Sakhr story
- Contains: Animation engine, chapter players, scene configurations
- Key files: Setup guide, chapter HTML players
- Subdirectories: engine/, ch1/, styles/, audio/, emulator/

**src/animation/engine/**
- Purpose: Core animation engine modules
- Contains: JavaScript classes for scene playback
- Key files:
  - `engine.js` - ScenePlayer class (196 lines)
  - `chapter-player.js` - ChapterPlayer class
  - `typewriter.js` - TypewriterEffect class
  - `sprite-animator.js` - SpriteAnimator class
  - `audio-player.js` - AudioPlayer class
- Subdirectories: None (flat structure)

**src/animation/ch1/**
- Purpose: Chapter 1 content (scenes, players, assets)
- Contains: HTML players, scene directories (sc1/, sc2/, etc.)
- Key files:
  - `ch1-player.html` - Main chapter player
  - `ch1-player-standalone.html` - Standalone version
  - `scenes.json` - Chapter configuration
  - `PROJECT_STATUS.md` - Chapter development status
- Subdirectories: sc1/, sc2/, sc3/, sc4/, sc5/ (scene folders)

**src/animation/ch1/sc1/** (Scene Structure)
- Purpose: Scene 1 assets and configuration
- Contains: Background images, sprite frames, scene config
- Key files:
  - `scene.json` - Timeline and action configuration
  - `bg.png` - Background image (1280x800)
  - `still.png` - Static character sprites
  - `1.png` → `7.png` - Walking animation frames
  - `sc1-intro.html` - Standalone scene player
  - `IMPLEMENTATION-NOTES.md` - Scene-specific notes
  - `ch1sc1.mp3` - Scene audio (optional)
- Pattern: Each scene folder (sc1, sc2, etc.) follows same structure

**src/animation/styles/**
- Purpose: Animation system CSS
- Contains: Base layout and text styling
- Key files:
  - `animation-base.css` - 1280x800 screen container, controls
  - `text-boxes.css` - Text overlay styles (dialog, box, overlay types)
- Subdirectories: None

**src/animation/audio/music/**
- Purpose: Background music storage
- Contains: MP3 files for chapter themes
- Key files: `ch1-theme.mp3` (referenced but optional)
- Subdirectories: None

**src/animation/emulator/**
- Purpose: WebMSX emulator integration
- Contains: MSX emulator HTML/JS, Arabic slideshow
- Key files:
  - `index.html` - Emulator main page
  - `emulator.html` - Emulator interface
  - `fonts.css`, `tokens.css` - Emulator styling
  - `webmsx/` - WebMSX engine
- Subdirectories: webmsx/, webmsx/standalone/

**design-system/**
- Purpose: Shared design tokens and styles
- Contains: Font definitions, CSS variables, reference page
- Key files:
  - `fonts.css` - @font-face for ff-sakhr and MSX fonts
  - `tokens.css` - CSS custom properties (colors, spacing)
  - `reference.html` - Interactive design system demo
- Subdirectories: None

**assets/**
- Purpose: Raw assets (fonts, images, reference materials)
- Contains: Font files, project images, authentic screenshots
- Key subdirectories:
  - `fonts/ff-sakhr/` - Arabic Sakhr font (Regular, Bold)
  - `fonts/msx-international/` - English MSX fonts
  - `reference/` - 24 authentic Sakhr screenshots
- Used by: design-system/fonts.css loads from here

**tools/**
- Purpose: Development utilities
- Contains: Pixel art converter, utilities
- Key subdirectories: `pixel-converter/` (MSX pixel art tool)

**.planning/**
- Purpose: Project planning and documentation
- Contains: GSD workflow documents, codebase analysis
- Key subdirectories: `codebase/` (STACK.md, ARCHITECTURE.md, etc.)

## Key File Locations

**Entry Points:**
- `src/animation/ch1/ch1-player.html` - Chapter 1 player (main entry)
- `src/animation/ch1/sc1/sc1-intro.html` - Scene 1 standalone player
- `src/animation/emulator/index.html` - MSX emulator

**Configuration:**
- `src/animation/ch1/scenes.json` - Chapter 1 scene list
- `src/animation/ch1/sc1/scene.json` - Scene 1 timeline config
- `design-system/tokens.css` - Design tokens (colors, fonts, spacing)

**Core Logic:**
- `src/animation/engine/engine.js` - Scene player (timeline execution)
- `src/animation/engine/chapter-player.js` - Chapter sequencer
- `src/animation/engine/typewriter.js` - Text animation
- `src/animation/engine/sprite-animator.js` - Sprite animation
- `src/animation/engine/audio-player.js` - Audio management

**Testing:**
- Not detected - No test files or test directories

**Documentation:**
- `README.md` - Project overview (root level)
- `src/animation/SETUP-GUIDE.md` - Animation system setup
- `FIGMA-DESIGN-SYSTEM.md` - Complete design specification
- `PROJECT_REVIEW.md` - Project status review
- `CONTINUE_HERE.md` - Development notes

## Naming Conventions

**Files:**
- kebab-case.js: JavaScript modules (`engine.js`, `chapter-player.js`)
- kebab-case.html: HTML pages (`ch1-player.html`, `sc1-intro.html`)
- kebab-case.css: Stylesheets (`animation-base.css`, `text-boxes.css`)
- scene.json: Scene configuration (consistent name per scene folder)
- UPPERCASE.md: Important docs (README.md, SETUP-GUIDE.md)

**Directories:**
- kebab-case: All directories (`design-system`, `src/animation`)
- Short identifiers for scenes: `sc1`, `sc2`, `sc3` (not `scene-01`)
- Short identifiers for chapters: `ch1`, `ch2` (not `chapter-1`)

**Special Patterns:**
- `scene.json` - Standard name for scene config in each scene folder
- `scenes.json` - Standard name for chapter config
- `bg.png` - Background image (consistent per scene)
- `still.png` - Static sprites (consistent per scene)
- `1.png`, `2.png`, etc. - Animation frames (numbered sequence)

## Where to Add New Code

**New Chapter:**
- Primary code: `src/animation/ch2/` (duplicate ch1 structure)
- Entry point: `src/animation/ch2/ch2-player.html`
- Configuration: `src/animation/ch2/scenes.json`
- Pattern: Same structure as ch1

**New Scene:**
- Primary code: `src/animation/ch1/sc6/` (new scene folder)
- Assets: `bg.png`, `still.png`, animation frames in scene folder
- Configuration: `src/animation/ch1/sc6/scene.json`
- Registration: Add `"sc6/scene.json"` to `ch1/scenes.json`

**New Engine Feature:**
- Implementation: `src/animation/engine/new-feature.js`
- Load in player: Add `<script src="../engine/new-feature.js">` to player HTML
- Usage: Call from ScenePlayer.executeAction() if timeline action

**New Scene Action Type:**
- Implementation: Add case to `ScenePlayer.executeAction()` in `engine/engine.js`
- Method: Add new method to ScenePlayer class (e.g., `playVideo()`)
- Usage: Reference in scene.json timeline: `{"action": "playVideo", "config": {...}}`

**New Styling:**
- Global styles: Add to `src/animation/styles/animation-base.css`
- Text styles: Add to `src/animation/styles/text-boxes.css`
- Design tokens: Add to `design-system/tokens.css`

## Special Directories

**src/animation/**
- Purpose: Main working area for animation system
- Source: Created during project development
- Committed: Yes

**mfe_v1.6.2_src/**
- Purpose: Legacy MFE (Micro Frontend) source code (external)
- Source: Imported from external project
- Committed: Yes (for reference)

**assets/reference/**
- Purpose: Authentic Sakhr MSX screenshots (24 images)
- Source: Historical reference materials
- Committed: Yes

**.planning/codebase/**
- Purpose: Generated codebase documentation
- Source: Created by /gsd:map-codebase command
- Committed: Should be (part of project knowledge)

---

*Structure analysis: 2026-01-11*
*Update when directory structure changes*
