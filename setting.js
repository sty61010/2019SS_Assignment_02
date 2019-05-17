var endState = {
    preload: function() {
        game.load.image('win_bg', 'assets/win_bg.jpg');
        game.load.image('win_bg', 'assets/lose_bg.jpg');
        game.load.spritesheet('play_bt', 'assets/playbutton.png', 249, 83);
        // game.load.spritesheet('setting_bt', 'assets/settingbutton.png', 250, 100);

    },
    create: function() {
        game.add.image(0,0,'win_bg');
        this.play_bt = game.add.button(game.world.centerX - 295, 100, 'play_bt', this.playClick, this, 1, 0, 0);
        // this.setting_bt = game.add.button(game.world.centerX - 295, 200, 'setting_bt', this.settingClick, this, 1, 0, 0);

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