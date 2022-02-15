export default function menuPrincipal() {
    add([
        text("Diego's Portfolio\nAdventure"),
        origin('center'), 
        pos(width() / 2, (height() / 2) - 150),
        area()
    ]);

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
        text("Play game"),
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
            clickAction: () => window.open('https://www.linkedin.com/in/diesouto/', '_blank'),
        },
        area()
    ]);

    add([
        text("My LinkedIn"),
        origin('center'), 
        pos(width() / 2, (height() / 2) + 100),
        color(0, 0, 0),
        area()
    ]);

    onHover("button", (b) => {
        b.use(color(0.7, 0.7, 0.7));
    })

    onClick("button", (b) => {
        b.clickAction();
    })
}