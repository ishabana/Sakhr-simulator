# Sakhr WebMSX Emulator - Development Progress

## Project Overview
**Location:** `C:\Users\islam\sakhr-emulator\new\sakhr-web-simulator\src\animation\emulator`

A self-contained WebMSX emulator ROM loader with Arabic-first UI using the Sakhr design system. Users can select from a grid of ROM cartridges and launch them in a fullscreen WebMSX emulator.

---

## Current Status: ✅ FULLY FUNCTIONAL

### What Works
- ✅ ROM selection grid with 2-column layout
- ✅ Arabic RTL interface using Sakhr design tokens
- ✅ Keyboard navigation (arrow keys) and mouse selection
- ✅ Automatic ROM loading into WebMSX emulator
- ✅ Fullscreen emulator view (scaled 1.8x, no scroll)
- ✅ Hidden WebMSX control bar
- ✅ Automatic keyboard focus (no click required)
- ✅ ESC key to return to menu
- ✅ Session storage for ROM state management

### Known Limitations
- ⚠️ **Audio requires one user interaction** (any keypress/click) - Browser security policy, cannot be bypassed
- ⚠️ First interaction enables audio permanently for the session

---

## Project Structure

```
emulator/
├── index.html          # ROM selection grid page
├── emulator.html       # WebMSX emulator loader
├── start.bat           # Launch script (Python/Node server)
├── fonts.css           # MSX font definitions
├── tokens.css          # Sakhr design system tokens
├── PROGRESS.md         # This file
├── webmsx/             # Complete WebMSX standalone emulator
│   ├── index.html      # WebMSX main file
│   ├── WMSX_AX370.js   # Sakhr-specific configuration
│   └── ...             # Other WebMSX files
├── roms/               # ROM cartridge files
│   ├── abc_arabic.rom
│   ├── believe_or_not.rom
│   ├── double_face.rom
│   ├── holy_quran.rom
│   └── ibn_sina1.rom
└── images/             # ROM cover images (optional)
    ├── abc-arabic.png
    ├── believe-or-not.png
    ├── double-face.png
    ├── holy-quran.png
    └── ibn-sina.png
```

---

## How to Use

### 1. Start the Server
```bash
# Run the start.bat file
start.bat

# Server will start on http://localhost:8082
# Browser opens automatically to index.html
```

### 2. Navigate the ROM Grid
- **Mouse:** Click any ROM card
- **Keyboard:**
  - Arrow keys to navigate
  - Enter/Space to select and launch

### 3. Use the Emulator
- Emulator loads automatically with selected ROM
- Keyboard input works immediately (no click needed)
- Audio enables on first keypress/click
- **ESC key:** Returns to ROM selection menu

---

## ROM Database

Current ROMs configured in `index.html`:

```javascript
const ROMS = [
  {
    id: 'abc-arabic',
    filename: 'abc_arabic.rom',
    title: 'ABC العربية',
    path: 'roms/abc_arabic.rom',
    image: 'images/abc-arabic.png'
  },
  {
    id: 'believe-or-not',
    filename: 'believe_or_not.rom',
    title: 'صدق أو لا تصدق',
    path: 'roms/believe_or_not.rom',
    image: 'images/believe-or-not.png'
  },
  {
    id: 'double-face',
    filename: 'double_face.rom',
    title: 'الوجه المزدوج',
    path: 'roms/double_face.rom',
    image: 'images/double-face.png'
  },
  {
    id: 'holy-quran',
    filename: 'holy_quran.rom',
    title: 'القرآن الكريم',
    path: 'roms/holy_quran.rom',
    image: 'images/holy-quran.png'
  },
  {
    id: 'ibn-sina',
    filename: 'ibn_sina1.rom',
    title: 'ابن سينا',
    path: 'roms/ibn_sina1.rom',
    image: 'images/ibn-sina.png'
  }
];
```

**To add new ROMs:**
1. Place `.rom` file in `roms/` directory
2. Add entry to `ROMS` array in `index.html`
3. Optionally add cover image to `images/`

---

## Technical Implementation Details

### ROM Selection Page (index.html)

**Key Features:**
- 2-column CSS Grid layout
- Keyboard navigation with arrow keys
- Session storage for ROM selection
- Responsive design (1 column on mobile)
- Sakhr design system styling

**How it works:**
```javascript
function loadROM(index) {
  const rom = ROMS[index];
  sessionStorage.setItem('selectedROM', JSON.stringify(rom));
  window.location.href = 'emulator.html';
}
```

### Emulator Page (emulator.html)

**Critical Configuration:**

1. **No Scrolling CSS:**
```css
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  background: #000000;
}
```

2. **WebMSX URL Parameters:**
```javascript
const webmsxURL = `${webmsxPath}?ROM=${encodeURIComponent(romPath)}&SCREEN_FULLSCREEN_MODE=0&AUTO_START=true&AUTO_POWER_ON_DELAY=0`;
```
- `SCREEN_FULLSCREEN_MODE=0`: Windowed mode (we scale with CSS)
- `AUTO_START=true`: Auto-run ROM
- `AUTO_POWER_ON_DELAY=0`: No boot delay

3. **Screen Scaling (injected CSS):**
```javascript
const style = iframeDoc.createElement('style');
style.textContent = `
  #wmsx-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.8);
    transform-origin: center;
  }
  #wmsx-bar { display: none !important; }
`;
iframeDoc.head.appendChild(style);
```

4. **Keyboard Auto-Focus (3 mechanisms):**

**a) Iframe auto-focus on load:**
```html
<iframe id="webmsxFrame" onload="this.contentWindow.focus();"></iframe>
```

**b) Click refocus listener:**
```javascript
document.addEventListener('click', function(event) {
  if (event.target.tagName !== 'IFRAME') {
    webmsxFrame.contentWindow.focus();
  }
});
```

**c) Keyboard event forwarding:**
```javascript
document.addEventListener('keydown', function(e) {
  const iframeWin = webmsxFrame.contentWindow;
  const iframeDoc = webmsxFrame.contentDocument;

  const eventInit = {
    key: e.key,
    code: e.code,
    keyCode: e.keyCode,
    // ... full keyboard event properties
  };

  // Forward to window, document, body, canvas
  iframeWin.dispatchEvent(new KeyboardEvent('keydown', eventInit));
  iframeDoc.dispatchEvent(new KeyboardEvent('keydown', eventInit));
  iframeDoc.body.dispatchEvent(new KeyboardEvent('keydown', eventInit));

  const canvas = iframeDoc.querySelector('canvas');
  if (canvas) {
    canvas.dispatchEvent(new KeyboardEvent('keydown', eventInit));
  }
});
```

---

## Issues Solved During Development

### Issue 1: Infinite Loading Screen ✅ FIXED
**Problem:** Loading screen never disappeared despite emulator loading successfully

**Solution:**
- Changed from `opacity: 0` to `display: none !important`
- Removed all setTimeout delays
- Loading screen now hidden immediately

### Issue 2: Persistent Scrolling ✅ FIXED
**Problem:** Page had vertical scrolling despite multiple attempts

**Root cause:** External CSS files (fonts.css, tokens.css) adding conflicting styles

**Solution:**
- Commented out external CSS in emulator.html
- Used `position: fixed` on html/body
- Applied `overflow: hidden` at all levels
- Avoided `100vw/100vh` (causes scroll with scrollbar)

### Issue 3: Screen Cropping ✅ FIXED
**Problem:** WebMSX screen cropped or too small

**Failed approaches:**
- `SCREEN_FULLSCREEN_MODE=1` (browser fullscreen) - cropped
- `SCREEN_FULLSCREEN_MODE=2` (full windowed) - cropped

**Solution:**
- `SCREEN_FULLSCREEN_MODE=0` (default size)
- CSS `transform: scale(1.8)` on `#wmsx-screen`
- Centered with `translate(-50%, -50%)`

### Issue 4: Audio Not Auto-Enabling ⚠️ BROWSER LIMITATION
**Problem:** Audio muted on load

**Attempted solutions (all failed):**
- Auto-clicking iframe/canvas
- WebMSX API `wmsx.room.speaker.muteControl(false)`
- Hidden click prompts

**Reality:** Browser security requires user interaction for audio - cannot be bypassed

**Workaround:** One keypress/click enables audio for entire session

### Issue 5: Keyboard Not Working Without Click ✅ FIXED
**Problem:** Had to click iframe before keyboard input worked

**Failed attempts:**
- `webmsxFrame.focus()`
- `webmsxFrame.contentWindow.focus()` (timing issues)
- `canvas.focus()`
- `setInterval` aggressive refocusing

**Solution (from web research):**
- `onload="this.contentWindow.focus();"` on iframe tag
- Click refocus listener for maintenance
- Full keyboard event forwarding

**Sources:**
- https://supernapie.com/blog/keyboard-focus-in-an-iframe/
- Adobe Animate community forums

---

## WebMSX Configuration

### Sakhr AX-370 Settings
File: `webmsx/WMSX_AX370.js`

The WebMSX emulator is pre-configured for Sakhr AX-370 (Arabic MSX computer):
- MSX2 hardware mode
- Arabic character support
- Authentic Sakhr BIOS

### Available URL Parameters
Discovered from `webmsx/index.html`:

- `ROM`: Path to ROM file
- `SCREEN_FULLSCREEN_MODE`: 0=windowed, 1=browser fullscreen, 2=full windowed
- `AUTO_START`: Auto-run ROM (true/false)
- `AUTO_POWER_ON_DELAY`: Delay before auto-start (ms)
- `AUDIO_MONITOR_BUFFER_BASE`: Audio buffer size
- Many more in WebMSX documentation

---

## Development Notes

### Same-Origin Policy
All files are served from same origin (localhost:8082), allowing:
- Full iframe access via `contentWindow` and `contentDocument`
- CSS injection into iframe
- JavaScript communication between parent and iframe
- Keyboard event forwarding

### Browser Security Limitations
Cannot bypass:
- Audio autoplay policy (requires user gesture)
- Some fullscreen APIs without user interaction

### Tested Browsers
- Chrome/Edge (Chromium) - ✅ Works
- Firefox - ✅ Should work (same-origin)
- Safari - ⚠️ Untested (may have stricter policies)

---

## Future Enhancements (Optional)

### High Priority
- [ ] Add ROM cover images to `images/` directory
- [ ] Test on Firefox and Safari
- [ ] Add loading progress indicator for large ROMs

### Medium Priority
- [ ] Save state functionality (WebMSX supports this)
- [ ] Favorite ROMs feature
- [ ] ROM categories/filters
- [ ] Search functionality

### Low Priority
- [ ] Gamepad support
- [ ] Virtual keyboard for mobile
- [ ] Screenshot capture
- [ ] ROM metadata (year, developer, description)
- [ ] MSX keyboard overlay/help

### Visual Polish
- [ ] CRT shader effects
- [ ] Scanline overlay (already in tokens.css)
- [ ] Boot animation
- [ ] Sound on ROM selection

---

## Troubleshooting

### Server Won't Start
**Check:**
- Python or Node.js installed?
- Port 8082 available?
- Run from `emulator/` directory

**Fix:**
```bash
# Check Python
python --version

# Check Node
node --version

# Try manual server start
python -m http.server 8082
# or
npx http-server -p 8082
```

### ROM Won't Load
**Check:**
1. ROM file exists in `roms/` directory
2. ROM entry in `ROMS` array has correct path
3. Browser console for errors (F12)

### Keyboard Not Working
**Check:**
1. Click/press any key once (enables audio + confirms focus)
2. Check browser console for CORS errors
3. Verify WebMSX loaded successfully

### Audio Not Working
**Expected:** First keypress/click enables audio (browser security)

**If still no audio:**
1. Check browser isn't muted
2. Check system volume
3. Try different ROM (some ROMs may not have sound)

---

## Important File Locations

### Modified WebMSX Files
- `webmsx/index.html` - Entry point for WebMSX
- `webmsx/WMSX_AX370.js` - Sakhr configuration

### Custom Files
- `index.html` - ROM grid (completely custom)
- `emulator.html` - Loader wrapper (completely custom)
- `start.bat` - Server launcher (completely custom)

### Design System
- `fonts.css` - MSX authentic fonts
- `tokens.css` - Sakhr design tokens (colors, spacing, typography)

---

## Git/Version Control Notes

### What to Commit
- ✅ `index.html`, `emulator.html`
- ✅ `fonts.css`, `tokens.css`
- ✅ `start.bat`
- ✅ `PROGRESS.md`
- ✅ `webmsx/` directory (entire WebMSX)
- ⚠️ `roms/*.rom` - Large binary files (use Git LFS or .gitignore)
- ⚠️ `images/*.png` - Optional cover art

### Suggested .gitignore
```gitignore
# ROM files (large binaries)
roms/*.rom

# Optional: Images if very large
images/*.png

# OS files
.DS_Store
Thumbs.db
```

---

## Key Learnings

### CSS for Fullscreen Iframe Without Scroll
- Use `position: fixed` + `overflow: hidden` on html, body, container
- Avoid `100vw/100vh` (can cause scrollbar)
- Don't import external CSS that might add margins/padding

### Same-Origin Iframe Keyboard Focus
- `onload="this.contentWindow.focus();"` is the standard solution
- Requires same-origin (localhost to localhost)
- Add click refocus listener for robustness
- Event forwarding provides extra fallback

### Browser Audio Policies
- Autoplay blocked without user gesture (2018+ all browsers)
- User gesture = click, keypress, touch
- Cannot be bypassed programmatically
- One gesture enables audio for entire session

### WebMSX Integration
- Use `SCREEN_FULLSCREEN_MODE=0` + CSS scaling (more control)
- Inject CSS into iframe for custom styling
- WebMSX has extensive URL parameter configuration
- Sakhr AX-370 configuration pre-included

---

## Contact Points for Issues

### WebMSX Issues
- WebMSX GitHub: https://github.com/ppeccin/webmsx
- Configuration docs in `webmsx/index.html`

### Browser Compatibility
- Test same-origin policy restrictions
- Check audio policy updates
- Iframe focus behavior may vary

---

## Last Updated
2026-01-03 - Initial documentation

## Status
✅ Project fully functional and ready for use
⚠️ Audio requires one user interaction (browser limitation)

---

## Quick Start Summary

```bash
# 1. Navigate to project
cd C:\Users\islam\sakhr-emulator\new\sakhr-web-simulator\src\animation\emulator

# 2. Run start.bat
start.bat

# 3. Browser opens to http://localhost:8082/index.html

# 4. Select ROM with arrow keys or mouse, press Enter

# 5. Press any key to enable audio (first time only)

# 6. Press ESC to return to menu
```

**That's it!** Enjoy the Sakhr emulator! 🎮
