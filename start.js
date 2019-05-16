var start = {
    preload: function() {
        game.load.image('bg', 'assets/start.jpg');
        game.load.spritesheet('play_bt', 'assets/playbutton.png', 249, 83);
        game.load.spritesheet('setting_bt', 'assets/settingbutton.png', 250, 100);

    },
    create: function() {
        game.add.image(0,0,'bg');
        this.play_bt = game.add.button(game.world.centerX - 295, 100, 'play_bt', this.playClick, this, 1, 0, 0);
        this.setting_bt = game.add.button(game.world.centerX - 295, 200, 'setting_bt', this.settingClick, this, 1, 0, 0);

    },
    playClick:function(){
        game.state.start('play');
    },
    settingClick:function(){
        // game.start.start('select');
    },
    update: function() {

    }
};

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
// game.state.add('start', start);
// game.state.start('start');



