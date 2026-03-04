# Roadmap: Sakhr Story Animation

## Overview

Complete the 4-chapter animated storytelling system for Sakhr MSX history. Starting with Chapter 1's remaining scenes, then building out chapters 2-4, culminating in performance optimization for smooth Raspberry Pi playback.

## Domain Expertise

None - Vanilla JavaScript animation with established patterns

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Complete Chapter 1** - Finish remaining scenes (sc6, sc7) and update chapter player
- [ ] **Phase 2: Chapter 2** - Create all scenes for second chapter
- [ ] **Phase 3: Chapter 3** - Create all scenes for third chapter
- [ ] **Phase 4: Chapter 4** - Complete final chapter scenes
- [ ] **Phase 5: Chapter Players & Polish** - Create standalone players for each chapter with auto-play button

## Phase Details

### Phase 1: Complete Chapter 1
**Goal**: Finish all remaining scenes in Chapter 1 (sc6, sc7) and update chapter player to include them
**Depends on**: Nothing (engine complete, scenes 1-5 done)
**Research**: Unlikely (following existing scene patterns from sc1-sc5)
**Plans**: 3 plans

Plans:
- [x] 01-01: Create sc6 scene from prompt (scene.json, HTML player, add to scenes.json)
- [x] 01-02: Create sc7 scene from prompt (scene.json, HTML player, add to scenes.json)
- [x] 01-03: Update ch1-player-standalone.html to include sc6 and sc7 in scene sequence

### Phase 2: Chapter 2
**Goal**: Create complete Chapter 2 with all 4 scenes (sc1-sc4)
**Depends on**: Phase 1
**Research**: Unlikely (same patterns as Chapter 1)
**Plans**: 2 plans

Plans:
- [x] 02-01: Create all 4 scenes (sc1-sc4) with scene.json and HTML players - raining effect, scrolling flags, wipe transitions, counting animation
- [x] 02-02: Create ch2-player-standalone.html and scenes.json

### Phase 3: Chapter 3
**Goal**: Create complete Chapter 3 with 4 scenes (sc1, sc2, sc3, sc5 - sc4 is empty)
**Depends on**: Phase 2
**Research**: Unlikely (established workflow)
**Plans**: 2 plans

Plans:
- [ ] 03-01: Create all 4 scenes (sc1, sc2, sc3, sc5) with scene.json and HTML players - layered sliding, walking, zoom effects, wipe transitions
- [ ] 03-02: Create ch3-player-standalone.html and scenes.json

### Phase 4: Chapter 4
**Goal**: Complete all scenes for Chapter 4 (sc1-sc4)
**Depends on**: Phase 3
**Research**: Unlikely (established workflow)
**Plans**: 2 plans

Plans:
- [ ] 04-01: Create all 4 scenes (sc1-sc4) with scene.json and HTML players - static text, multiple moving sprites, complex sliding sequences
- [ ] 04-02: Create ch4-player-standalone.html and scenes.json

### Phase 5: Chapter Players & Polish
**Goal**: Create standalone chapter players for all chapters with start button for audio permission, optimize for Raspberry Pi
**Depends on**: Phase 4
**Research**: Unlikely (following ch1-player-standalone.html pattern)
**Plans**: 2 plans

Plans:
- [ ] 05-01: Create/update standalone chapter players (ch1, ch2, ch3, ch4) with all scenes and start button
- [ ] 05-02: Performance optimization and Raspberry Pi testing

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Complete Chapter 1 | 3/3 | Complete | 2026-01-12 |
| 2. Chapter 2 | 2/2 | Complete | 2026-01-12 |
| 3. Chapter 3 | 0/2 | Not started | - |
| 4. Chapter 4 | 0/2 | Not started | - |
| 5. Chapter Players & Polish | 0/2 | Not started | - |
