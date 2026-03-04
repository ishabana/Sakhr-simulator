# Issues Analysis Report

## Reference Implementation: Chapter 1

Chapter 1 establishes the correct patterns that all other chapters must follow:

### Key CH1 Patterns:
1. **Screen Resolution**: 1280x800 fixed container
2. **HTML Structure**: Uses `screen-container` > `scene-container` with proper CSS from design system
3. **CSS Imports**: 
   - `../../../design-system/fonts.css`
   - `../../../design-system/tokens.css`
   - `../../styles/animation-base.css`
   - `../../styles/text-boxes.css`
4. **Script Imports**:
   - `../../engine/typewriter.js`
   - `../../engine/sprite-animator.js`
   - `../../engine/audio-player.js`
   - `../../engine/engine.js`
5. **Frame-by-frame Animation**: Uses `animateSprite` with arrays of frames AND positions
6. **Sprite Sizing**: Uses proper `width` (e.g., "470px", "560px") - proportional to scene
7. **Language**: `lang="ar" dir="rtl"` for Arabic

### Example Correct Pattern (ch1/sc1):
```javascript
{
  "action": "animateSprite",
  "config": {
    "id": "walkingChar",
    "frames": ["1.png", "2.png", "2-1.png", "3.png", "4.png", "5.png", "6.png", "7.png"],
    "positions": [
      {"x": 25, "y": "bottom-75px"},
      {"x": 50, "y": "bottom-75px"},
      {"x": 75, "y": "bottom-75px"},
      // ... each frame has corresponding position
    ],
    "frameDelay": 400,
    "width": "470px",
    "zIndex": 10
  }
}
```

---

## Chapter 2 Issues

### Issue 1: Frame-by-frame Animation Missing
- **Problem**: ch2/sc1 uses CSS animations (`@keyframes rainDrop`) instead of `animateSprite` with positions array
- **scene.txt says**: "frame by frame" sliding but implementation uses smooth CSS animations
- **Fix**: Replace CSS transitions with proper frame-by-frame position arrays

### Issue 2: Sprite Sizing Wrong
- **Problem**: Sprites use small sizes like "200px", "50px"
- **Expected**: Should match ch1 proportions (450-560px for main characters)
- **Fix**: Adjust all sprite widths to proper proportions

### Issue 3: Background Resolution
- **Problem**: Background images may not fill 1280x800
- **Fix**: Ensure `scene-bg` class is applied and backgrounds are proper resolution

### Specific Files Needing Fix:
- `ch2/sc1/sc1-intro.html` - Rain animation should be frame-based
- `ch2/sc2/sc2-intro.html` - Check sizing
- `ch2/sc3/sc3-intro.html` - Check sizing  
- `ch2/sc4/sc4-intro.html` - Check sizing

---

## Chapter 3 Issues

### Issue 1: Not Following Frame-by-frame Pattern
- **Problem**: ch3/sc1 uses CSS animations (`slideFromRight`, `slideRightToLeft`) 
- **scene.txt says**: "frame by frame slide" - explicit requirement
- **Fix**: Replace with `animateSprite` pattern using position arrays

### Issue 2: Wrong Sprite Sizing
- **Problem**: Uses "200px" and "1280px" widths
- **Fix**: Use proportional sizing like ch1

### Issue 3: Custom Functions Instead of Engine
- **Problem**: Implements custom `startLayeredSliding()`, `continueLayeredSliding()` functions
- **Fix**: Should use engine's `animateSprite` action with proper position arrays

### Specific Files Needing Fix:
- `ch3/sc1/sc1-intro.html` - Complete rewrite to use frame-by-frame
- `ch3/sc2/sc2-intro.html` - Check and fix
- `ch3/sc3/sc3-intro.html` - Check and fix
- `ch3/sc5/sc5-intro.html` - Check and fix

---

## Chapter 4 Issues - COMPLETE REDO REQUIRED

### Critical Problems:
1. **Wrong Resolution**: Uses 640x480 and 512x424 instead of 1280x800
2. **No Design System**: Missing CSS imports for fonts, tokens, animation-base
3. **No Engine**: Doesn't use engine.js, sprite-animator.js, etc.
4. **Wrong Language**: Uses `lang="en"` instead of `lang="ar" dir="rtl"`
5. **Custom Play/Reset buttons**: Should auto-play using engine
6. **scene.json wrong format**: Uses `layers` array with different schema than ch1
7. **scene.txt not followed**: 
   - sc4 says: "team.png starts sliding from left to right"
   - Implementation: slides from RIGHT to LEFT

### Files Requiring Complete Rewrite:
- `ch4/sc1/sc1-intro.html` - Complete redo
- `ch4/sc1/scene.json` - Complete redo
- `ch4/sc2/` - Needs creation (missing sc2-intro.html, scene.json)
- `ch4/sc3/sc3-intro.html` - Complete redo  
- `ch4/sc3/scene.json` - Complete redo
- `ch4/sc4/sc4-intro.html` - Complete redo
- `ch4/sc4/scene.json` - Complete redo
- `ch4/scenes.json` - Needs creation

---

## Summary of Required Actions

### Priority 1: Chapter 4 (Complete Redo)
1. Create `ch4/scenes.json`
2. Rewrite all 4 scenes following ch1 patterns:
   - 1280x800 resolution
   - Proper CSS/JS imports
   - Use engine.js and animateSprite
   - Arabic language settings
   - Follow scene.txt requirements exactly

### Priority 2: Chapters 2 & 3 (Fix Issues)
1. Replace CSS animations with frame-by-frame `animateSprite`
2. Fix sprite sizing to match ch1 proportions
3. Ensure backgrounds fill 1280x800
4. Verify all scene.txt requirements are met

### Priority 3: Verify Chapter 1
1. Double-check all scenes work as reference
2. Ensure scenes.json is complete
3. Verify ch1-player-standalone.html works
