# Sakhr Story Animation

## What This Is

A browser-based animated storytelling system that brings the history of Sakhr MSX computers to life through timeline-driven scenes. Four chapters tell the complete story from 1982 to present, optimized for a Raspberry Pi display running at 1280x800 resolution. Each scene combines Arabic text narration with sprite animations and background music.

## Core Value

Smooth, lag-free playback on the Raspberry Pi. The story must play flawlessly on the target hardware without stuttering, frame drops, or loading delays. If the animations don't run smoothly, the storytelling experience breaks.

## Requirements

### Validated

- ✓ Timeline-based animation engine — existing
  - ScenePlayer class (executes scene timelines)
  - ChapterPlayer class (sequences scenes)
  - TypewriterEffect (animates Arabic text character-by-character)
  - SpriteAnimator (frame-based sprite animation)
  - AudioPlayer (background music management)
- ✓ JSON-driven scene configuration — existing
- ✓ Chapter 1 scenes 1-5 complete — existing
- ✓ 1280x800 fixed layout system — existing
- ✓ Arabic RTL text rendering with ff-sakhr font — existing
- ✓ Background music integration — existing

### Active

- [ ] Complete Chapter 1 (add remaining scenes including sc6)
- [ ] Create Chapter 2 with all scenes
- [ ] Create Chapter 3 with all scenes
- [ ] Create Chapter 4 with all scenes
- [ ] Optimize asset loading for smooth Raspberry Pi performance
- [ ] Test full 4-chapter playback on target hardware

### Out of Scope

- Emulator development — Emulator folder stays untouched, separate system
- Scene editor UI — Scenes created manually from text prompts and JSON configs
- Responsive/mobile layouts — Fixed 1280x800 only, not adapting to other screens
- Interactive features — Pure linear playback, no user choices or branching paths
- Sound effects — Background music only, no per-action sound effects

## Context

**Existing System:**
The animation engine is complete and proven. Chapter 1 has 5 working scenes demonstrating all core capabilities:
- Timeline execution via setTimeout
- Typewriter text effects
- Static sprite display
- Frame-based walking animations
- Auto-advancing between scenes

**Scene Creation Workflow:**
1. Write scene prompt (text description of what happens)
2. Create scene assets (background, sprites, animation frames)
3. Write scene.json configuration (timeline with actions)
4. Create standalone HTML player for testing
5. Add scene to chapter's scenes.json

**Current Status:**
- Engine: Complete and stable
- Chapter 1: Scenes 1-5 done, working on sc6
- Chapters 2-4: Not started (need prompts, assets, configs)

**Target Hardware:**
Raspberry Pi with GeeekPi 10.1" screen (1280x800 resolution) running Chromium in fullscreen mode. All files served via file:// protocol (no HTTP server).

## Constraints

- **Deployment**: Must run offline via file:// protocol — No server setup on Raspberry Pi, pure static files
- **Resolution**: Fixed 1280x800 (Raspberry Pi screen) — No responsive design, pixel-perfect for target display
- **Performance**: Must run smoothly on Raspberry Pi — Asset sizes and animation complexity constrained by hardware
- **Technology**: Vanilla JavaScript only — No build process, no npm dependencies, direct browser execution
- **Assets**: PNG images, MP3 audio — Formats supported natively by browser without codecs

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vanilla JS, no frameworks | Simplicity, no build step, minimal overhead for Raspberry Pi | — Pending |
| JSON scene configs | Declarative, easy to create from prompts, engine handles complexity | — Pending |
| file:// protocol deployment | No server maintenance, works offline, simple setup | — Pending |
| 1280x800 fixed layout | Target hardware is known, pixel-perfect control, no responsive complexity | — Pending |

---
*Last updated: 2026-01-11 after initialization*
