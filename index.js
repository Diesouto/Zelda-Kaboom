// Imports
import k from './components/kaboom.js';
import maps from './components/maps.js';
import loadSprites from './components/sprites.js';
import createPlayer from './components/player.js';
import menuPrincipalScene from './components/scenes/menu.js';
import gameOverScene from './components/scenes/gameOver.js';

  // Load sprites
  loadSprites();
  
  // Menu
  scene("menu", menuPrincipalScene);

  // Game logic
  scene('game', ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')
  
    const levelCfg = {
      width: 48,    // Sprite width
      height: 48,   // Sprite height

      // Objects
      a: [sprite('left-wall'), solid(), 'wall'],
      b: [sprite('right-wall'), solid(), 'wall'],
      c: [sprite('top-wall'), solid(), 'wall'],
      d: [sprite('bottom-wall'), solid(), 'wall'],
      w: [sprite('top-right-wall'), solid(), 'wall'],
      x: [sprite('bottom-left-wall'), solid(), 'wall'],
      y: [sprite('top-left-wall'), solid(), 'wall'],
      z: [sprite('bottom-right-wall'), solid(), 'wall'],
      '%': [sprite('left-door'), solid(), 'door'],
      '^': [sprite('top-door'), 'next-level'],
      $: [sprite('stairs'), 'next-level'],
      ')': [sprite('lanterns'), solid()],
      '(': [sprite('fire-pot'), solid()],

      // Enemies
      '*': [
        sprite('slicer'), 
        'slicer', 
        { dir: -1, speed: 100 }, 
        'dangerous'
      ],

      '}': [
        sprite('skeletor'), 
        'dangerous', 
        'skeletor', 
        { dir: -1, timer: 0, speed: 80 }
      ],
    }
    addLevel(maps[level], levelCfg)
  
    add([sprite('bg'), layer('bg')])
  
    const scoreLabel = add([
      text('0'),
      pos(400, 450),
      layer('ui'),
      {
        value: score,
      },
      scale(2),
    ])
  
    add([text('level ' + parseInt(level + 1)), pos(400, 465), scale(2)])
  
    const player = createPlayer('link-going-right');

    const HealthLabel = add([
      text('Health: ' + player.health),
      pos(400, 600),
      layer('ui'),
      {
        value: player.health,
      },
      scale(2),
    ])

    player.action(() => {
      player.resolve()
    })
  
    player.overlaps('next-level', () => {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
      })
    })
  
    player.collides('door', (d) => {
      destroy(d)
    })
  
    collides('kaboom', 'skeletor', (k,s) => {
      camShake(4)
      wait(1, () => {
        destroy(k)
      })
      destroy(s)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })
  
    action('slicer', (s) => {
      s.move(s.dir * s.speed, 0)
    })
  
    collides('slicer', 'wall', (s) => {
      s.dir = -s.dir
    })
  
    action('skeletor', (s) => {
      s.move(player.pos.sub(s.pos).unit().scale(s.speed))
    })
  
    collides('skeletor', 'wall', (s) => {
      s.dir = -s.dir
    })
  
    player.overlaps('dangerous', () => {
      player.health -= 1;
      updateHealth(player);
    })

  })
  
  scene('lose', gameOverScene);
  
  start('menu');

// Functions
function updateHealth(player) {
  if (player.health <= 0) {
      gameOver(player);
  }
}

function gameOver() {
  go('lose')
}