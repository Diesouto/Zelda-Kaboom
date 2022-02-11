export default function menuPrincipalScene() {
    add([
        text("Diego's Portfolio \nAdventure"),
        pos(240, 80),
        scale(3),
    ]);

    add([
        rect(160, 20),
        pos(240, 180),
        "button",
        {
            clickAction: () => go('game', { level: 0, score: 0 }),
        },
    ]);

    add([
        text("Play game"),
        pos(240, 180),
        color(0, 0, 0)
    ]);

    add([
        rect(160, 20),
        pos(240, 210),
        "button",
        {
            clickAction: () => window.open('https://www.linkedin.com/in/diesouto/', '_blank'),
        },
    ]);

    add([
        text("My LinkedIn"),
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