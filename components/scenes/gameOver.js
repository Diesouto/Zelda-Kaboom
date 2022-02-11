export default function gameOver() {
    add([
        text("GAME OVER", 32), 
        origin('center'), 
        pos(width() / 2, height() / 2)
    ])

    add([
        rect(160, 20),
        pos(240, 180),
        "button",
        {
            clickAction: () => go('game', { level: 0, score: 0 }),
        },
    ]);

    add([
        text("Play again"),
        pos(240, 180),
        color(0, 0, 0)
    ]);

    add([
        rect(160, 20),
        pos(240, 210),
        "button",
        {
            clickAction: () => go('menu'),
        },
    ]);

    add([
        text("Main Menu"),
        pos(240, 210),
        color(0, 0, 0)
    ]);

    action("button", b => {
        if (b.isHovered()) {
            b.use(color(0.7, 0.7, 0.7));
        } else {
            b.use(color(1, 1, 1));
        }

        if (b.isClicked()) {
            b.clickAction();
        }
    });
}
