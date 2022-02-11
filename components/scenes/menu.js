export default function menuPrincipalScene() {
    add([
        text("Diego's Portfolio\nAdventure"),
        origin('center'), 
        pos(width() / 2, (height() / 2) - 150),
        scale(5),
    ]);

    add([
        rect(140, 20),
        origin('center'), 
        pos(width() / 2, (height() / 2)),
        scale(3),
        "button",
        {
            clickAction: () => go('game', { level: 0, score: 0 }),
        },
    ]);

    add([
        text("Play game"),
        origin('center'), 
        pos(width() / 2, (height() / 2)),
        scale(3),
        color(0, 0, 0)
    ]);

    add([
        rect(140, 20),
        origin('center'), 
        pos(width() / 2, (height() / 2) + 100),
        scale(3),
        "button",
        {
            clickAction: () => window.open('https://www.linkedin.com/in/diesouto/', '_blank'),
        },
    ]);

    add([
        text("My LinkedIn"),
        origin('center'), 
        pos(width() / 2, (height() / 2) + 100),
        scale(3),
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