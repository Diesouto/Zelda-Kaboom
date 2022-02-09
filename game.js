//#region Initialize kaboom context
kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
});
//#endregion

//#region Speeds
const MOVE_SPEED = 120;
//#endregion

// Game Logic
//#region Load Sprites
loadRoot('./assets/')
loadSprite('link-going-left', '1Xq9biB.png')
loadSprite('link-going-right', 'yZIb8O2.png')
loadSprite('link-going-down', 'tVtlP6y.png')
loadSprite('link-going-up', 'UkV0we0.png')
loadSprite('left-wall', 'rfDoaa1.png')
loadSprite('top-wall', 'QA257Bj.png')
loadSprite('bottom-wall', 'vWJWmvb.png')
loadSprite('right-wall', 'SmHhgUn.png')
loadSprite('bottom-left-wall', 'awnTfNC.png')
loadSprite('bottom-right-wall', '84oyTFy.png')
loadSprite('top-left-wall', 'xlpUxIm.png')
loadSprite('top-right-wall', 'z0OmBd1.jpg')
loadSprite('top-door', 'U9nre4n.png')
loadSprite('fire-pot', 'I7xSp7w.png')
loadSprite('left-door', 'okdJNls.png')
loadSprite('lanterns', 'wiSiY09.png')
loadSprite('slicer', 'c6JFi5Z.png')
loadSprite('skeletor', 'Ei1VnX8.png')
loadSprite('kaboom', 'o9WizfI.png')
loadSprite('stairs', 'VghkL08.png')
loadSprite('bg', 'u4DVsx6.png')
//#endregion

scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    //Level
    const map = [
        'ycc)cc^ccw',
        'a        b',
        'a      * b',
        'a     (  b',
        '%        b',
        'a     (  b',
        'a   *    b',
        'a        b',
        'xdd)dd)ddz',
    ];

    // Sprite definitions
    const levelConfig = {
        width: 48, 
        height: 48, 
        a: [sprite('left-wall'), solid(), 'wall'],
        b: [sprite('right-wall'), solid(), 'wall'],
        c: [sprite('top-wall'), solid(), 'wall'],
        d: [sprite('bottom-wall'), solid(), 'wall'],
        w: [sprite('top-right-wall'), solid(), 'wall'],
        x: [sprite('bottom-left-wall'), solid(), 'wall'],
        y: [sprite('top-left-wall'), solid(), 'wall'],
        z: [sprite('bottom-right-wall'), solid(), 'wall'],
        '%': [sprite('left-door'), solid(), 'wall'],
        '^': [sprite('top-door'), 'next-level'],
        '$': [sprite('stairs'), 'next-level'],
        '*': [sprite('slicer')],
        '}': [sprite('skeletor')],
        ')': [sprite('lanterns'), solid(), 'wall'],
        '(': [sprite('fire-pot'), solid(), 'wall'],
    };
    addLevel(map, levelConfig);

    // add([sprite('bg'), layer('bg')])

    //#region Score UI
    const scoreLabel = add([
        text('0'),
        pos(400, 450),
        layer('ui'),
        {
            value: score,
        },
        scale(2),
    ]);
    //#endregion

    //#region Level UI
    const levelLabel =add([
        text('level ' + parseInt(level + 1)), 
        pos(400, 485),
        scale(2),
    ]);
    //#endregion

    //#region Player
    const player = add([
        sprite('link-going-right'),
        pos(5, 190),
        {
            //right by default
            dir: vec2(1,0),
        }
    ]);

    player.action(() => {
        player.resolve();
    });

    player.overlaps('next-level', () => {
        go("game", {
            level: (level + 1),
            score: scoreLabel.value,
        })
    });

    //#endregion

    //#region Controls
    keyDown('left', () => {
        player.changeSprite('link-going-left')
        player.move(-MOVE_SPEED, 0);
        player.dir = vec2(-1,0);
    });

    keyDown('right', () => {
        player.changeSprite('link-going-right')
        player.move(MOVE_SPEED, 0);
        player.dir = vec2(1,0);
    });

    keyDown('up', () => {
        player.changeSprite('link-going-up')
        player.move(0, -MOVE_SPEED);
        player.dir = vec2(0,-1);
    });

    keyDown('down', () => {
        player.changeSprite('link-going-down')
        player.move(0, MOVE_SPEED);
        player.dir = vec2(0,1);
    });
    //#endregion
});

start("game", { level: 0, score: 0 });