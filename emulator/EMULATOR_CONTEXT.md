# SAKHR EMULATOR - COMPLETE CONTEXT & REBUILD GUIDE

## PROJECT OVERVIEW

Sakhr Web Simulator ROM loader for WebMSX emulator with authentic MSX design system.

**Location:** `C:\Users\islam\sakhr-emulator\new\sakhr-web-simulator\src\animation\emulator\`

---

## CRITICAL ISSUES IDENTIFIED

### 1. Design System Not Being Used ❌
- Emulator has **broken local copies** of fonts.css and tokens.css
- Font paths point to `../assets/fonts` (incorrect - should be `../../../assets/fonts`)
- Design system CSS in emulator.html is **commented out** (lines 9-10)
- Result: No MSX theming, broken fonts, visual inconsistency

### 2. Sound Activation Broken ❌
- Multiple failed attempts to auto-activate audio
- WebMSX still shows "click to enable audio" message
- localStorage approach not working with browser audio policies
- Need: Dedicated activation page/button BEFORE emulator loads

### 3. Navigation Broken ❌
- Back button gets stuck
- Session storage cleared incorrectly
- Going back then selecting same ROM → "no ROM selected" error
- Loading overlay persists when navigating back

### 4. UI Not Following Design System ❌
- Custom inline styles instead of design tokens
- No use of design system components (.menu-item, .button, etc.)
- 2-column grid instead of MSX-authentic menu patterns
- Missing: CRT effects, scanlines, pixel-perfect text rendering

---

## DESIGN SYSTEM (THE SOURCE OF TRUTH)

### Location
`C:\Users\islam\sakhr-emulator\new\sakhr-web-simulator\design-system\`

### Files
- **fonts.css** - FF Sakhr (Arabic) + MSX International (English) font declarations
- **tokens.css** - 221 lines of CSS variables (colors, spacing, typography, animations)
- **utilities.css** - 812 lines of reusable utility classes (components, animations, layout)
- **reference.html** - Interactive design showcase with live examples

### How Other Pages Import It (SUCCESS PATTERN)
```html
<!-- From src/animation/ch1/ch1-player.html -->
<link rel="stylesheet" href="../../design-system/fonts.css">
<link rel="stylesheet" href="../../design-system/tokens.css">
<link rel="stylesheet" href="../../design-system/utilities.css">
<!-- Then custom styles -->
<link rel="stylesheet" href="../styles/animation-base.css">
```

### Font Asset Paths
```
assets/fonts/
├── ff-sakhr/
│   ├── FFSakhr-Regular.woff
│   └── FFSakhr-Bold.woff
└── msx-international/
    ├── msx-international.otf.woff2
    └── konami-msx-font.otf.woff2
```

**Relative path from emulator directory:**
`../../../assets/fonts/`

---

## DESIGN TOKENS TO USE

### Colors (Authentic MSX Palette)
```css
--color-black: #000000
--color-dark-blue: #2424FF
--color-light-blue: #4949FF
--color-cyan: #00DBDB
--color-white: #FFFFFF
--color-dark-yellow: #DBDB00
--color-light-green: #49DB49
--color-dark-red: #B60000
--color-gray: #B6B6B6
```

### Semantic Tokens
```css
--bg-primary: var(--color-dark-blue)
--bg-secondary: var(--color-black)
--text-primary: var(--color-white)
--text-secondary: var(--color-gray)
--accent-primary: var(--color-dark-yellow)
--border-primary: var(--color-cyan)
```

### Typography
```css
--font-arabic: 'FF Sakhr', monospace
--font-english: 'MSX International', monospace
--font-size-base: 16px
--font-size-lg: 20px
--font-size-xl: 24px
--line-height-base: 1.5
```

### Spacing (8px Grid)
```css
--space-2: 8px
--space-4: 16px
--space-6: 24px
--space-8: 32px
```

### Components Available
- `.menu-item` - Menu list items with hover/select states
- `.button` - MSX-styled buttons
- `.dialog` - Dialog boxes
- `.text-input` - Input fields
- `.loading-bar` - Progress bars with MSX styling
- `.screen-container` - MSX screen wrapper (768×576px)
- `.crt-scanlines` - CRT effect overlay
- `.pixel-text` - Pixel-perfect text rendering

### Animation Classes
- `.typewriter` - Character-by-character reveal (80ms per char)
- `.logo-slide-left/right/center` - Boot logo animations
- `.wipe-left/right/top/bottom` - Wipe transitions
- `.curtain-reveal` - Curtain reveal effect
- `.char-blink` - Blinking cursor

---

## WEBMSX INTEGRATION

### Location
`webmsx/index.html`

### Configuration
- **WMSX_AX370.js** - Sakhr AX-370 specific settings (MSX2, Arabic support)
- Loads via iframe with URL parameters

### URL Parameters
```javascript
const params = {
  ROM: '/roms/filename.rom',           // ROM file path
  SCREEN_FULLSCREEN_MODE: 0,           // 0=windowed, 1=browser fullscreen
  AUTO_START: true,                    // Auto-run ROM
  AUTO_POWER_ON_DELAY: 0               // No boot delay
};
```

### Audio Policy (Browser Security)
- **Cannot be bypassed programmatically**
- Requires real user interaction (click/keypress)
- Auto-clicking canvas does NOT work
- Solution: Dedicated activation button/page BEFORE emulator

---

## CORRECT ARCHITECTURE

### User Flow
```
1. start.bat (server)
   ↓
2. index.html (welcome + SOUND ACTIVATION)
   ↓ [user clicks "activate" button]
   ↓
3. menu.html (ROM selection grid - MSX menu style)
   ↓ [user selects ROM]
   ↓
4. emulator.html (WebMSX fullscreen)
   ↓ [user presses ESC 3x]
   ↓
5. BACK to menu.html (ROM grid)
```

### File Structure (Proposed)
```
emulator/
├── index.html          # Welcome + Sound Activation page
├── menu.html           # ROM selection (MSX menu style)
├── emulator.html       # WebMSX wrapper
├── start.bat           # Server launcher
├── roms/               # ROM files
│   ├── abc_arabic.rom
│   ├── believe_or_not.rom
│   └── ...
└── webmsx/             # WebMSX emulator (unchanged)
```

---

## REBUILD REQUIREMENTS

### 1. Delete Broken Files
```bash
# Remove local broken CSS copies
rm emulator/fonts.css
rm emulator/tokens.css
```

### 2. index.html (Sound Activation Page)
**Purpose:** Welcome screen + activate audio globally

**Design:**
- MSX boot screen aesthetic
- Large "تفعيل الصوت / Activate Audio" button
- Uses design system: `.screen-container`, `.button`, `.logo-slide-center`
- On click → localStorage.setItem('audioActivated', 'true') → navigate to menu.html

**Imports:**
```html
<link rel="stylesheet" href="../../design-system/fonts.css">
<link rel="stylesheet" href="../../design-system/tokens.css">
<link rel="stylesheet" href="../../design-system/utilities.css">
```

### 3. menu.html (ROM Selection)
**Purpose:** MSX-style menu for ROM selection

**Design:**
- Use `.menu-item` components (not 2-column grid)
- Vertical list with keyboard navigation (↑↓ + Enter)
- CRT scanlines overlay
- Pixel-perfect Arabic/English text
- Session storage for selected ROM

**Components:**
- `.screen-container` - MSX screen wrapper
- `.menu-item` - Each ROM entry
- `.crt-scanlines` - Visual effect
- `.pixel-text` - Text rendering

### 4. emulator.html (WebMSX Wrapper)
**Purpose:** Fullscreen WebMSX with proper back navigation

**Requirements:**
- Check localStorage.getItem('audioActivated')
- If not activated → redirect to index.html
- NO auto-clicking (audio already activated)
- ESC 3x within 2s → navigate to menu.html
- Session storage: preserve selected ROM when going back

**Design System:**
- Import fonts.css and tokens.css
- Black background: `background: var(--bg-secondary)`
- No custom styles - use design tokens

---

## SESSION/LOCAL STORAGE USAGE

### localStorage (Persistent Across Sessions)
```javascript
// Set once on activation page, never clear
localStorage.setItem('audioActivated', 'true');
```

### sessionStorage (Per-Session State)
```javascript
// Set when selecting ROM
sessionStorage.setItem('selectedROM', JSON.stringify({
  id: 'rom-id',
  filename: 'rom.rom',
  title: 'عنوان',
  path: 'roms/rom.rom'
}));

// DO NOT clear when going back to menu
// Only clear when closing tab/browser
```

---

## NAVIGATION FIXES

### Issue: Back to Menu Gets Stuck
**Root Cause:** Session storage cleared on back navigation

**Fix:**
```javascript
// emulator.html - DO NOT clear session on back
function goBackToMenu() {
  // Keep selectedROM in session
  window.location.href = 'menu.html';
}

// Only clear on browser close
window.addEventListener('beforeunload', () => {
  // sessionStorage.removeItem('selectedROM'); // DON'T DO THIS
});
```

### Issue: Same ROM Selection Shows Error
**Root Cause:** Session storage cleared, so ROM info lost

**Fix:** Don't clear session storage when navigating back. Keep ROM state until browser closes.

---

## ESC KEY BEHAVIOR

### Current: 3 presses within 2 seconds
```javascript
let escapeCount = 0;
let escapeTimeout = null;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    escapeCount++;

    if (escapeTimeout) clearTimeout(escapeTimeout);

    if (escapeCount >= 3) {
      escapeCount = 0;
      goBackToMenu();
    } else {
      escapeTimeout = setTimeout(() => {
        escapeCount = 0;
      }, 2000);
    }
    return; // Don't forward ESC to iframe
  }

  // Forward other keys to WebMSX iframe...
});
```

**Status:** Working correctly (if function order is correct)

---

## DESIGN PATTERNS TO FOLLOW

### 1. MSX Boot Screen (for index.html)
```html
<div class="screen-container">
  <div class="logo-slide-center">
    <h1 class="pixel-text arabic-text">صخر</h1>
  </div>
  <button class="button">تفعيل الصوت</button>
</div>
```

### 2. MSX Menu List (for menu.html)
```html
<div class="screen-container">
  <div class="crt-scanlines"></div>
  <div class="menu-list">
    <div class="menu-item" data-rom-id="abc">
      <span class="arabic-text">ABC العربية</span>
    </div>
    <!-- More items... -->
  </div>
</div>
```

### 3. Keyboard Navigation Pattern
```javascript
let selectedIndex = 0;

document.addEventListener('keydown', (e) => {
  const items = document.querySelectorAll('.menu-item');

  switch(e.key) {
    case 'ArrowDown':
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection();
      break;
    case 'ArrowUp':
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection();
      break;
    case 'Enter':
      selectROM(selectedIndex);
      break;
  }
});
```

---

## TESTING CHECKLIST

### Complete User Flow Test
```
1. ✓ Start server (start.bat)
2. ✓ Open browser → index.html
3. ✓ See MSX boot screen with "Activate Audio" button
4. ✓ Click button → Sound activates
5. ✓ Navigate to menu.html → See ROM list
6. ✓ Use arrow keys → Navigate list
7. ✓ Press Enter → ROM loads in emulator
8. ✓ Emulator loads → Audio works (no click required)
9. ✓ Press ESC 3x → Return to menu
10. ✓ Menu shows → Same state preserved
11. ✓ Select different ROM → Loads immediately
12. ✓ Audio works → No re-activation needed
13. ✓ Press ESC 3x → Return to menu again
14. ✓ Repeat → All ROMs work with audio
```

### Design System Verification
```
1. ✓ Fonts load correctly (FF Sakhr + MSX International)
2. ✓ MSX color palette used throughout
3. ✓ CRT scanlines visible
4. ✓ Pixel-perfect text rendering
5. ✓ 8px spacing grid followed
6. ✓ Menu items use design tokens
7. ✓ Buttons use design tokens
8. ✓ No custom colors - all from tokens.css
```

---

## REFERENCE EXAMPLES

### Working Design System Usage
**File:** `src/animation/ch1/ch1-player.html`

Shows correct import pattern:
```html
<link rel="stylesheet" href="../../design-system/fonts.css">
<link rel="stylesheet" href="../../design-system/tokens.css">
```

### Interactive Design Showcase
**File:** `design-system/reference.html`

Live demos of all components, colors, fonts, animations.

---

## SUMMARY

### What Was Wrong
1. Emulator used broken local CSS copies
2. Design system completely ignored
3. Audio activation attempted programmatically (impossible)
4. Session storage cleared on navigation (breaks state)
5. UI used custom styles instead of design tokens

### What Needs to Be Done
1. Delete local fonts.css and tokens.css
2. Import from ../../design-system/
3. Create dedicated sound activation page (index.html)
4. Rebuild menu with MSX-style .menu-item components
5. Fix session storage to preserve state on back navigation
6. Use design system components throughout

### Expected Result
- MSX-authentic UI matching design system reference
- Audio activates once, works for all ROMs
- Smooth navigation: activation → menu → emulator → back to menu
- No errors when selecting ROMs multiple times
- Visual consistency with rest of Sakhr project

---

**Last Updated:** 2026-01-03
**Status:** Ready for complete rebuild with proper design system integration
