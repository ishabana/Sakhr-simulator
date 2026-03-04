# Codebase Concerns

**Analysis Date:** 2026-01-11

## Tech Debt

**No dependency management:**
- Issue: No package.json, no version control for external dependencies (WebMSX)
- Files: `src/animation/emulator/webmsx/WMSX_AX370.js`, `WMSX_Updated.js` (large files, no versioning)
- Why: Quick prototyping, no build system
- Impact: Can't easily update WebMSX, no reproducible builds
- Fix approach: Add package.json, npm scripts, consider CDN links for WebMSX or vendor it properly

**No build process:**
- Issue: Direct file editing with manual browser refresh, no hot reload
- Files: All `.js`, `.html`, `.css` files edited manually
- Why: Simple setup, no tooling required
- Impact: Slower development workflow, no minification/optimization for production
- Fix approach: Add Vite or similar lightweight bundler with dev server

**Inline configuration in HTML:**
- Issue: Scene lists hardcoded in player HTML files
- File: `src/animation/ch1/ch1-player.html` (line 40-48, `CHAPTER_CONFIG` object)
- Why: Avoids CORS issues with file:// protocol
- Impact: Can't reuse player HTML for different chapters, duplication needed
- Fix approach: Generate player HTML from template, or use HTTP server (not file://)

**Global state via window object:**
- Issue: Instances stored on window for cross-module access
- Files: `src/animation/engine/audio-player.js` (window.audioPlayer), `ch1-player.html` (window.chapterPlayer)
- Why: No module system (ES6 modules not used)
- Impact: Namespace pollution, potential conflicts, hard to test
- Fix approach: Migrate to ES6 modules (import/export) with bundler

**Duplicate WebMSX code:**
- Issue: WebMSX files duplicated in `webmsx/` and `webmsx/standalone/`
- Files: `WMSX_AX370.js`, `WMSX_Updated.js` exist in both directories
- Why: Unclear - possibly for different deployment scenarios
- Impact: 2x file size, synchronization issues if one copy updated
- Fix approach: Deduplicate - choose one location, symlink or share config

## Known Bugs

**Scene advancement loops indefinitely:**
- Symptoms: After last scene in chapter, loops back to sc1 (expected per SETUP-GUIDE.md)
- Trigger: Complete all scenes in chapter
- Files: `src/animation/engine/chapter-player.js` (scene advancement logic)
- Workaround: This may be intentional for testing (only sc1 exists currently)
- Root cause: `autoAdvance` with no chapter end handling
- Fix: Add chapter end detection, show "Chapter Complete" screen or return to menu

**Missing background music doesn't fail gracefully:**
- Symptoms: No indication to user if music file missing
- Trigger: Reference `ch1-theme.mp3` that doesn't exist
- Files: `src/animation/engine/audio-player.js`, `ch1/ch1-player.html` (line 64-68)
- Workaround: Music is optional, scene plays without it
- Root cause: No error callback on audio load failure
- Fix: Add onerror handler to Audio element, log or show optional warning

**file:// CORS limitations:**
- Symptoms: Fetch API works for JSON but may fail in some browsers
- Trigger: Open HTML via file:// protocol in strict browser
- Files: `src/animation/engine/chapter-player.js` (fetch scene.json)
- Workaround: Works in Chrome/Firefox (relaxed file:// fetch)
- Root cause: Browser security for local file access
- Fix: Document need for local HTTP server (python -m http.server) or browser flags

## Security Considerations

**No input validation:**
- Risk: Scene JSON loaded without validation
- Files: `src/animation/engine/chapter-player.js` (fetch scene.json), `engine.js` (executeAction)
- Current mitigation: None - assumes trusted JSON files
- Recommendations: Add JSON schema validation (Zod, Ajv) if accepting user-generated scenes

**XSS via text content:**
- Risk: Scene JSON text rendered as innerHTML (if future feature)
- Files: `src/animation/engine/typewriter.js`, `engine.js` (showText method)
- Current mitigation: Text rendered as textContent (safe - no HTML injection observed)
- Recommendations: Continue using textContent, avoid innerHTML for user content

**file:// protocol access:**
- Risk: Local file access if malicious scene.json references `file:///etc/passwd`
- Files: Scene configs reference relative paths: `bg.png`, `1.png`
- Current mitigation: Relative paths only, browser sandboxing
- Recommendations: Validate asset paths are relative (no `../../../` escapes), use CSP headers

## Performance Bottlenecks

**Large sprite images not optimized:**
- Problem: PNG sprites loaded without compression
- Files: `src/animation/ch1/sc1/bg.png` (1280x800), `still.png`, frame pngs
- Measurement: Not measured (likely 500KB-2MB per scene)
- Cause: Original pixel art exported as PNG
- Improvement path: Compress with TinyPNG, consider WebP format, lazy load off-screen scenes

**No asset preloading:**
- Problem: Assets load on-demand during scene playback
- Files: `src/animation/engine/engine.js` (images loaded when sprites created)
- Measurement: Potential 100-500ms delay when sprites first appear
- Cause: No preload phase before scene.play()
- Improvement path: Add `ScenePlayer.preload()` method, preload all assets before timeline starts

**setTimeout precision:**
- Problem: setTimeout not frame-accurate (can drift 10-50ms)
- Files: `src/animation/engine/engine.js` (timeline uses setTimeout for all actions)
- Measurement: Not critical for current use case (80ms typewriter, 400ms frame delays)
- Cause: Browser event loop scheduling
- Improvement path: Use requestAnimationFrame for smoother animations if needed

## Fragile Areas

**Timeline timing coordination:**
- Files: `src/animation/engine/engine.js` (lines 40-55, timeout scheduling)
- Why fragile: Many setTimeout calls, pause/resume interrupts timing
- Common failures: Pause doesn't clear pending timeouts (actions execute during pause)
- Safe modification: Always test pause/resume after changes, clear timeouts on pause
- Test coverage: No automated tests - manual testing required

**Scene JSON structure:**
- Files: `src/animation/ch1/sc1/scene.json`, `engine.js` (executeAction switch)
- Why fragile: No schema validation, typos silently ignored
- Common failures: Misspelled action ("showtext" instead of "showText") logs warning but doesn't error
- Safe modification: Add JSON schema, validate on load
- Test coverage: None - relies on manual testing per scene

**Arabic text rendering:**
- Files: `design-system/fonts.css` (ff-sakhr font), `src/animation/styles/text-boxes.css`
- Why fragile: RTL layout, custom font required
- Common failures: Font not loading (fallback to system font breaks pixel-perfect layout)
- Safe modification: Test Arabic text after font changes, verify RTL direction
- Test coverage: Visual testing only

## Scaling Limits

**Single-threaded JavaScript:**
- Current capacity: ~10-20 simultaneous sprites/animations
- Limit: Browser main thread blocks if too many concurrent animations
- Symptoms at limit: Janky playback, missed frames
- Scaling path: Use Web Workers for heavy computation, or CSS animations for transforms

**File:// protocol deployment:**
- Current capacity: Works for local testing on Raspberry Pi
- Limit: Can't deploy over network without HTTP server
- Symptoms at limit: CORS errors if accessed remotely
- Scaling path: Add simple Node.js HTTP server (express static), or Nginx

**No scene caching:**
- Current capacity: Each scene loads JSON on-demand
- Limit: Network delay (or file read) per scene transition
- Symptoms at limit: Brief pause between scenes
- Scaling path: Preload all chapter scenes at start, cache in memory

## Dependencies at Risk

**WebMSX (unknown version):**
- Risk: Large vendored JS files, no version tracking
- Files: `src/animation/emulator/webmsx/WMSX_AX370.js` (thousands of lines)
- Impact: Can't update to fix bugs or get new features
- Migration plan: Add WebMSX as npm dependency or document version + source

**No font fallback chain:**
- Risk: ff-sakhr font must load or Arabic text breaks
- Files: `design-system/fonts.css` (line ~10, font-family: 'ff-sakhr')
- Impact: If font file missing, Arabic text renders incorrectly
- Migration plan: Add web-safe Arabic fallback: `font-family: 'ff-sakhr', 'Arial', 'Tahoma', sans-serif;`

## Missing Critical Features

**No scene preloading:**
- Problem: Assets load during playback (visible loading delay)
- Current workaround: None - scenes load on-demand
- Blocks: Smooth transitions between scenes
- Implementation complexity: Low - Add preload phase to ScenePlayer

**No error boundary for scenes:**
- Problem: Scene load failure shows generic error, no retry
- Current workaround: Manual page refresh
- Blocks: User recovery from transient failures
- Implementation complexity: Low - Add try/catch with retry button in UI

**No progress indicator:**
- Problem: User doesn't know chapter progress (scene 1 of 5?)
- Current workaround: None
- Blocks: User orientation, estimated time remaining
- Implementation complexity: Low - Add progress dots/bar to UI

**No keyboard navigation:**
- Problem: Arrow keys referenced in SETUP-GUIDE.md but not fully implemented
- Current workaround: Manual scene navigation via restart
- Blocks: Easy testing of different scenes
- Implementation complexity: Medium - Add keydown listeners to chapter player

**No volume control:**
- Problem: Music volume hardcoded (0.7), no UI control
- Current workaround: Edit HTML file to change volume
- Blocks: User preference for audio level
- Implementation complexity: Low - Add volume slider, persist to localStorage

## Test Coverage Gaps

**Engine modules untested:**
- What's not tested: All engine classes (ScenePlayer, ChapterPlayer, TypewriterEffect, etc.)
- Files: `src/animation/engine/*.js`
- Risk: Regressions break scenes silently
- Priority: High
- Difficulty to test: Low - Classes are isolated, can unit test with mock DOM

**Scene rendering:**
- What's not tested: Visual output of scenes
- Files: All scene configurations in `ch1/sc*/scene.json`
- Risk: Styling changes break visual layout
- Priority: Medium
- Difficulty to test: Medium - Requires visual regression testing (Playwright)

**Cross-browser compatibility:**
- What's not tested: Firefox, Safari, mobile browsers
- Files: All HTML/CSS/JS
- Risk: Animations work in Chrome but fail in other browsers
- Priority: Medium (if Raspberry Pi uses Chromium, lower priority)
- Difficulty to test: Low - Manual testing in multiple browsers

**Pause/resume timing:**
- What's not tested: Pause during scene, resume, verify timeline continues correctly
- Files: `src/animation/engine/engine.js` (pause/resume methods)
- Risk: Actions execute at wrong time after resume
- Priority: High (user-facing feature)
- Difficulty to test: Medium - Requires integration test with timing verification

---

*Concerns audit: 2026-01-11*
*Update as issues are fixed or new ones discovered*
