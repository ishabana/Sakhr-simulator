---
phase: REVISION
plan: REVISION-COMPREHENSIVE
type: fix
---

<objective>
Comprehensive revision of Chapters 2-4 scenes - BOTH scene.json AND HTML files.

Critical issues identified through visual asset analysis AND comparing scene.txt prompts with user feedback:
- Full-width background images (1.png, 2.png, 3.png in Ch4 sc3) treated as small sprites
- Characters positioned on edges instead of center (Ch4 sc3)
- Static elements that should change in place are sliding (Ch3 sc1 fronts)
- Wrong proportions throughout (too small/too large)
- z-index layering issues

Fixes BOTH .json configuration AND .html implementation files.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-phase.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md

**Scene prompts:**
@ch4/sc3/scene.txt
@ch3/sc1/scene.txt
@ch3/sc2/scene.txt
@ch2/sc2/scene.txt

**User feedback:**
- Ch3 sc1: "the book should disappear once it's behind the front, then the front needs to be the same size and turn into the other front pngs"
- Ch3 sc2: "the proportopns of the two elements are completely off"
- Ch4 sc3: "this scene is completely off in everything, the t.png should only appear on the right edge, then 1, 2, 3 should act like a moving background, the characters should be standing close to each other and to the middle of the screen"
</context>

<tasks>

<task type="auto">
  <name>Fix Ch4 sc3 - JSON: Characters center, backgrounds as full-width</name>
  <files>ch4/sc3/scene.json</files>
  <action>
CRITICAL: Complete restructure of Ch4 sc3.

ISSUE: 1.png, 2.png, 3.png are FULL-WIDTH DESERT/PYRAMID/FLOOR BACKGROUNDS, NOT small sprites!

Analysis:
- 1.png = Desert panorama (full background)
- 2.png = Pyramids panorama (full background)
- 3.png = Checkered floor (full background)
- Characters should be STATIC in center-left, close together
- t.png appears briefly at RIGHT EDGE only

Replace entire scene.json:
```json
{
  "duration": 14000,
  "backgroundColor": "#000000",
  "autoAdvance": true,
  "advanceDelay": 1000,

  "timeline": [
    {
      "time": 0,
      "action": "showSprite",
      "config": {
        "id": "char1",
        "image": "b1.png",
        "position": {
          "x": 500,
          "y": "bottom-50px"
        },
        "width": "250px",
        "zIndex": 20
      }
    },
    {
      "time": 0,
      "action": "showSprite",
      "config": {
        "id": "char2",
        "image": "b2.png",
        "position": {
          "x": 700,
          "y": "bottom-50px"
        },
        "width": "250px",
        "zIndex": 20
      }
    },
    {
      "time": 1000,
      "action": "showSprite",
      "config": {
        "id": "tank",
        "image": "t.png",
        "position": {
          "x": "right-100px",
          "y": "center"
        },
        "width": "300px",
        "zIndex": 15
      }
    },
    {
      "time": 3000,
      "action": "hideSprite",
      "config": {
        "id": "tank"
      }
    },
    {
      "time": 3500,
      "action": "changeSprite",
      "config": {
        "id": "char2",
        "image": "b2-2.png"
      }
    },
    {
      "time": 4000,
      "action": "animateSprite",
      "config": {
        "id": "bg1",
        "frames": ["1.png", "1.png", "1.png", "1.png", "1.png", "1.png"],
        "positions": [
          {"x": -400, "y": 0},
          {"x": 0, "y": 0},
          {"x": 400, "y": 0},
          {"x": 800, "y": 0},
          {"x": 1200, "y": 0},
          {"x": 1600, "y": 0}
        ],
        "frameDelay": 350,
        "width": "1400px",
        "zIndex": 3
      }
    },
    {
      "time": 6500,
      "action": "animateSprite",
      "config": {
        "id": "bg2",
        "frames": ["2.png", "2.png", "2.png", "2.png", "2.png", "2.png"],
        "positions": [
          {"x": -400, "y": 0},
          {"x": 0, "y": 0},
          {"x": 400, "y": 0},
          {"x": 800, "y": 0},
          {"x": 1200, "y": 0},
          {"x": 1600, "y": 0}
        ],
        "frameDelay": 300,
        "width": "1400px",
        "zIndex": 3
      }
    },
    {
      "time": 9000,
      "action": "animateSprite",
      "config": {
        "id": "bg3",
        "frames": ["3.png", "3.png", "3.png", "3.png", "3.png", "3.png"],
        "positions": [
          {"x": -400, "y": 0},
          {"x": 0, "y": 0},
          {"x": 400, "y": 0},
          {"x": 800, "y": 0},
          {"x": 1200, "y": 0},
          {"x": 1600, "y": 0}
        ],
        "frameDelay": 300,
        "width": "1400px",
        "zIndex": 3
      }
    }
  ]
}
```

KEY CHANGES:
- Characters b1, b2: STATIC at x: 500, 700 (center-left, close), zIndex 20 (foreground)
- Tank: appears at right-100px (right edge), then hidden
- Backgrounds 1, 2, 3: width 1400px (FULL-WIDTH), zIndex 3 (background), slide left-to-right
- y position 0 for backgrounds (full height coverage)
  </action>
  <verify>Characters static in center, tank at right edge, backgrounds scroll behind</verify>
  <done>Ch4 sc3 JSON completely restructured</done>
</task>

<task type="auto">
  <name>Fix Ch4 sc3 - HTML: Characters center, backgrounds full-width</name>
  <files>ch4/sc3/sc3-intro.html</files>
  <action>
Fix HTML to match corrected JSON.

Current HTML issues (lines 122-214):
- b1 at right: 50px, b2 at left: 50px (EDGES, not center!)
- 1.png, 2.png, 3.png are 300px sprites at top: 300px (should be 1400px backgrounds at y: 0!)
- zIndex 6 for backgrounds (above characters z:5) - WRONG!

Update the JavaScript section (lines 100-223):

Replace entire scene setup with:
```javascript
window.addEventListener('load', () => {
  const container = document.getElementById('scene-container');
  container.innerHTML = '';
  container.classList.remove('loading');
  container.style.background = '#000000';

  // Characters at CENTER-LEFT, close together
  const char1 = document.createElement('img');
  char1.src = 'b1.png';
  char1.className = 'sprite';
  char1.style.left = '500px';
  char1.style.bottom = '50px';
  char1.style.width = '250px';
  char1.style.zIndex = '20';
  container.appendChild(char1);

  const char2 = document.createElement('img');
  char2.id = 'char2';
  char2.src = 'b2.png';
  char2.className = 'sprite';
  char2.style.left = '700px';
  char2.style.bottom = '50px';
  char2.style.width = '250px';
  char2.style.zIndex = '20';
  container.appendChild(char2);

  // Time 1000: Tank appears at RIGHT EDGE
  setTimeout(() => {
    const tank = document.createElement('img');
    tank.id = 'tank';
    tank.src = 't.png';
    tank.className = 'sprite';
    tank.style.right = '100px';
    tank.style.top = '50%';
    tank.style.transform = 'translateY(-50%)';
    tank.style.width = '300px';
    tank.style.zIndex = '15';
    container.appendChild(tank);
  }, 1000);

  // Time 3000: Hide tank
  setTimeout(() => {
    const tank = document.getElementById('tank');
    if (tank) tank.remove();
  }, 3000);

  // Time 3500: Transform char2
  setTimeout(() => {
    const c2 = document.getElementById('char2');
    if (c2) c2.src = 'b2-2.png';
  }, 3500);

  // Time 4000: BACKGROUND 1 slides (FULL-WIDTH)
  setTimeout(() => {
    const bg1 = document.createElement('img');
    bg1.src = '1.png';
    bg1.className = 'sprite';
    bg1.style.top = '0';
    bg1.style.width = '1400px';
    bg1.style.zIndex = '3';
    container.appendChild(bg1);

    const positions = [-400, 0, 400, 800, 1200, 1600];
    animateFrameByFrame(bg1, positions, 350);
  }, 4000);

  // Time 6500: BACKGROUND 2 slides
  setTimeout(() => {
    const bg2 = document.createElement('img');
    bg2.src = '2.png';
    bg2.className = 'sprite';
    bg2.style.top = '0';
    bg2.style.width = '1400px';
    bg2.style.zIndex = '3';
    container.appendChild(bg2);

    const positions = [-400, 0, 400, 800, 1200, 1600];
    animateFrameByFrame(bg2, positions, 300);
  }, 6500);

  // Time 9000: BACKGROUND 3 slides
  setTimeout(() => {
    const bg3 = document.createElement('img');
    bg3.src = '3.png';
    bg3.className = 'sprite';
    bg3.style.top = '0';
    bg3.style.width = '1400px';
    bg3.style.zIndex = '3';
    container.appendChild(bg3);

    const positions = [-400, 0, 400, 800, 1200, 1600];
    animateFrameByFrame(bg3, positions, 300);
  }, 9000);

  // Scene end at 14000ms
  setTimeout(() => {
    if (SC3_CONFIG.onEnd) SC3_CONFIG.onEnd();
  }, 14000);
});
```

Update SC3_CONFIG duration to 14000.

CRITICAL CHANGES:
- Characters: left: 500px and 700px (NOT edges!), zIndex 20
- Tank: right: 100px (right edge), zIndex 15
- Backgrounds: width 1400px (NOT 300px!), top: 0 (NOT 300px!), zIndex 3 (BEHIND)
- Remove old truck sliding logic, simplified
  </action>
  <verify>Open HTML, verify characters centered, backgrounds scroll as full-width</verify>
  <done>Ch4 sc3 HTML matches corrected behavior</done>
</task>

<task type="auto">
  <name>Fix Ch3 sc1 - JSON: Static front, image swaps only</name>
  <files>ch3/sc1/scene.json</files>
  <action>
User feedback: "the front needs to be the same size and turn into the other front pngs"

Original prompt was ambiguous. User wants front STATIC, just image changes.

Replace entire scene.json:
```json
{
  "duration": 12000,
  "backgroundColor": "#000000",
  "autoAdvance": true,
  "advanceDelay": 1000,

  "timeline": [
    {
      "time": 0,
      "action": "showSprite",
      "config": {
        "id": "front",
        "image": "front.png",
        "position": {"x": "center", "y": "center"},
        "width": "800px",
        "zIndex": 10
      }
    },
    {
      "time": 1500,
      "action": "animateSprite",
      "config": {
        "id": "book",
        "frames": ["book.png", "book.png", "book.png", "book.png", "book.png", "book.png"],
        "positions": [
          {"x": 1200, "y": "center"},
          {"x": 900, "y": "center"},
          {"x": 650, "y": "center"},
          {"x": 450, "y": "center"},
          {"x": 250, "y": "center"},
          {"x": 100, "y": "center"}
        ],
        "frameDelay": 350,
        "width": "200px",
        "zIndex": 5
      }
    },
    {
      "time": 5000,
      "action": "changeSprite",
      "config": {
        "id": "front",
        "image": "front-2.png"
      }
    },
    {
      "time": 7500,
      "action": "changeSprite",
      "config": {
        "id": "front",
        "image": "front-3.png"
      }
    }
  ]
}
```

CHANGES:
- front.png STATIC at center, width 800px, zIndex 10 (foreground)
- book slides right-to-left, zIndex 5 (behind front)
- Use changeSprite actions to swap front → front-2 → front-3 (NO SLIDING!)
- Removed all animateSprite actions for front-2 and front-3
  </action>
  <verify>Book slides behind static monitor, monitor content changes in place</verify>
  <done>Ch3 sc1 JSON fixed per user intent</done>
</task>

<task type="auto">
  <name>Fix Ch3 sc1 - HTML: Remove sliding front-2/front-3</name>
  <files>ch3/sc1/sc1-intro.html</files>
  <action>
Current HTML (lines 145-174) makes front-2 and front-3 SLIDE. This is WRONG.

Update JavaScript section:

Replace scene setup (lines 116-182) with:
```javascript
const container = document.getElementById('scene-container');
container.innerHTML = '';
container.classList.remove('loading');
container.style.background = '#000000';

// STATIC front at center
const front = document.createElement('img');
front.id = 'front';
front.src = 'front.png';
front.className = 'sprite';
front.style.width = '800px';
front.style.left = '50%';
front.style.top = '50%';
front.style.transform = 'translate(-50%, -50%)';
front.style.zIndex = '10';
container.appendChild(front);

// Time 1500: Book slides behind
setTimeout(() => {
  const book = document.createElement('img');
  book.src = 'book.png';
  book.className = 'sprite';
  book.style.width = '200px';
  book.style.top = '50%';
  book.style.transform = 'translateY(-50%)';
  book.style.zIndex = '5';
  container.appendChild(book);

  const bookPositions = [1200, 900, 650, 450, 250, 100];
  slideFrameByFrame(book, bookPositions, 350);
}, 1500);

// Time 5000: Change front image to front-2
setTimeout(() => {
  const frontEl = document.getElementById('front');
  if (frontEl) frontEl.src = 'front-2.png';
}, 5000);

// Time 7500: Change front image to front-3
setTimeout(() => {
  const frontEl = document.getElementById('front');
  if (frontEl) frontEl.src = 'front-3.png';
}, 7500);

// Scene end at 12000ms
setTimeout(() => {
  if (SC1_CONFIG.onEnd) SC1_CONFIG.onEnd();
}, 12000);
```

Update SC1_CONFIG duration to 12000.

CHANGES:
- front STATIC at center with id='front'
- book slides behind (zIndex 5)
- Use frontEl.src swaps for front-2 and front-3 (NO sliding!)
- Removed entire front2 and front3 sliding sections
  </action>
  <verify>Monitor stays centered, book slides behind, screen changes content in place</verify>
  <done>Ch3 sc1 HTML matches user intent</done>
</task>

<task type="auto">
  <name>Fix Ch3 sc2 - JSON and HTML: Proportion corrections</name>
  <files>ch3/sc2/scene.json, ch3/sc2/sc2-intro.html</files>
  <action>
User: "the proportopns of the two elements are completely off"

Analysis:
- front.png (team meeting) is too small at 600px
- Character is too large at 400px

Fix scene.json:
```json
{
  "duration": 10000,
  "background": "bg.png",
  "autoAdvance": true,
  "advanceDelay": 1000,

  "timeline": [
    {
      "time": 0,
      "action": "showSprite",
      "config": {
        "id": "front",
        "image": "front.png",
        "position": {
          "x": "center",
          "y": "bottom-0"
        },
        "width": "1000px",
        "zIndex": 10
      }
    },
    {
      "time": 2000,
      "action": "animateSprite",
      "config": {
        "id": "walkingChar",
        "frames": ["1.png", "2.png", "3.png", "1.png", "2.png", "3.png"],
        "positions": [
          {"x": -350, "y": "bottom-80px"},
          {"x": -250, "y": "bottom-80px"},
          {"x": -150, "y": "bottom-80px"},
          {"x": -50, "y": "bottom-80px"},
          {"x": 30, "y": "bottom-80px"},
          {"x": 100, "y": "bottom-80px"}
        ],
        "frameDelay": 450,
        "width": "300px",
        "zIndex": 8
      }
    }
  ]
}
```

Fix HTML (line 110 and 122):
```javascript
// Line 110: front.png
front.style.width = '1000px';  // Was 600px

// Line 122: character
character.style.width = '300px';  // Was 400px
character.style.bottom = '80px';  // Was 50px
```

CHANGES:
- front: 600px → 1000px (fills bottom properly)
- character: 400px → 300px (proportional to scene)
- character: bottom 50px → 80px (better alignment)
  </action>
  <verify>Team meeting fills bottom, character walks in at correct scale</verify>
  <done>Ch3 sc2 proportions corrected</done>
</task>

<task type="auto">
  <name>Fix Ch2 sc2 - JSON and HTML: Front/map proportions and flag size</name>
  <files>ch2/sc2/scene.json, ch2/sc2/sc2-intro.html</files>
  <action>
Analysis:
- front.png (workers) too small at 800px
- map.png too large at 600px
- Flags too large at 80px

Fix scene.json:
```json
{
  "duration": 15000,
  "backgroundColor": "#808080",
  "autoAdvance": true,
  "advanceDelay": 1000,

  "timeline": [
    {
      "time": 0,
      "action": "showSprite",
      "config": {
        "id": "front",
        "image": "front.png",
        "position": {
          "x": "center",
          "y": "bottom-0"
        },
        "width": "1100px",
        "zIndex": 10
      }
    },
    {
      "time": 1500,
      "action": "showSprite",
      "config": {
        "id": "map",
        "image": "map.png",
        "position": {
          "x": "center",
          "y": "top-20px"
        },
        "width": "500px",
        "zIndex": 5,
        "entryEffect": "revealFromBottom"
      }
    },
    {
      "time": 4000,
      "action": "startScrollingFlags",
      "config": {
        "flags": ["egypt.png", "iraq.png", "jordan.png", "kuwait.png", "lybia.png", "palestine.png", "saudi.png"],
        "width": "60px",
        "zIndex": 8
      }
    }
  ]
}
```

Fix HTML (need to see full file to give exact line numbers, but changes are):
- Update front.png width to 1100px (search for front sprite creation)
- Update map.png width to 500px (search for map sprite creation)
- Update .flag CSS width to 60px (line 54-59)

CHANGES:
- front: 800px → 1100px
- map: 600px → 500px, y top-0 → top-20px
- flags: 80px → 60px
  </action>
  <verify>Front fills bottom, map sized properly in upper area, flags scroll at correct size</verify>
  <done>Ch2 sc2 proportions corrected</done>
</task>

<task type="auto">
  <name>Fix Ch2 sc4 - JSON and HTML: Ground alignment</name>
  <files>ch2/sc4/scene.json, ch2/sc4/sc4-intro.html</files>
  <action>
Minor fixes for better visual alignment.

Fix scene.json: Change all y positions to "bottom-0" for proper ground alignment, adjust character.

Fix HTML: Similar updates to match JSON positioning.

See REVISION-PLAN.md task 7 for full details.
  </action>
  <verify>Backgrounds and character properly aligned to ground</verify>
  <done>Ch2 sc4 alignment improved</done>
</task>

</tasks>

<verification>
Before declaring plan complete:
- [ ] Ch4 sc3 JSON: Characters at center, backgrounds as full-width
- [ ] Ch4 sc3 HTML: Matches JSON with correct positioning and sizing
- [ ] Ch3 sc1 JSON: front static, book slides behind, image swaps only
- [ ] Ch3 sc1 HTML: Matches JSON, no sliding front-2/front-3
- [ ] Ch3 sc2 JSON+HTML: front 1000px, character 300px
- [ ] Ch2 sc2 JSON+HTML: front 1100px, map 500px, flags 60px
- [ ] Ch2 sc4 JSON+HTML: Ground alignment corrected
- [ ] All scenes visually tested and correct
</verification>

<success_criteria>
- BOTH scene.json AND HTML files fixed for all problem scenes
- All proportion issues corrected
- All positioning issues fixed
- All layering (z-index) issues resolved
- Ch4 sc3 completely restructured per user feedback
- Ch3 sc1 behavior matches user intent (static front with image swaps)
- User satisfied with all scenes
</success_criteria>

<output>
After completion, create `.planning/phases/REVISION/REVISION-COMPREHENSIVE-SUMMARY.md`
</output>
