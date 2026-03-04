# Chapter 1 Scene 1 - Implementation Notes

## CRITICAL REQUIREMENTS - DO NOT CHANGE

### Colors
- **Background**: `#000000` (black) for both text and animation sections
- **Text color**: `#FFFFFF` (white) - MUST be explicitly set
- **Cursor**: `#FFFFFF` (white)

### Fonts (FROM FONTS.md)
**MUST USE CSS VARIABLES - NOT DIRECT FONT NAMES**

For Arabic text:
```css
font-family: var(--font-arabic);  /* NOT 'FF Sakhr', monospace */
```

**Required font rendering properties:**
```css
-webkit-font-smoothing: none;
-moz-osx-font-smoothing: grayscale;
font-smooth: never;
text-rendering: geometricPrecision;
```

### Screen Layout
- **Aspect ratio**: 4:3 (1024×768)
- **Text section**: Top 30%, black background
- **Animation section**: Bottom 70%, black background

### Character Sizes
- **Animated character**: 378px width (5% larger than 360px)
- **Static characters**: 450px width

### Cursor Animation
- **Animation**: cursorBlink with 1060ms cycle (530ms on, 530ms off)
- **DO NOT** use `.cursor-blink` class, keep custom animation

### Positions
- Walking positions: `[20, 40, 60, 75, 90, 100, 108, 112]`
- Adjusted for 378px character width to avoid overlap

### CSS Load Order
1. fonts.css
2. tokens.css
3. utilities.css

## What NOT to do
- ❌ Don't use direct font names like `'FF Sakhr', monospace`
- ❌ Don't use `.cursor-blink` class (keep custom animation)
- ❌ Don't change background colors
- ❌ Don't change text colors
- ❌ Don't use `.button` class (use custom `.btn`)
- ❌ Don't use reference-page.css classes

## What TO do
- ✅ Use `var(--font-arabic)` for Arabic fonts
- ✅ Keep explicit `color: #FFFFFF` for text
- ✅ Keep custom `.arabic-text` and `.btn` classes
- ✅ Use design system tokens for spacing/borders
- ✅ Keep all font rendering properties
