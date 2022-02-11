export default function createPlayer(spriteName) {
    let player = add([
      sprite(spriteName), // Start sprite
      pos(5, 190),                // Start position
      {
        dir: vec2(1, 0),          // right by default
        speed: 200,               // set speed
        health: 8,                // set health
      },
    ])
  
    setControls(player);
  
    return player;
}

function setControls(player) {
    keyDown('left', () => {
        moveLeft(player);
    })

    keyDown('a', () => {
        moveLeft(player);
    })

    keyDown('right', () => {
        moveRight(player);
    })

    keyDown('d', () => {
        moveRight(player);
    })

    keyDown('up', () => {
        moveUp(player);
    })

    keyDown('w', () => {
        moveUp(player);
    })

    keyDown('down', () => {
        moveDown(player);
    })

    keyDown('s', () => {
        moveDown(player);
    })

    keyPress('space', () => {
        attack(player.pos.add(player.dir.scale(48)))
    })
}

function moveLeft(player) {
    player.changeSprite('link-going-left');
    player.move(-player.speed, 0);
    player.dir = vec2(-1, 0);
}

function moveRight(player) {
    player.changeSprite('link-going-right')
    player.move(player.speed, 0)
    player.dir = vec2(1, 0)
}

function moveUp(player) {
    player.changeSprite('link-going-up')
    player.move(0, -player.speed)
    player.dir = vec2(0, -1)
}

function moveDown(player) {
    player.changeSprite('link-going-down')
    player.move(0, player.speed)
    player.dir = vec2(0, 1)
}

function attack(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(0.3, () => {
        destroy(obj)
    })
}