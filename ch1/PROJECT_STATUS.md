# Chapter 1 - Project Status & Documentation

**Last Updated:** 2026-01-01
**Status:** ✅ All 5 scenes refactored into separate files

---

## 📁 Current File Structure

```
ch1/
├── ch1-player-standalone.html          Main orchestrator (loads all scenes via iframes)
├── PROJECT_STATUS.md                   This file
│
├── sc1/                                Scene 1 - Intro
│   ├── sc1-intro.html                  ✅ Separate file (can edit independently)
│   ├── README.md
│   ├── bg.png
│   ├── still.png
│   └── 1.png, 2.png, 2-1.png, 3.png, 4.png, 5.png, 6.png, 7.png
│
├── sc2/                                Scene 2 - Space Invaders Game
│   ├── sc2-game.html                   ✅ Separate file (can edit independently)
│   ├── README.md
│   └── assets...
│
├── sc3/                                Scene 3 - Two Characters
│   ├── sc3-characters.html             ✅ Separate file (can edit independently)
│   ├── README.md
│   ├── bg.png
│   └── 01.png, 02.png, 03.png, 1.png, 2.png, 3.png, 4.png, 5.png
│
├── sc4/                                Scene 4 - TV Screen
│   ├── sc4-tv-screen.html              ✅ Separate file (can edit independently)
│   ├── README.md
│   ├── still.png
│   └── 1.png
│
└── sc5/                                Scene 5 - Chipboard Packaging
    ├── sc5-packaging.html              ✅ Separate file (can edit independently)
    ├── README.md
    ├── 1.png
    ├── 2-1.png
    └── 2-2.png
```

---

## 🎬 Scene Details

### Scene 1 - Intro (15 seconds)
**File:** `sc1/sc1-intro.html`
**Type:** Timeline-based (uses ScenePlayer engine)
**Features:**
- Typewriter text animation with Arabic narration
- Static characters appear at 7s
- Walking character animation at 8s (8 frames, 400ms each)
- Background music: `ch1-theme.mp3`
- Auto-advances to sc2 on completion

**Key Configuration:**
- Duration: 15000ms
- Background: `bg.png`
- Text appears at center, 10% from top
- Sprites: `still.png` (560px), walking character frames (470px)

---

### Scene 2 - Space Invaders Game (42 seconds)
**File:** `sc2/sc2-game.html`
**Type:** Custom JavaScript game
**Features:**
- Retro Space Invaders gameplay
- Invaders slide down slowly (2px per 150ms)
- Character shoots when invaders partially visible (y >= -50)
- Random bullet positioning and character movement
- Collision detection with explosion effects
- Crash sound effect (1.5s)

**Key Configuration:**
- Duration: 42000ms (auto-advance via timeout in main player)
- Invader grid: 8 columns × 3 rows
- Frame-based sprite animation (52px increments)
- Random movement: 20-60px jumps, 20% direction change

---

### Scene 3 - Two Characters (20 seconds)
**File:** `sc3/sc3-characters.html`
**Type:** Timeline-based (uses ScenePlayer engine)
**Features:**
- Character 1 (left, 480px): Plays 01→02→03 once (600ms per frame)
- Character 2 (right, 400px): Starts at 1800ms, plays sequence: 1→2→3→4→3→4→3→4→5→4→5→4→5
- Both characters positioned at bottom-50px
- Auto-advances to sc4 on completion

**Key Configuration:**
- Duration: 20000ms
- Background: `bg.png`
- Char1 position: 15% from left
- Char2 position: 20% from right
- Frame delay: 600ms for both

---

### Scene 4 - TV Screen (15 seconds)
**File:** `sc4/sc4-tv-screen.html`
**Type:** Custom CSS/JS animation
**Features:**
- Blue background (#2424B6)
- Still image wipes down from top (CSS clip-path, 2s)
- TV screen zooms from 0→300px (2s, starts at 2.5s)
- TV screen slides right to left (50px per frame, 400ms, starts at 5s)
- Auto-advances to sc5 on completion

**Key Configuration:**
- Still image: 800px wide, centered
- TV screen starts at x: 980px, y: 200px
- Exits screen at x: -300px
- Total animation: ~13 seconds + 1s delay

---

### Scene 5 - Chipboard Packaging (15-20 seconds)
**File:** `sc5/sc5-packaging.html`
**Type:** Custom JavaScript animation
**Features:**
- Black background (#000000)
- Chipboard (1.png) slides from right to center (50px per frame, 400ms)
- Once centered, packaging animation starts:
  - Top cover (2-1.png) slides down from y: -400 to y: 230
  - Bottom cover (2-2.png) slides up from y: 800 to y: 230
  - Both move 25px per frame, 400ms interval
- Smart endpoint detection (no jump on last frame)
- Z-index layering: 2-2 (z:3) < chipboard (z:5) < 2-1 (z:10)

**Key Configuration:**
- Chipboard: 300px wide, starts at x: 980, ends at x: 490 (centered)
- Covers: 400px wide, centered horizontally
- Top target: y: 230px
- Bottom target: y: 230px
- Auto-advances to sc1 (loop) after 2s delay

---

## 🔧 How to Edit Scenes

### Editing Individual Scenes:

1. **Open the scene file directly** in your editor:
   - Scene 1: `src/animation/ch1/sc1/sc1-intro.html`
   - Scene 2: `src/animation/ch1/sc2/sc2-game.html`
   - Scene 3: `src/animation/ch1/sc3/sc3-characters.html`
   - Scene 4: `src/animation/ch1/sc4/sc4-tv-screen.html`
   - Scene 5: `src/animation/ch1/sc5/sc5-packaging.html`

2. **Test scene independently**:
   - Open the scene file directly in browser
   - No need to run full sequence

3. **Common edits**:
   - **Timings**: Look for `frameDelay`, `setTimeout`, `setInterval` values
   - **Positions**: Look for `x`, `y`, `top`, `left`, `width` properties
   - **Animation speeds**: Adjust millisecond values (400ms, 600ms, etc.)
   - **Image sizes**: Change `width` properties in CSS

### Editing Main Player:

**File:** `ch1-player-standalone.html`

- **Scene sequence**: Line 43 - `const scenes = ['sc1', 'sc2', 'sc3', 'sc4', 'sc5']`
- **Scene loading**: Each `playSceneX()` function loads an iframe
- **Scene completion**: Global message listener at line 230

---

## 🎨 Asset Requirements

### Scene 1 Assets:
- ✅ bg.png (background)
- ✅ still.png (560px wide)
- ✅ 1.png, 2.png, 2-1.png, 3.png, 4.png, 5.png, 6.png, 7.png (walking frames, 470px)
- ✅ ../../audio/music/ch1-theme.mp3 (background music)

### Scene 3 Assets:
- ✅ bg.png (background)
- ✅ 01.png, 02.png, 03.png (char1 frames, 480px)
- ✅ 1.png, 2.png, 3.png, 4.png, 5.png (char2 frames, 400px)

### Scene 4 Assets:
- ✅ still.png (800px wide)
- ✅ 1.png (300px when zoomed)

### Scene 5 Assets:
- ✅ 1.png (chipboard, 300px)
- ✅ 2-1.png (top cover, 400px)
- ✅ 2-2.png (bottom cover, 400px)

---

## 🔄 Scene Flow & Auto-Advance

```
Start Screen (ابدأ button)
    ↓
SC1 (15s) → [postMessage: 'sc1-complete']
    ↓
SC2 (42s) → [setTimeout: 42000ms]
    ↓
SC3 (20s) → [postMessage: 'sc3-complete']
    ↓
SC4 (15s) → [postMessage: 'sc4-complete']
    ↓
SC5 (20s) → [postMessage: 'sc5-complete']
    ↓
(Loop back to SC1)
```

**Manual Control:**
- **Next button** (التالي ►): Skip to next scene immediately
- **Keyboard**: Arrow Right / N key also advances
- **Cleanup**: All timers cleared before scene transition

---

## 🛠️ Technical Architecture

### Main Player (`ch1-player-standalone.html`):
- **Purpose**: Scene orchestrator and sequencer
- **Size**: ~120 lines (reduced from 250)
- **Responsibilities**:
  - Load scenes in iframes
  - Handle scene transitions
  - Listen for completion messages
  - Manage Next button and keyboard controls
  - Clean up timers on transition

### Scene Files:
- **Self-contained**: Each includes all dependencies
- **Engine scripts** (sc1, sc3):
  - typewriter.js, sprite-animator.js, audio-player.js, engine.js
  - Path: `../../engine/` (from scene file)
- **CSS dependencies**:
  - Design system: `../../../design-system/`
  - Animation styles: `../../styles/`
- **Communication**: Use `window.parent.postMessage()` to signal completion

### Cleanup System:
- `activeTimeouts[]` - tracks all setTimeout IDs
- `activeIntervals[]` - tracks all setInterval IDs
- `cleanupScene()` - clears all timers, resets container
- Called automatically when Next button clicked

---

## 🎯 Recent Changes (2026-01-01)

### Major Refactoring Completed:
1. ✅ Separated all scenes into individual HTML files
2. ✅ Simplified main player to just iframe loading
3. ✅ Fixed all relative paths for nested scene files
4. ✅ Removed duplicate engine includes from main player
5. ✅ Implemented global message listener for scene completion
6. ✅ Scene 5 packaging animation with smart frame detection

### Path Corrections Applied:
- CSS: Changed from `../../` to `../../../` for design-system
- CSS: Changed from `../` to `../../` for animation styles
- Scripts: Changed from `../` to `../../` for engine files
- Audio: Changed from `../` to `../../` for audio files

---

## 📝 Known Configuration

### Animation Timing Standards:
- **Frame delays**: 400ms (fast action), 600ms (character animation)
- **Position increments**: 25px (packaging), 50px (sliding)
- **Transition durations**: 2s (CSS animations)

### Screen Dimensions:
- **Canvas**: 1280px × 800px (MSX-2 aspect ratio)
- **Typography**: 'FF Sakhr' monospace font

### Color Palette:
- **Primary Blue**: #2424B6 (sc4 background)
- **Black**: #000000 (sc5 background)
- **White**: #FFFFFF (text)
- **Gold**: #FFD700 (accents)

---

## 🚀 Next Steps / Future Work

### Potential Improvements:
- [ ] Add loading indicators for scene transitions
- [ ] Implement progress bar showing scene sequence
- [ ] Add scene restart button (individual scene reset)
- [ ] Create scene thumbnails for navigation
- [ ] Add volume controls for audio
- [ ] Export scenes as standalone demos

### Testing Needed:
- ✅ Scene 1-5 individual file testing
- ✅ Full sequence playthrough
- ✅ Next button functionality
- ✅ Scene cleanup on transition
- [ ] Performance on slower devices
- [ ] Cross-browser compatibility

---

## 📚 Related Documentation

- **Scene 1**: See `sc1/README.md` for asset specs
- **Scene 2**: See `sc2/README.md` for game mechanics
- **Scene 3**: See `sc3/README.md` for character animation details
- **Scene 4**: See `sc4/README.md` for TV screen animation
- **Scene 5**: See `sc5/README.md` for packaging animation

---

## 🔗 Tools & Resources

### Image Generation:
- **8-Bit Retro Converter**: `tools/style-transfer/`
  - Run: `venv\Scripts\activate && python server.py`
  - Access: http://localhost:5001
  - Use MSX-2 preset for consistent style

### Frame Generation:
- **Stop Motion Tool**: `tools/stop-motion-project/`
  - Configured with .env API token
  - Auto-inference provider

---

## 💡 Tips for Editing

1. **Always test scene files individually first** before testing full sequence
2. **Use browser DevTools** to adjust positions/timings in real-time
3. **Keep backup copies** before major animation changes
4. **Match existing timing patterns** (400ms/600ms) for consistency
5. **Check z-index layering** when adding new sprites
6. **Use frame-by-frame intervals** (not CSS transitions) for pixel-perfect control

---

## 📞 Quick Reference

### File Locations:
- Main player: `src/animation/ch1/ch1-player-standalone.html`
- Engine scripts: `src/animation/engine/`
- Styles: `src/animation/styles/`
- Design system: `src/design-system/`

### Common Values:
- Fast frame delay: `400ms`
- Slow frame delay: `600ms`
- Small movement: `25px`
- Large movement: `50px`
- Short pause: `500ms`
- Medium pause: `1000ms`
- Long pause: `2000ms`

---

**Project is ready to continue!** All scenes are modular and independently editable. 🎉
