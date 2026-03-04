---
phase: REVISION
plan: REVISION
type: fix
---

<objective>
Comprehensive revision of Chapters 2-4 scenes to fix proportion, positioning, layering, sizing, and directional issues.

Based on visual analysis of assets, many scenes have fundamental misunderstandings:
- Full-width background images treated as small sprites
- Characters positioned incorrectly or with wrong sizes
- Layering and z-index issues causing wrong visual depth
- Directional movements incorrect

This plan systematically fixes all identified issues.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-phase.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/ROADMAP.md

**All scene.json files for Ch2, Ch3, Ch4**
**User reported critical issues:**
- Ch3 sc1: Book should disappear behind front, front should remain same size and transform
- Ch3 sc2: Proportion issues between front and character
- Ch4 sc3: COMPLETELY WRONG - t.png on right edge only, 1/2/3.png are MOVING BACKGROUNDS, characters standing in middle
</context>

<tasks>

<task type="auto">
  <name>Fix Ch2 sc2 - Front and map proportions</name>
  <files>ch2/sc2/scene.json</files>
  <action>
ISSUE: front.png and map.png have wrong proportions and positioning.

Analysis from assets:
- front.png shows workers at computers (should fill bottom foreground)
- map.png is Middle East/Africa map (should appear in upper empty area)

Fix:
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

Changes:
- front.png: width 800px → 1100px, better fills foreground
- map.png: width 600px → 500px, y top-0 → top-20px for better spacing
- flags: width 80px → 60px (smaller, more realistic for scrolling)
  </action>
  <verify>Open sc2, verify front fills bottom, map appears in upper area with proper size</verify>
  <done>Ch2 sc2 proportions corrected</done>
</task>

<task type="auto">
  <name>Fix Ch3 sc1 - Book disappears, front stays same size</name>
  <files>ch3/sc1/scene.json</files>
  <action>
CRITICAL ISSUE: User says "the book should disappear once it's behind the front, then the front needs to be the same size and turn into the other front pngs"

Current implementation has book, front-2, and front-3 all sliding in from right. This is WRONG.

Correct behavior:
1. front.png stays static in center (the computer monitor)
2. book.png slides right-to-left and disappears behind front
3. The SCREEN content changes: front.png → front-2.png → front-3.png (same position, just image swap)

Fix:
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

Changes:
- front.png stays STATIC at center, width 800px, zIndex 10 (foreground)
- book slides behind it (zIndex 5), disappears naturally
- Use changeSprite action to swap front → front-2 → front-3 (same position/size)
- Removed incorrect sliding animations for front-2 and front-3
  </action>
  <verify>Book slides behind static monitor, screen content changes in place</verify>
  <done>Ch3 sc1 behavior matches user intent</done>
</task>

<task type="auto">
  <name>Fix Ch3 sc2 - Character and front proportions</name>
  <files>ch3/sc2/scene.json</files>
  <action>
ISSUE: Proportions between front.png (team meeting) and walking character are off.

Analysis:
- front.png is a large team meeting scene (should be ~1000px width at bottom)
- Character (woman) walks in from left (currently starts at -400, reasonable)

Fix:
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

Changes:
- front.png: width 600px → 1000px (matches visual scale of team meeting)
- Character: width 400px → 300px (more proportional to front scene)
- Character: y bottom-50px → bottom-80px (better vertical positioning)
- Reduced to 6 frames for smoother, shorter animation
  </action>
  <verify>Team meeting fills bottom properly, character walks in at correct scale</verify>
  <done>Ch3 sc2 proportions fixed</done>
</task>

<task type="auto">
  <name>Fix Ch4 sc3 - CRITICAL: Backgrounds as backgrounds, characters static</name>
  <files>ch4/sc3/scene.json</files>
  <action>
CRITICAL ISSUE: User says "this scene is completely off in everything, the t.png should only appear on the right edge, then 1, 2, 3 should act like a moving background, the characters should be standing close to each other and to the middle of the screen."

Current implementation is COMPLETELY WRONG. It treats 1.png, 2.png, 3.png as small sprites.

TRUTH from asset analysis:
- 1.png = FULL desert/pyramids background (1280x800 scale)
- 2.png = FULL pyramids background
- 3.png = FULL checkered floor background
- t.png = tank (should only appear at right edge briefly)
- b1.png, b2.png, b2-2.png = standing characters (should be in CENTER, close together)

Correct behavior:
1. Characters b1 and b2 standing close together in center-left
2. t.png appears briefly at right edge
3. b2 transforms to b2-2
4. BACKGROUNDS 1, 2, 3 slide across as full-width moving backgrounds (parallax scrolling effect)
5. Characters remain STATIC in foreground while backgrounds move behind them

Fix:
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
          "x": 450,
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
          "x": 650,
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
          {"x": -200, "y": 0},
          {"x": 200, "y": 0},
          {"x": 600, "y": 0},
          {"x": 1000, "y": 0},
          {"x": 1400, "y": 0},
          {"x": 1800, "y": 0}
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
          {"x": -200, "y": 0},
          {"x": 200, "y": 0},
          {"x": 600, "y": 0},
          {"x": 1000, "y": 0},
          {"x": 1400, "y": 0},
          {"x": 1800, "y": 0}
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
          {"x": -200, "y": 0},
          {"x": 200, "y": 0},
          {"x": 600, "y": 0},
          {"x": 1000, "y": 0},
          {"x": 1400, "y": 0},
          {"x": 1800, "y": 0}
        ],
        "frameDelay": 300,
        "width": "1400px",
        "zIndex": 3
      }
    }
  ]
}
```

MAJOR CHANGES:
- Characters b1 and b2 STATIC at center-left (x: 450, 650), close together, zIndex 20 (foreground)
- Tank t.png appears briefly at right edge, then hidden
- b2 transforms to b2-2 in place
- Backgrounds 1, 2, 3 are FULL-WIDTH (1400px) moving backgrounds
- Backgrounds slide left-to-right across screen behind characters (zIndex 3)
- Each background follows the previous one seamlessly
- NO MORE treating backgrounds as small sprites!
  </action>
  <verify>Characters stand in center, tank appears at right edge, backgrounds scroll behind</verify>
  <done>Ch4 sc3 completely restructured to match user intent</done>
</task>

<task type="auto">
  <name>Fix Ch4 sc4 - Adjust character positions for better composition</name>
  <files>ch4/sc4/scene.json</files>
  <action>
Minor adjustments for better visual composition based on user feedback about positioning.

Fix:
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
        "id": "machine1",
        "image": "b1.png",
        "position": {
          "x": 100,
          "y": "bottom-80px"
        },
        "width": "220px",
        "zIndex": 5
      }
    },
    {
      "time": 0,
      "action": "showSprite",
      "config": {
        "id": "machine2",
        "image": "b2-2.png",
        "position": {
          "x": 280,
          "y": "bottom-80px"
        },
        "width": "220px",
        "zIndex": 5
      }
    },
    {
      "time": 2000,
      "action": "animateSprite",
      "config": {
        "id": "team",
        "frames": ["team.png", "team.png", "team.png", "team.png", "team.png", "team.png"],
        "positions": [
          {"x": -500, "y": "bottom-50px"},
          {"x": -200, "y": "bottom-50px"},
          {"x": 100, "y": "bottom-50px"},
          {"x": 350, "y": "bottom-50px"},
          {"x": 550, "y": "bottom-50px"},
          {"x": 700, "y": "bottom-50px"}
        ],
        "frameDelay": 450,
        "width": "550px",
        "zIndex": 10
      }
    }
  ]
}
```

Changes:
- Characters b1, b2-2 positioned closer together on left (x: 100, 280 instead of left-50px, left-280px)
- Better y positioning (bottom-80px instead of bottom-100px)
- Team: width 500px → 550px for better proportion
- Team: y 200 → bottom-50px for proper ground alignment
- Smoother sliding with 6 frames
  </action>
  <verify>Characters positioned on left, team slides to just past center</verify>
  <done>Ch4 sc4 positioning improved</done>
</task>

<task type="auto">
  <name>Fix Ch2 sc3 - Adjust machine sliding</name>
  <files>ch2/sc3/scene.json</files>
  <action>
Fine-tune machine sliding animation for better visual flow.

Fix:
```json
{
  "duration": 10000,
  "backgroundColor": "#000000",
  "autoAdvance": true,
  "advanceDelay": 1000,

  "timeline": [
    {
      "time": 1000,
      "action": "showSprite",
      "config": {
        "id": "logo",
        "image": "logo.png",
        "position": {
          "x": "center",
          "y": "center"
        },
        "width": "450px",
        "zIndex": 10,
        "entryEffect": "wipeFromBottom"
      }
    },
    {
      "time": 4000,
      "action": "animateSprite",
      "config": {
        "id": "machine",
        "frames": ["machine.png", "machine.png", "machine.png", "machine.png", "machine.png", "machine.png"],
        "positions": [
          {"x": 1400, "y": "center"},
          {"x": 1100, "y": "center"},
          {"x": 800, "y": "center"},
          {"x": 500, "y": "center"},
          {"x": 300, "y": "center"},
          {"x": 200, "y": "center"}
        ],
        "frameDelay": 350,
        "width": "350px",
        "zIndex": 5
      }
    }
  ]
}
```

Changes:
- Logo: width 500px → 450px (better proportion)
- Machine: reduced to 6 frames for smoother animation
- Machine: width 400px → 350px (more realistic size)
- Machine: y 400 → center (better vertical alignment)
- frameDelay 300ms → 350ms (slightly slower, more visible)
  </action>
  <verify>Logo wipes in, machine slides smoothly to left side</verify>
  <done>Ch2 sc3 animation improved</done>
</task>

<task type="auto">
  <name>Fix Ch2 sc4 - Adjust counter and character timing</name>
  <files>ch2/sc4/scene.json</files>
  <action>
Fine-tune the complex animation sequence with sliding backgrounds and counter.

Current implementation doesn't actually animate counter - it just shows final number. Need actual counting animation.

Fix: The current scene.json shows static text "٨٠٠٠٠٠". This needs custom JavaScript in the HTML player to actually animate counting from 10000 to 800000.

For now, adjust positioning and proportions:
```json
{
  "duration": 13000,
  "backgroundColor": "#3187f8",
  "autoAdvance": true,
  "advanceDelay": 1000,

  "timeline": [
    {
      "time": 1000,
      "action": "animateSprite",
      "config": {
        "id": "bg1",
        "frames": ["bg1.png", "bg1.png", "bg1.png", "bg1.png", "bg1.png", "bg1.png"],
        "positions": [
          {"x": -900, "y": "bottom-0"},
          {"x": -650, "y": "bottom-0"},
          {"x": -400, "y": "bottom-0"},
          {"x": -200, "y": "bottom-0"},
          {"x": -50, "y": "bottom-0"},
          {"x": 0, "y": "bottom-0"}
        ],
        "frameDelay": 300,
        "width": "900px",
        "zIndex": 5
      }
    },
    {
      "time": 4000,
      "action": "changeSprite",
      "config": {
        "id": "bg1",
        "image": "bg2.png"
      }
    },
    {
      "time": 5000,
      "action": "animateSprite",
      "config": {
        "id": "bg2slide",
        "frames": ["bg2.png", "bg2.png", "bg2.png", "bg2.png", "bg2.png"],
        "positions": [
          {"x": 0, "y": "bottom-0"},
          {"x": 100, "y": "bottom-0"},
          {"x": 200, "y": "bottom-0"},
          {"x": 320, "y": "bottom-0"},
          {"x": 420, "y": "bottom-0"}
        ],
        "frameDelay": 300,
        "width": "900px",
        "zIndex": 5
      }
    },
    {
      "time": 7000,
      "action": "showSprite",
      "config": {
        "id": "character",
        "image": "1.png",
        "position": {
          "x": 50,
          "y": "bottom-30px"
        },
        "width": "320px",
        "zIndex": 10
      }
    },
    {
      "time": 7500,
      "action": "showText",
      "config": {
        "id": "counter",
        "text": "٨٠٠٠٠٠",
        "type": "overlay",
        "position": {
          "x": "center",
          "y": "80px"
        },
        "style": {
          "color": "#FFFFFF",
          "fontSize": "64px",
          "fontWeight": "bold",
          "textShadow": "3px 3px 6px rgba(0,0,0,0.5)"
        }
      }
    }
  ]
}
```

Changes:
- All y positions changed to "bottom-0" for proper ground alignment
- Character: position adjusted to left edge (x: 50), y bottom-30px
- Character: width 350px → 320px (better proportion)
- Counter: fontSize 72px → 64px (less overwhelming)
- Reduced frames for smoother bg2slide animation
  </action>
  <verify>Backgrounds slide properly, character appears in left third, counter displays</verify>
  <done>Ch2 sc4 timing and positioning improved</done>
</task>

</tasks>

<verification>
Before declaring plan complete:
- [ ] Ch2 sc2 front and map properly proportioned
- [ ] Ch3 sc1 book disappears behind static monitor that changes content
- [ ] Ch3 sc2 team meeting and character properly scaled
- [ ] Ch4 sc3 COMPLETE RESTRUCTURE - characters static in center, backgrounds scroll behind
- [ ] Ch4 sc4 characters and team positioned correctly
- [ ] Ch2 sc3 machine slides smoothly
- [ ] Ch2 sc4 backgrounds and character properly aligned
- [ ] All scenes tested and visually correct
</verification>

<success_criteria>
- All proportion issues fixed
- All positioning issues corrected
- All layering (z-index) issues resolved
- All directional movements correct
- Ch4 sc3 completely restructured to match user intent
- User satisfied with visual quality
</success_criteria>

<output>
After completion, create `.planning/phases/REVISION/REVISION-SUMMARY.md`
</output>
