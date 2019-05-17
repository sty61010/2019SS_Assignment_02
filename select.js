var endState = {
    preload: function() {
        game.load.image('win_bg', 'assets/win_bg.jpg');
        game.load.image('lose_bg', 'assets/lose_bg.jpg');
        game.load.spritesheet('play_bt', 'assets/playbutton.png', 249, 83);
        game.load.spritesheet('setting_bt', 'assets/settingbutton.png', 250, 100);

    },
    create: function() {

        if(outcome){
            this.winScreen();
        }
        else{
            this.loseScreen();
        }
        this.play_bt = game.add.button(game.world.centerX - 295, 100, 'play_bt', this.playClick, this, 1, 0, 0);
        this.setting_bt = game.add.button(game.world.centerX - 295, 200, 'setting_bt', this.settingClick, this, 1, 0, 0);

    },
    loseScreen:function(){
        this.lose_bg=game.add.image(0,0,'lose_bg');
        this.lose_bg.scale.setTo(0.5,0.5);
    },
    winScreen:function(){
        scoreText.text = scoreString + score;
        stateText.text = " You Won \n";
        stateText.visible = true;
        this.win_bg=game.add.image(-200,0,'win_bg');
        this.win_bg.scale.setTo(0.68,0.68);
    },
    playClick:function(){
        score=0;
        game.state.start('play');
    },
    settingClick:function(){
        // game.start.start('select');
    },
    update: function() {

    }
};