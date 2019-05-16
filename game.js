var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
game.global = { score: 0 };
// Add all the states
game.state.add('start', start);
// game.state.add('select', select);
game.state.add('play', play);
// game.state.add('end', end);

game.state.start('start');




