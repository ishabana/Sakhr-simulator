# Scene 5 - Chipboard Packaging Animation

## Required Assets

Place these files in this folder:

### Images
- `1.png` - Chipboard/TV screen (same as sc4, 300px wide when displayed)
- `2-1.png` - Top package cover (slides down from above)
- `2-2.png` - Bottom package cover (slides up from below)

## Animation Sequence

**Duration:** ~15-20 seconds

### Timeline:

1. **0-5s**: Chipboard (1.png) slides from right to left until it reaches center of screen
2. **5-10s**: Once centered, 2-1.png starts sliding down from top
3. **5-10s**: Simultaneously, 2-2.png slides up from bottom
4. **10s+**: Both covers meet in the middle, packaging the chipboard

## Technical Details

- **Background**: Black (#000000)
- **Chipboard (1.png)**: Starts at right edge, slides to center (490px), 300px wide
- **Top cover (2-1.png)**: Starts above screen (y: -height), slides down frame by frame
- **Bottom cover (2-2.png)**: Starts below screen (y: 800px), slides up frame by frame
- **Slide speed**: 50px per frame, 400ms per frame
- **Frame rate**: 2.5 frames per second
