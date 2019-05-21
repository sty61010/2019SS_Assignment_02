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

        this.play_bt.onInputOver.add(this.buttonOver,this);
        this.setting_bt.onInputOver.add(this.buttonOver,this);

        stateText.text=scoreString+score;
        game.add.text(game.world.centerX-272, 320, stateText.text, { font: '50px Georgia', fill: '#fff' });

    },
    loseScreen:function(){
        // background
        this.lose_bg=game.add.image(0,0,'lose_bg');
        this.lose_bg.scale.setTo(0.5,0.5);
        game.add.text(game.world.centerX-272, 400, 'You Lose', { font: '50px Georgia', fill: '#fff' });

    },
    winScreen:function(){
        // background 
        this.win_bg=game.add.image(-200,0,'win_bg');
        this.win_bg.scale.setTo(0.68,0.68);
        game.add.text(game.world.centerX-272, 400, 'You Win', { font: '50px Georgia', fill: '#fff' });

        // scoreText.text = scoreString + score;
        // stateText.text = " You Won \n";
        // stateText.visible = true;
    },
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        if(soundmute==0)
            this.buttonSound.play();
    },
    playClick:function(){
        score=0;
        outcome=0;
        game.state.start('level1');
    },
    settingClick:function(){
        game.state.start('setting');
    },
    update: function() {

    }
};