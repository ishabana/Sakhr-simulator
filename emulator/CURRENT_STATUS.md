# Sakhr Emulator - Current Status

**Last Updated:** 2026-01-03

## Project Location
`C:\Users\islam\sakhr-emulator\new\sakhr-web-simulator\src\animation\emulator`

---

## Architecture Overview

### Two-Page Structure
1. **index.html** - ROM selection menu
2. **emulator.html** - WebMSX emulator wrapper

**Why NOT single-page?** Keyboard controls conflict:
- Menu needs: Arrow keys (navigation), Enter (selection)
- Emulator needs: ALL keys forwarded to WebMSX
- Cannot have both on same page without conflicts

### Navigation Flow
```
index.html (ROM menu)
    ↓ User selects ROM
    ↓ sessionStorage.setItem('selectedROM', {...})
    ↓ window.location.href = 'emulator.html'
emulator.html (WebMSX)
    ↓ ESC pressed 3x within 2 seconds
    ↓ window.location.href = 'index.html'
index.html (back to menu)
```

---

## File Structure

### HTML Files
- **index.html** - Entry point, ROM selection menu
- **emulator.html** - WebMSX iframe wrapper with custom controls

### CSS Files (Local Copies)
- **fonts.css** - Font-face declarations for FF Sakhr and MSX International
- **tokens.css** - Design system CSS variables (colors, spacing, typography)

**Why local copies?** Server runs from `emulator/` directory, cannot access parent `../../design-system/` paths.

### Font Files
```
fonts/
  ff-sakhr/
    FFSakhr-Regular.woff
    FFSakhr-Bold.woff
  msx-international/
    msx-international.otf.woff2
    konami-msx-font.otf.woff2
```

### WebMSX Integration
- WebMSX located at: `emulator/webmsx/index.html`
- ROMs located at: `roms/*.rom`

---

## Design System

### Colors (from tokens.css)
```css
--color-black: #000000         /* Main background */
--color-dark-blue: #2424FF     /* Menu box background */
--color-cyan: #00DBDB          /* Borders */
--color-dark-yellow: #DBDB00   /* Accent/highlights */
--color-white: #FFFFFF         /* Text */
--color-gray: #B6B6B6          /* Secondary text */
```

### Typography
```css
--font-arabic: 'FF Sakhr', monospace
--font-english: 'MSX International', monospace
```

### Design Rules
- **NO shadows anywhere** (no text-shadow, no box-shadow)
- **Pure black background** (#000000)
- **Pixel-perfect rendering** (font-smooth: never, -webkit-font-smoothing: none)
- **MSX color palette only**

---

## Current Implementation

### ✅ WORKING Features

#### 1. ROM Selection Menu (index.html)
- Arrow Up/Down navigation
- Enter/Space to select ROM
- Mouse hover and click support
- Visual feedback with cursor indicator (◄)
- Stores selected ROM in sessionStorage
- Navigates to emulator.html

#### 2. ESC Key Handler (emulator.html)
- Press ESC 3 times within 2 seconds to return to menu
- ESC key NOT forwarded to WebMSX (prevents conflicts)
- Counter resets after 2 seconds
- Console logs: `[ESC] Press 1/3`, `[ESC] Press 2/3`, etc.

#### 3. Keyboard Forwarding (emulator.html)
- All keys (except ESC) forwarded to WebMSX iframe
- Dispatches to: iframe window, iframe document, iframe body, canvas element
- Maintains focus on iframe

#### 4. WebMSX Customization
- Screen scaled 1.8x (centered)
- WebMSX UI hidden (logo, bar, notifications, OSD)
- Black background (#000)
- No scrolling, fixed fullscreen

#### 5. Black Loading Screen
- Black loading cover prevents white flash
- Iframe hidden (opacity: 0) until CSS applied
- Smooth fade-in (0.3s) when ready
- Loading cover removed after fade completes

#### 6. Design System Integration
- Local fonts loaded correctly
- MSX color palette applied
- No shadows anywhere
- Pixel-perfect rendering

---

### ⚠️ KNOWN ISSUES

#### 1. Audio Activation (CRITICAL - UNSOLVED)
**Problem:** User must click EACH time a new ROM loads to enable audio.

**Why it happens:**
- Browser autoplay policy requires real user gesture to enable audio
- Each page navigation (`window.location.href`) creates NEW page context
- NEW page = NEW AudioContext that requires NEW user interaction
- localStorage persistence doesn't help (context is destroyed)
- Simulated clicks DON'T count as real user gestures (browser detects them)

**What was tried (all FAILED):**
- ✗ localStorage to persist audio activation state
- ✗ Auto-clicking canvas element in iframe
- ✗ Multiple simulated click events
- ✗ WebMSX API calls (wmsx.room.speaker.powerOn(), mute(false))
- ✗ Dispatching clicks to window, document, body, canvas

**Current workaround:**
User must click on WebMSX screen once per ROM load to enable audio.

**Potential solutions (NOT implemented):**
1. **Single-page app WITHOUT navigation** - Would require solving keyboard control conflicts
2. **Keep WebMSX iframe persistent** - Change src without destroying/recreating iframe
3. **User gesture before navigation** - Activate audio in menu click handler before navigation

---

## Key Code Sections

### index.html - Audio Activation
```javascript
// Lines 270-317
let audioActivated = localStorage.getItem('sakhrAudioActivated') === 'true';

function activateAudio() {
  if (audioActivated) return;

  // Create AudioContext and play silent tone
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.value = 0.001;
  osc.frequency.value = 440;
  osc.start(0);
  osc.stop(ctx.currentTime + 0.001);

  audioActivated = true;
  localStorage.setItem('sakhrAudioActivated', 'true');
}

// Called on ROM selection
function selectROM(index) {
  activateAudio(); // ← Activates audio in THIS page
  sessionStorage.setItem('selectedROM', JSON.stringify(rom));
  window.location.href = 'emulator.html'; // ← Navigation destroys audio context
}
```

### emulator.html - ESC Key Handler
```javascript
// Lines 189-244
let escapeCount = 0;
let escapeTimeout = null;

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    escapeCount++;

    if (escapeTimeout) clearTimeout(escapeTimeout);

    if (escapeCount >= 3) {
      escapeCount = 0;
      goBackToMenu(); // window.location.href = 'index.html'
      return;
    } else {
      escapeTimeout = setTimeout(() => {
        escapeCount = 0;
      }, 2000);
    }
    return; // ← Don't forward ESC to iframe
  }

  // Forward all other keys to iframe...
});
```

### emulator.html - WebMSX CSS Injection
```javascript
// Lines 93-150
webmsxFrame.addEventListener('load', () => {
  try {
    const iframeDoc = webmsxFrame.contentDocument;
    const iframeWin = webmsxFrame.contentWindow;

    // Inject custom CSS
    const style = iframeDoc.createElement('style');
    style.textContent = `
      html, body {
        background: #000 !important;
      }
      #wmsx-screen {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.8);
        transform-origin: center;
      }
      #wmsx-bar { display: none !important; }
      #wmsx-logo { display: none !important; }
      .wmsx-notification { display: none !important; }
    `;
    iframeDoc.head.appendChild(style);

    // Show iframe (fade in)
    webmsxFrame.classList.add('ready');

    // Remove loading cover after fade
    const loadingCover = document.getElementById('loadingCover');
    setTimeout(() => loadingCover.remove(), 300);

    // Hide remaining UI elements after 100ms
    setTimeout(() => {
      // Hide logo, notifications, etc.
      // Attempt audio activation (doesn't work)
    }, 100);
  } catch (e) {
    console.error('[Emulator] Setup failed:', e);
  }
});
```

### emulator.html - Black Loading Cover
```html
<!-- Lines 48-65 CSS -->
<style>
  #webmsxFrame {
    opacity: 0;  /* Hidden until ready */
    transition: opacity 0.3s ease;
  }

  #webmsxFrame.ready {
    opacity: 1;  /* Fade in when CSS applied */
  }

  #loadingCover {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #000000;
    z-index: 9999;
    pointer-events: none;
  }
</style>

<!-- Lines 69-75 HTML -->
<div id="loadingCover"></div>
<div id="emulatorContainer">
  <iframe id="webmsxFrame" src=""></iframe>
</div>
```

---

## Recent Fixes

### 2026-01-03
1. **Black loading screen** - Added loading cover to prevent white flash
2. **Reduced delays** - Changed setTimeout from 1000ms/2000ms to 100ms for faster loading
3. **Direct color values** - Changed `var(--color-black)` to `#000000 !important` in inline styles
4. **Iframe fade-in** - Smooth opacity transition prevents visual jumps

---

## Outstanding Issues

### Priority 1: Audio Activation
**Requirement:** User should click ONCE at server start, not for each ROM.

**Blocker:** Browser security policy + page navigation destroys audio context.

**Needs:** Architectural decision on how to maintain audio context across ROM selections.

---

## Testing Checklist

- [x] Menu displays with correct fonts (FF Sakhr Arabic)
- [x] Menu has black background, no white flash
- [x] Arrow keys navigate menu items
- [x] Enter/Space selects ROM
- [x] ROM loads in emulator
- [x] Emulator has black background (no white flash)
- [x] Emulator screen is properly scaled (1.8x, centered)
- [x] WebMSX UI is hidden (logo, bar, notifications)
- [x] Keyboard input works in emulator
- [x] ESC key requires 3 presses within 2 seconds
- [x] ESC 3x returns to menu
- [x] Can select different ROM and load again
- [ ] Audio works without clicking each ROM load ← **UNSOLVED**

---

## Notes for Future Work

1. **Audio Context Persistence** - Consider keeping iframe alive and changing src instead of navigating
2. **Performance** - Could reduce setTimeout delays further (currently 100ms)
3. **Error Handling** - Add fallback if WebMSX fails to load
4. **ROM Loading** - Could add loading indicator while ROM initializes
5. **Keyboard Layout** - May need to test with different keyboard layouts (Arabic/English)

---

## Developer Commands

### Start Server
```bash
# From emulator directory
python -m http.server 8000
# or
npx http-server -p 8000
```

### Test URLs
- Menu: `http://localhost:8000/index.html`
- Direct emulator (requires ROM in session): `http://localhost:8000/emulator.html`

### Browser Console Logs
```
[Menu] ROM selected: {id, filename, title, path}
[Menu] Stored in session storage
[Emulator] Loading ROM: {id, filename, title, path}
[Emulator] Loading WebMSX: webmsx/index.html?ROM=...
[Emulator] CSS applied to WebMSX
[ESC] Press 1/3
[ESC] Press 2/3
[ESC] Press 3/3
[ESC] 3 presses detected - returning to menu
[Audio] ACTIVATING AUDIO NOW...
[Audio] ✓ AudioContext activated
[Audio] ✓✓✓ ACTIVATION COMPLETE AND SAVED ✓✓✓
```

---

## Contact Context

**User Requirements:**
- Click ONCE at beginning of server for audio (not each ROM)
- ESC 3x within 2 seconds to return to menu
- No loading screen stuck issues
- Black background, no white flashes
- Sakhr design system fonts and colors
- NO shadows anywhere
- Pixel-perfect rendering

**User Frustrations:**
- Audio activation on every ROM load
- White background flashes during loading
- Simulated clicks that don't work

---

End of documentation.
