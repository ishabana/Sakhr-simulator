# Scene 2 (sc2) - Space Invaders Assets

## Required Assets for 1280x800 Resolution

### Character Sprites

**1.png** - Character idle/moving state
- Size: ~200-250px wide
- Character standing (from your reference image)
- Scaled for 1280x800 screen

**2.png** - Character shooting state
- Size: Same as 1.png
- Character in shooting pose
- Should match 1.png size exactly

### Audio

**hit.mp3** (Optional)
- Short sound effect (0.1-0.3 seconds)
- Plays when bullet hits invader
- MSX-style beep or explosion sound
- Location: Place in `../../audio/music/hit.mp3`

## Current Implementation

The scene uses:
- **Invaders**: Emoji sprites (👾 👽 🛸 💀) in MSX colors
- **Bullets**: Arabic letter ع variations (ع، عـ ، ـعـ ، ـع)
- **Background**: Pure black (#000000)
- **Duration**: Exactly 12 seconds
- **Gameplay**: Automated (character moves and shoots automatically)

## How It Works

1. Character moves left/right automatically
2. Shoots Arabic letters every 800ms
3. Letters cycle through 4 variations
4. When bullet hits invader → explosion + sound
5. After 12 seconds → scene ends → next scene

## To Test

1. Add `1.png` and `2.png` to this folder
2. (Optional) Add `hit.mp3` sound effect
3. Open `sc2-game.html` directly to test
