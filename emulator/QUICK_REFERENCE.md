# Quick Reference

## File Structure
```
emulator/
├── index.html          ← ROM menu (entry point)
├── emulator.html       ← WebMSX wrapper
├── fonts.css           ← Local font declarations
├── tokens.css          ← Design system variables
├── fonts/              ← Font files
│   ├── ff-sakhr/
│   └── msx-international/
├── webmsx/             ← WebMSX emulator
└── roms/               ← ROM files
```

## What Works ✅
- ROM selection menu with keyboard/mouse
- ESC 3x (within 2s) returns to menu
- Black loading screen (no white flash)
- WebMSX scaled 1.8x, UI hidden
- Design system fonts/colors
- Keyboard forwarding to emulator

## What Doesn't Work ❌
- **Audio requires click per ROM load** (browser security + page navigation)

## Key Code Locations

### ESC Handler (emulator.html:189-244)
```javascript
if (escapeCount >= 3) {
  goBackToMenu();
}
```

### Black Loading Cover (emulator.html:56-65, 69-70)
```css
#loadingCover { background: #000; z-index: 9999; }
```

### WebMSX CSS Injection (emulator.html:98-150)
```javascript
webmsxFrame.addEventListener('load', () => {
  // Inject CSS to scale/hide UI
  // Fade in iframe
  // Remove loading cover
});
```

### ROM Selection (index.html:320-333)
```javascript
function selectROM(index) {
  activateAudio();
  sessionStorage.setItem('selectedROM', JSON.stringify(rom));
  window.location.href = 'emulator.html'; // ← Destroys audio context
}
```

## Why Two Pages?
Menu and emulator on same page = keyboard control conflicts
- Menu needs: ↑↓ Enter
- Emulator needs: ALL keys

## Audio Issue Explained
```
index.html → activateAudio() → AudioContext created
    ↓ window.location.href
emulator.html → NEW PAGE → NEW AudioContext → needs NEW click
```

Browser detects simulated clicks as fake. Page navigation destroys context.

## Design Rules
- Pure black #000000 (not CSS variables)
- NO shadows
- FF Sakhr (Arabic), MSX International (English)
- Pixel-perfect rendering (font-smooth: never)

## Start Server
```bash
python -m http.server 8000
```
→ http://localhost:8000/index.html
