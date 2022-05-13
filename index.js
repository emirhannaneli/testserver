const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');


for (i = 1; i <= 100; i++) {
    const bot = mineflayer.createBot({
        host: "20.224.168.3",
        port: 25565,
        username: "A-" + i,
        password: ""
    });

    const RANGE_GOAL = 1; // get within this radius of the player

    bot.loadPlugin(pathfinder);

    bot.once('spawn', () => {
        const mcData = require('minecraft-data')(bot.version);
        const defaultMove = new Movements(bot, mcData);

        bot.on('chat', (username, message) => {
            if (username === bot.username) return;
            if (message !== 'come') return;
            const target = bot.players[username]?.entity;
            if (!target) {
                bot.chat("I don't see you !");
                return;
            }
            const { x: playerX, y: playerY, z: playerZ } = target.position;

            bot.pathfinder.setMovements(defaultMove);
            bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL));
        });
    });
}