# Scene 4 - TV Screen Animation

## Required Assets

Place these files in this folder:

### Images
- `still.png` - Main image that appears with wipe down effect (800px wide)
- `1.png` - TV screen (zooms in then slides from right to left, 300px when zoomed)

## Animation Sequence

**Duration:** ~15 seconds

### Timeline:

1. **0-2s**: Blue background appears, still.png wipes down from top to bottom
2. **2.5-4.5s**: TV screen (1.png) zooms in from zero to full size (300px) on the right
3. **5-13s**: TV screen slides from right to left frame by frame
4. **14s**: Scene ends, advance to next scene

## Technical Details

- **Background**: Blue (#2424B6)
- **Still image**: Centered, wipe down using CSS clip-path
- **TV screens**: Positioned at right: 100px, top: 200px
- **Zoom**: Width animates from 0px to 300px
- **Slide**: Moves 50px per frame, 400ms per frame
- **Frame rate**: 2.5 frames per second for slide animation
