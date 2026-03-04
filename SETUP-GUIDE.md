# Animation System Setup Guide

## What We Built

✅ Complete animation engine with:
- Timeline-based scene player
- Typewriter text effects (no sound)
- Sprite animation system
- Background music player
- Auto-advancing scenes
- Chapter player system

✅ Styles optimized for **1280x800 resolution** (GeeekPi 10.1" screen)

✅ Chapter 1 player ready to test with sc1

## File Structure

```
src/animation/
├── engine/                      # Shared animation engine
│   ├── engine.js               # Core scene player
│   ├── typewriter.js           # Text animation
│   ├── sprite-animator.js      # Sprite frame animation
│   ├── audio-player.js         # Background music
│   └── chapter-player.js       # Chapter sequencer
│
├── styles/
│   ├── animation-base.css      # Base 1280x800 layout
│   └── text-boxes.css          # Text styling options
│
├── audio/music/                # Background music (add MP3 files here)
│   └── README.md
│
└── ch1/
    ├── ch1-player.html         ← OPEN THIS TO TEST
    ├── scenes.json             # Chapter 1 scene list
    └── sc1/
        ├── scene.json          # Scene configuration
        ├── bg.png              # Background (should be 1280x800)
        ├── still.png           # Static characters
        └── 1.png → 7.png       # Walking frames
```

## Background & Sprite Sizes for 1280x800

### Your Current Assets Need Adjustment:

**Background (bg.png):**
- Current: Likely 1024x768 or similar
- **Required: 1280 x 800 pixels**
- Action: Resize in your pixel art tool to 1280x800

**Character Sprites:**
- Keep current sizes (450px, 378px)
- No resizing needed - positions adjusted in scene.json

## How to Test Chapter 1

1. **Update background image:**
   ```
   Resize ch1/sc1/bg.png to 1280x800 pixels
   ```

2. **Optional - Add background music:**
   ```
   Place ch1-theme.mp3 in audio/music/
   (Skip if you don't have music yet - scenes work without it)
   ```

3. **Open the player:**
   ```
   Open: src/animation/ch1/ch1-player.html
   In any web browser (Chrome, Firefox, Edge)
   ```

4. **What should happen:**
   - Background appears full screen (1280x800)
   - Text types out character-by-character (no sound)
   - Static characters appear at 7 seconds
   - Walking character animates at 8 seconds
   - Scene auto-advances after 15 seconds (will loop back to sc1)

## Controls (Decorative but Functional)

- **↻ إعادة** - Restart chapter from sc1
- **⏸ إيقاف** - Pause/Resume
- **Arrow Keys** - Navigate scenes (when you have sc2, sc3, etc.)
- **Spacebar** - Pause/Resume
- **R key** - Restart

## Next Steps

### For sc2 (while you work on graphics):

1. Create folder: `ch1/sc2/`
2. Add your graphics:
   - `bg.png` (1280x800)
   - Character sprites
   - Animation frames
3. Create `sc2/scene.json` (copy sc1/scene.json as template)
4. Add `"sc2/scene.json"` to `ch1/scenes.json`

### For Chapters 2, 3, 4:

Just duplicate the ch1 structure:
```
ch2/
├── ch2-player.html
├── scenes.json
└── sc1/
    └── scene.json
```

## Testing on Raspberry Pi

1. Copy entire `src/animation/` folder to Raspberry Pi
2. Open Chromium browser
3. Navigate to `file:///path/to/src/animation/ch1/ch1-player.html`
4. Set browser to fullscreen (F11)

## Current Status

- ✅ Engine complete
- ✅ Ch1 player ready
- ⚠️ bg.png needs resize to 1280x800
- ⚠️ Background music optional (add later)
- ⏳ sc2 waiting for your graphics
