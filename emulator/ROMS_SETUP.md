# Sakhr Emulator - ROM Files Setup

## ROM Directory Structure

All ROM files are organized in the `emulator` directory for easy portability.

### User ROMs (Games/Software)
Location: `emulator/roms/`

Available ROMs:
1. **alibaba.rom** - علي بابا
2. **discover_the_computer.rom** - اكتشف الحاسوب
3. **energy.rom** - الطاقة
4. **ibn_sina1.rom** - ابن سينا
5. **kofi.rom** - كوفي
6. **proverbs_and_says.rom** - الأمثال والحكم
7. **test_your_iq.rom** - اختبر ذكاءك

### Demo/Slideshow ROMs (Optional)
Location: `emulator/roms/`

These are development/demo ROMs (can be ignored):
- **arabic_slideshow_full.rom**
- **final_slideshow.rom**
- **simple_slideshow.rom**
- **slideshow.rom**

### System ROMs (WebMSX)
Location: `emulator/webmsx/roms/sakhr/`

Required system ROMs for Sakhr AX-370:
- **ax370bios.rom** - Main BIOS
- **ax370arabic.rom** - Arabic character set
- **ax370swp.rom** - System word processor
- **ax370sakhrbasic.rom** - Sakhr BASIC
- **ax370sub.rom** - Sub ROM
- **ax370disk.rom** - Disk ROM
- **ax370painter.rom** - Painter ROM

Required system ROMs for Yamaha YIS805 R2:
- **yis805r2bios.rom** - Main BIOS
- **yis805r2painter.rom** - Painter ROM
- **yis805r2sub.rom** - Sub ROM

## File Checklist for Transfer

When transferring to other devices (e.g., Raspberry Pi), ensure you copy:

### Essential Directories
- ✅ `emulator/` (entire directory)
  - ✅ `emulator/roms/` (user ROM files)
  - ✅ `emulator/webmsx/` (WebMSX emulator)
  - ✅ `emulator/webmsx/roms/sakhr/` (system ROMs)
  - ✅ `emulator/fonts/` (Sakhr fonts)
  - ✅ `emulator/images/` (UI images)

### Essential Files
- ✅ `emulator/index.html` (ROM selection menu)
- ✅ `emulator/emulator.html` (emulator launcher)
- ✅ `emulator/fonts.css` (font definitions)
- ✅ `emulator/tokens.css` (design tokens)

## Portability Notes

1. **Self-contained**: All necessary files are in the `emulator/` directory
2. **No external dependencies**: Fonts and ROMs are embedded
3. **Relative paths**: All file references use relative paths
4. **Cross-platform**: Works on Windows, Linux (Raspberry Pi), macOS

## How to Add New ROMs

1. Place ROM file (.rom) in `emulator/roms/`
2. Update `emulator/index.html`:
   - Add menu item in HTML
   - Add ROM entry in ROMS array in JavaScript

## Testing on Raspberry Pi

1. Copy entire `emulator/` folder to Raspberry Pi
2. Open `emulator/index.html` in Chromium browser
3. Select a ROM and click ابدأ (Start)
4. Emulator should load without missing file errors

## Verified ROM Paths

All ROMs use these path formats:
- User ROMs: `roms/[filename].rom`
- System ROMs: `roms/sakhr/[filename].rom`

These paths are relative to:
- `emulator/index.html` for user ROMs
- `emulator/webmsx/index.html` for system ROMs
