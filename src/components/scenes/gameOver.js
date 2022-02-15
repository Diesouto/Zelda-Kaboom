export default function gameOver() {
    add([
        text("GAME OVER"), 
        origin('center'), 
        pos(width() / 2, (height() / 2) - 150),
        area()
    ])

    add([
        rect(140, 20),
        origin('center'), 
        pos(width() / 2, (height() / 2)),
        "button",
        {
            clickAction: () => go('game', 0),
        },
        area()
    ]);

    add([
        text("Play again"),
        origin('center'), 
        pos(width() / 2, (height() / 2)),
        color(0, 0, 0),
        area()
    ]);

    add([
        rect(140, 20),
        origin('center'), 
        pos(width() / 2, (height() / 2) + 100),
        "button",
        {
            clickAction: () => go('menu'),
        },
        area()
    ]);

    add([
        text("Main Menu"),
        origin('center'), 
        pos(width() / 2, (height() / 2) + 100),
        color(0, 0, 0),
        area()
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

    onHover("button", (b) => {
        b.use(color(0.7, 0.7, 0.7));
    })

    onClick("button", (b) => {
        b.clickAction();
    })
}
