// initialize kaboom context
kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
});

// Game Logic
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

scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

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
        '^': [sprite('top-door'), solid(), 'wall'],
        '$': [sprite('stairs'), solid(), 'wall'],
        '*': [sprite('slicer'), solid(), 'wall'],
        '}': [sprite('skeletor'), solid(), 'wall'],
        ')': [sprite('lanterns'), solid(), 'wall'],
        '(': [sprite('fire-pot'), solid(), 'wall'],
    };
    addLevel(map, levelConfig);

    // add([sprite('bg'), layer('bg')])

    add([
        text('0'),
        pos(400, 450),
        layer('ui'),
        {
            value: score,
        },
        scale(2),
    ]);

    add([
        text('level ' + parseInt(level + 1)), 
        pos(400, 485),
        scale(2),
    ])
});

start("game", { level: 0, score: 0 });