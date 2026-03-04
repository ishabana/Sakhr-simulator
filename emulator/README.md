# محاكي صخر - ROM Loader

Arabic-first ROM selector interface for WebMSX emulator with Sakhr styling.

## 📁 Project Structure

```
emulator/
├── index.html          # Main ROM grid selector (Arabic UI)
├── emulator.html       # WebMSX emulator page
├── images/            # ROM cover images (add your custom images here)
│   ├── sakhr-basic.png
│   ├── arabic.png
│   ├── painter.png
│   └── ... (one per ROM)
└── README.md          # This file
```

## 🎮 How It Works

1. **User opens `index.html`** → Sees a 2-column grid of available ROMs
2. **User clicks a ROM** (or uses keyboard navigation) → Selects program
3. **Emulator loads** in `emulator.html` → WebMSX runs the selected ROM in fullscreen
4. **Back button** → Returns to ROM grid menu

## 🖼️ Adding Custom ROM Images

### Image Specifications

- **Location**: `emulator/images/`
- **Format**: PNG (recommended) or JPG
- **Size**: 600×400px or similar aspect ratio
- **Naming**: Must match the filenames in `index.html`

### Current ROM Image Filenames

Place your images in the `images/` folder with these exact names:

```
images/abc-arabic.png       → ABC العربية
images/believe-or-not.png   → صدق أو لا تصدق
images/double-face.png      → الوجه المزدوج
images/holy-quran.png       → القرآن الكريم
images/ibn-sina.png         → ابن سينا
```

### Placeholder Behavior

- If image file doesn't exist → Shows 📦 icon placeholder
- Images are pixelated to match retro MSX aesthetic
- All images are 300px tall in the grid

## 🚀 Running the ROM Loader

### Option 1: Direct File (Simple)

```bash
# Just open in browser
Open: emulator/index.html
```

### Option 2: Local Server (Recommended)

```bash
# From project root, run:
cd src/animation/emulator
python -m http.server 8080

# Then open:
http://localhost:8080/index.html
```

## ⌨️ Keyboard Controls

### In ROM Grid (index.html):
- **Arrow Keys** → Navigate grid
- **Enter/Space** → Select and launch ROM
- **Tab** → Cycle through ROMs

### In Emulator (emulator.html):
- **ESC** → Prompt to return to menu
- **Click "العودة للقائمة"** → Return to ROM grid
- **WebMSX Controls** → Standard MSX keys (F7 for menu, etc.)

## 🎨 Design System

Uses Sakhr design tokens from:
```
../../../design-system/fonts.css
../../../design-system/tokens.css
```

### Key Colors:
- **Primary**: Dark Blue (`#2424FF`)
- **Accent**: Yellow (`#DBDB00`)
- **Success**: Green (`#49DB49`)
- **Background**: Black/Dark Blue gradient

### Fonts:
- **Arabic**: FF Sakhr (monospace)
- **English**: MSX International (monospace)

## 📝 Customizing ROMs

Edit the `ROMS` array in `index.html` (line ~150):

```javascript
{
  id: 'unique-id',
  filename: 'rom-filename.rom',
  title: 'عنوان باللغة العربية',
  path: '../../../../../WebMSX-master/release/stable/6.0/standalone/roms/sakhr/rom-filename.rom',
  image: 'images/rom-image.png'
}
```

## 🔧 WebMSX Configuration

ROMs are loaded with these settings (in `emulator.html`):

```javascript
{
  ROM: romPath,
  CART1_URL: romPath,
  SCREEN_FULLSCREEN_MODE: 1,    // Start in fullscreen
  SCREEN_FILTER_MODE: 1,        // Scanline filter
  SCREEN_CRT_MODE: 1,           // CRT effect
  AUDIO: 1                      // Enable sound
}
```

## 🐛 Troubleshooting

### ROM doesn't load?
- Check ROM path in `index.html` ROMS array
- Verify ROM file exists in WebMSX directory
- Use browser console (F12) to check for errors

### Images don't show?
- Check image filename matches exactly (case-sensitive)
- Verify images are in `emulator/images/` folder
- PNG format is recommended

### Back button doesn't work?
- Button is always visible in top-left
- ESC key also triggers return prompt
- Check browser console for JavaScript errors

## 📊 Current ROM List

1. **ABC العربية** - Arabic learning program (abc_arabic.rom)
2. **صدق أو لا تصدق** - Believe it or Not game (believe_or_not.rom)
3. **الوجه المزدوج** - Double Face game (double_face.rom)
4. **القرآن الكريم** - Holy Quran program (holy_quran.rom)
5. **ابن سينا** - Ibn Sina educational program (ibn_sina1.rom)

## 🎯 Features

✅ Arabic-first UI with RTL support
✅ 2-column responsive grid
✅ Keyboard navigation (arrows, Enter)
✅ Loading screen with ROM info
✅ Fullscreen WebMSX emulator
✅ Back to menu button
✅ ESC key shortcut
✅ Scanline effects for retro aesthetic
✅ Placeholder images if custom images missing
✅ Sakhr design system integration

## 📌 Next Steps

1. **Add custom ROM cover images** to `images/` folder
2. **Test all ROMs** to ensure they load correctly
3. **Customize ROM titles** (Arabic names) in `index.html`
4. **Optional**: Add ROM descriptions/metadata
5. **Optional**: Add search/filter functionality

---

**Created**: 2026-01-02
**Design**: Sakhr MSX Retro Style
**Language**: Arabic (RTL)
