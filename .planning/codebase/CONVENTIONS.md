# Coding Conventions

**Analysis Date:** 2026-01-11

## Naming Patterns

**Files:**
- kebab-case for all JavaScript: `chapter-player.js`, `sprite-animator.js`, `audio-player.js`
- kebab-case for HTML: `ch1-player.html`, `sc1-intro.html`
- kebab-case for CSS: `animation-base.css`, `text-boxes.css`
- scene.json for scene configs (consistent name per folder)
- Numbered sprites: `1.png`, `2.png`, `3.png` (animation frames)
- Descriptive sprites: `bg.png`, `still.png` (background, static characters)

**Functions:**
- camelCase for all functions: `initChapter()`, `togglePause()`, `restartChapter()`
- No special prefix for async functions: `async play()`, `async start()`
- Event handlers: `on` prefix not required (inline onclick="togglePause()")

**Variables:**
- camelCase for variables: `chapterPlayer`, `isPaused`, `startTime`
- UPPER_SNAKE_CASE not used (no constants defined)
- No underscore prefix for private (ES6 classes, no private keyword)

**Classes:**
- PascalCase for class names: `ScenePlayer`, `ChapterPlayer`, `TypewriterEffect`, `SpriteAnimator`, `AudioPlayer`
- Descriptive, noun-based names

**Types:**
- No TypeScript - No interfaces or type definitions

## Code Style

**Formatting:**
- Indentation: 2 spaces
- Line length: No strict limit (some long lines in config objects)
- Quotes: Single quotes for strings (`'text'`)
- Semicolons: Consistently used
- No Prettier config detected

**Linting:**
- No ESLint config detected
- No linting enforced

**Comments:**
- JSDoc-style comments for file headers:
  ```javascript
  /**
   * Animation Engine - Core Scene Player
   * Loads and plays scene configurations with timeline-based actions
   */
  ```
- Inline comments for clarification: `// Clear container`, `// Schedule all timeline actions`
- No function-level JSDoc

## Import Organization

**Pattern:**
- No ES6 imports/exports - Uses browser script loading
- Scripts loaded via `<script src="...">` in HTML
- Load order matters: Engine dependencies loaded before usage

**Script Loading Order (Example from ch1-player.html):**
```html
<script src="../engine/typewriter.js"></script>
<script src="../engine/sprite-animator.js"></script>
<script src="../engine/audio-player.js"></script>
<script src="../engine/engine.js"></script>
<script src="../engine/chapter-player.js"></script>
```

**No Path Aliases:**
- Relative paths only: `../engine/`, `../../design-system/`

## Error Handling

**Patterns:**
- try/catch at initialization boundaries:
  ```javascript
  try {
    await chapterPlayer.start();
  } catch (error) {
    console.error('Failed to start chapter:', error);
    // Show user-facing error message
  }
  ```
- Console warnings for unexpected states: `console.warn('Unknown action:', action.action)`
- Graceful degradation: Missing music doesn't stop playback

**Error Types:**
- Standard Error class (no custom error classes)
- Error messages in English (console) and Arabic (UI)

## Logging

**Framework:**
- Native console methods: `console.log`, `console.warn`, `console.error`
- No logging library

**Patterns:**
- Success logging: `console.log('Chapter 1 started')`
- Warning for unexpected: `console.warn('Unknown action:', action.action)`
- Error with context: `console.error('Failed to start chapter:', error)`

**When:**
- Log initialization success/failure
- Log unexpected states (unknown actions)
- Don't log every action execution (too verbose)

## Comments

**When to Comment:**
- File headers: Purpose of module
  ```javascript
  /**
   * Animation Engine - Core Scene Player
   * Loads and plays scene configurations with timeline-based actions
   */
  ```
- Section headers: `// Clear container`, `// Schedule all timeline actions`
- Complex logic: Explain why, not what
- Avoid obvious comments: Code is generally self-documenting

**JSDoc/TSDoc:**
- Not used for functions or parameters
- File-level comments only

**TODO Comments:**
- Not observed in codebase
- Pattern (if needed): `// TODO: description`

## Function Design

**Size:**
- Varies widely: Some methods 5-10 lines, others 50+ lines
- No strict limit enforced
- `ScenePlayer.executeAction()` is a large switch statement

**Parameters:**
- Typically 1-2 parameters: `constructor(sceneConfig, container)`
- Object parameters for config: `play(action)`, `showText(config)`
- Destructuring not used in parameters

**Return Values:**
- Explicit returns where needed
- No implicit undefined returns documented
- Async functions return Promises (async/await pattern)

## Module Design

**Exports:**
- No ES6 exports - Classes defined globally
- Pattern: `class ScenePlayer { ... }` (implicitly global)
- Window object for singletons: `window.audioPlayer = new AudioPlayer()`

**Globals:**
- Classes are global: `ScenePlayer`, `ChapterPlayer`, `TypewriterEffect`
- Player instances stored in window: `window.chapterPlayer = chapterPlayer`
- Inline configs in HTML: `const CHAPTER_CONFIG = {...}`

**No Module Bundler:**
- No webpack, Rollup, or bundler
- Each script is self-contained
- Shared via global scope

## HTML Structure

**Pattern:**
- Arabic RTL layout: `<html lang="ar" dir="rtl">`
- CSS loaded in <head>: Design system first, then animation styles
- Scripts loaded at end of <body>: Engine scripts, then inline init
- Inline JavaScript for initialization: `<script>async function initChapter() {...}</script>`

**Controls:**
- Inline event handlers: `onclick="restartChapter()"`
- Arabic labels: `<button class="btn arabic-text" onclick="togglePause()">⏸ إيقاف</button>`

## CSS Structure

**Pattern:**
- CSS custom properties (variables) in design-system/tokens.css:
  ```css
  :root {
    --color-primary: #00ff41;
    --font-arabic: 'ff-sakhr', ...;
  }
  ```
- BEM-like naming (not strict): `.scene-container`, `.text-overlay`, `.text-box`
- Class-based styling (no IDs for styling)

**Responsive:**
- Fixed 1280x800 resolution (target: Raspberry Pi screen)
- No media queries (single target resolution)

## Scene Configuration (JSON)

**Pattern:**
```json
{
  "duration": 15000,
  "background": "bg.png",
  "autoAdvance": true,
  "timeline": [
    {
      "time": 0,
      "action": "showText",
      "config": { ... }
    }
  ]
}
```

**Conventions:**
- Durations in milliseconds
- Relative paths for assets: `"bg.png"`, `"still.png"`
- camelCase for keys: `autoAdvance`, `advanceDelay`
- Nested config objects for action details

---

*Convention analysis: 2026-01-11*
*Update when patterns change*
