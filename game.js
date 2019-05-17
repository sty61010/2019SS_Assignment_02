var score = 0;
var scoreString = '';
var scoreText;
var lives;
var stateText;
var outcome=0;
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
// game.global = { score: 0 };
// Add all the states
game.state.add('start', startState);
game.state.add('play', playState);
game.state.add('setting', settingState);

game.state.add('end', endState);

game.state.start('start');




