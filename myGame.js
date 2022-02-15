import gameOver from './src/components/scenes/gameOver.js';
import menuPrincipal from './src/components/scenes/menu.js';

kaboom({
	scale: 4,
    background: [0, 0, 0, 1]
});

loadSprites();

// Game logic
scene('game', loadGame);

// Game Over
scene('lose', gameOver);
  
// Menu
scene("menu", menuPrincipal);
go('game', 0);

// Functions 
function loadGame(level) {
    // Create floor (needs to go first)
    addLevel([
        "xxxxxxxxxx",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
    ], {
        width: 16,
        height: 16,
        " ": () => [
            sprite("floor", { frame: ~~rand(0, 8) }),
        ],
    });

    // Maps
    const map = addLevel(getLevels()[level], getLevelConfig());

    // Characters
    const player = add([
        pos(map.getPos(2, 2)),
        sprite("hero", { anim: "idle" }),
        area({ width: 12, height: 12, offset: vec2(0, 6) }),
        solid(),
        origin("center"),
        health(3),
    ]);

    const ogre = add([
        "character",
        sprite("ogre"),
        pos(map.getPos(4, 4)),
        origin("bot"),
        area({ scale: 0.5 }),
        {msg: "ohhi how are you?"},
        solid(),
    ]);

    // Objects
    const sword = add([
        pos(),
        sprite("sword"),
        origin("bot"),
        rotate(0),
        follow(player, vec2(-4, 9)),
        spin(),
    ])

    // Load UI elements
    const dialog = addDialog();
    const healthUI = add([
        fixed(),
        z(100),
        pos(10, 10),
        origin("topleft"),
        sprite("heart"),
        layer('ui'),
        scale(0.2),
    ]);

    // Load controls
    loadControls(player, sword, dialog);

    // Load collisions
    loadCollisions(player, dialog);
}

function loadControls(player, sword, dialog) {
    const SPEED = 120;
    const dirs = {
        "left": LEFT,
        "right": RIGHT,
        "up": UP,
        "down": DOWN,
    }

    for (const dir in dirs) {
		onKeyPress(dir, () => {
			dialog.dismiss()
		})
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(SPEED))
		})
	}

    player.onUpdate(() => {
        camPos(player.pos)
    })
    
    onKeyDown("right", () => {
        movePlayerX(false, SPEED, -4, player, sword);
    })

    onKeyDown("d", () => {
        movePlayerX(false, SPEED, -4, player, sword);
    })
    
    onKeyDown("left", () => {
        movePlayerX(true, -SPEED, 4, player, sword);
    })

    onKeyDown("a", () => {
        movePlayerX(true, -SPEED, 4, player, sword);
    })
    
    onKeyDown("up", () => {
        movePlayerY(player, -SPEED)
    })

    onKeyDown("w", () => {
        movePlayerY(player, -SPEED)
    })
    
    onKeyDown("down", () => {
        movePlayerY(player, SPEED)
    })

    onKeyDown("s", () => {
        movePlayerY(player, SPEED)
    })
    
    onKeyPress(["left", "right", "up", "down"], () => {
        player.play("run")
    })
    
    onKeyRelease(["left", "right", "up", "down"], () => {
        if (
            !isKeyDown("left")
            && !isKeyDown("right")
            && !isKeyDown("up")
            && !isKeyDown("down")
        ) {
            player.play("idle")
        }
    })

    onKeyPress("space", () => {
        interact(player, sword);
    })

    // if device is phone add mobile controls
    if (window.matchMedia("(max-width: 1000px)").matches) {
        addButton("upCtrl", vec2(25, height() - 28), () => movePlayerY(player, -SPEED))
        addButton("rightCtrl", vec2(40, height() - 14), () => movePlayerX(false, SPEED, -4, player, sword))
        addButton("downCtrl", vec2(25, height()), () => movePlayerY(player, SPEED))
        addButton("leftCtrl", vec2(10, height() - 14), () => movePlayerX(true, -SPEED, 4, player, sword))
        addButton("buttonACtrl", vec2(width() - 10, height() - 14), () => interact(player, sword))
    }
    
}

function loadCollisions(player, dialog) {
    // talk on touch
	player.onCollide("character", (ch) => {
		dialog.say(ch.msg)
	})
}

function loadSprites() {
    loadRoot("./src/assets/sprites/")
    loadSprite("heart", "heart.png")
    loadSprite("leftCtrl", "left.png")
    loadSprite("rightCtrl", "right.png")
    loadSprite("upCtrl", "up.png")
    loadSprite("downCtrl", "down.png")
    loadSprite("buttonACtrl", "buttonA.png")
    loadSpriteAtlas("dungeon.png", {
        "hero": {
            "x": 128,
            "y": 196,
            "width": 144,
            "height": 28,
            "sliceX": 9,
            "anims": {
                "idle": {
                    "from": 0,
                    "to": 3,
                    "speed": 3,
                    "loop": true,
                },
                "run": {
                    "from": 4,
                    "to": 7,
                    "speed": 10,
                    "loop": true,
                },
                "hit": 8,
            },
        },
        "ogre": {
            "x": 16,
            "y": 320,
            "width": 256,
            "height": 32,
            "sliceX": 8,
            "anims": {
                "idle": {
                    "from": 0,
                    "to": 3,
                    "speed": 3,
                    "loop": true,
                },
                "run": {
                    "from": 4,
                    "to": 7,
                    "speed": 10,
                    "loop": true,
                },
            },
        },
        "floor": {
            "x": 16,
            "y": 64,
            "width": 48,
            "height": 48,
            "sliceX": 3,
            "sliceY": 3,
        },
        "chest": {
            "x": 304,
            "y": 304,
            "width": 48,
            "height": 16,
            "sliceX": 3,
            "anims": {
                "open": {
                    "from": 0,
                    "to": 2,
                    "speed": 20,
                    "loop": false,
                },
                "close": {
                    "from": 2,
                    "to": 0,
                    "speed": 20,
                    "loop": false,
                },
            },
        },
        "sword": {
            "x": 322,
            "y": 81,
            "width": 12,
            "height": 30,
        },
        "wall": {
            "x": 16,
            "y": 16,
            "width": 16,
            "height": 16,
        },
        "wall_top": {
            "x": 16,
            "y": 0,
            "width": 16,
            "height": 16,
        },
        "wall_left": {
            "x": 16,
            "y": 128,
            "width": 16,
            "height": 16,
        },
        "wall_right": {
            "x": 0,
            "y": 128,
            "width": 16,
            "height": 16,
        },
        "wall_topleft": {
            "x": 32,
            "y": 128,
            "width": 16,
            "height": 16,
        },
        "wall_topright": {
            "x": 48,
            "y": 128,
            "width": 16,
            "height": 16,
        },
        "wall_botleft": {
            "x": 32,
            "y": 144,
            "width": 16,
            "height": 16,
        },
        "wall_botright": {
            "x": 48,
            "y": 144,
            "width": 16,
            "height": 16,
        },
    })
}

function movePlayerY(player, speed) {
    player.move(0, speed)
}

function movePlayerX(flip, speed, offset, player, sword) {
    player.flipX(flip)
    sword.flipX(flip)
    player.move(speed, 0)
    sword.follow.offset = vec2(offset, 9)
}

function interact(player, sword) {
    let interacted = false
    every("chest", (c) => {
        if (player.isTouching(c)) {
            if (c.opened) {
                c.play("close")
                c.opened = false
            } else {
                c.play("open")
                c.opened = true
            }
            interacted = true
        }
    })
    if (!interacted) {
        sword.spin()
    }
}

function spin() {
	let spinning = false
	return {
		id: "spin",
		update() {
			if (spinning) {
				this.angle += 1200 * dt()
				if (this.angle >= 360) {
					this.angle = 0
					spinning = false
				}
			}
		},
		spin() {
			spinning = true
		},
	}
}

function getLevels() {
    const levels = [
        // Level 0
        [
            "tttttttttt",
            "cwwwwwwwwd",
            "l        r",
            "l        r",
            "l        r",
            "l      $ r",
            "l        r",
            "l $      r",
            "attttttttb",
            "wwwwwwwwww",
        ],
        // Level 1
        [
            "tttttttttt",
            "cwwwwwwwwd",
            "l        r",
            "l        r",
            "l        r",
            "l      $ r",
            "l        r",
            "l $      r",
            "attttttttb",
            "wwwwwwwwww",
        ]
    ]

    return levels;
}

function getLevelConfig() {
    const levelConfig = {
        width: 16,
        height: 16,
        "$": () => [
            sprite("chest"),
            area(),
            solid(),
            { opened: false },
            "chest",
        ],
        "a": () => [
            sprite("wall_botleft"),
            area({ width: 4 }),
            solid(),
        ],
        "b": () => [
            sprite("wall_botright"),
            area({ width: 4, offset: vec2(12, 0) }),
            solid(),
        ],
        "c": () => [
            sprite("wall_topleft"),
            area(),
            solid(),
        ],
        "d": () => [
            sprite("wall_topright"),
            area(),
            solid(),
        ],
        "w": () => [
            sprite("wall"),
            area(),
            solid(),
        ],
        "t": () => [
            sprite("wall_top"),
            area({ height: 4, offset: vec2(0, 12) }),
            solid(),
        ],
        "l": () => [
            sprite("wall_left"),
            area({ width: 4 }),
            solid(),
        ],
        "r": () => [
            sprite("wall_right"),
            area({ width: 4, offset: vec2(12, 0) }),
            solid(),
        ],
    }

    return levelConfig;
}

function addButton(i, p, f) {
	const btn = add([
        fixed(),
        z(100),
        pos(p),
        origin("bot"),
        opacity(0.5),
        sprite(i),
        area({ scale: 0.7 }),
        layer('ui'),
        scale(0.4),
	])

    btn.onClick(f);

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(0.55)
		} else {
			btn.scale = vec2(0.4)
			btn.color = rgb()
		}
	})
}

function addDialog() {
    const h = 20
    const pad = 1
    const bg = add([
        pos(0, height() - h),
        rect(width(), h),
        color(0, 0, 0),
        z(90),
        fixed(),
    ])
    const txt = add([
        text("", {
            width: width(),
        }),
        pos(0 + pad, height() - h + pad),
        z(90),
        fixed(),
        scale(0.1)
    ])
    bg.hidden = true
    txt.hidden = true
    return {
        say(t) {
            txt.text = t
            bg.hidden = false
            txt.hidden = false
        },
        dismiss() {
            if (!this.active()) {
                return
            }
            txt.text = ""
            bg.hidden = true
            txt.hidden = true
        },
        active() {
            return !bg.hidden
        },
        destroy() {
            bg.destroy()
            txt.destroy()
        },
    }
}

// Resize by reloading
window.addEventListener('resize', () =>
{
    location.reload();
})