var startState = {
    preload: function() {
        game.load.image('bg', 'assets/start.jpg');
        game.load.spritesheet('play_bt', 'assets/playbutton.png', 249, 83);
        game.load.spritesheet('setting_bt', 'assets/settingbutton.png', 250, 100);
        game.load.spritesheet('credict_bt', 'assets/credictbutton.png', 250, 85);

        game.load.audio('button_sound', 'assets/button.wav');

    },
    create: function() {
        game.add.image(0,0,'bg');
        
        this.play_bt = game.add.button(game.world.centerX - 295, 100, 'play_bt', this.playClick, this, 1, 0, 0);
        this.setting_bt = game.add.button(game.world.centerX - 295, 170, 'setting_bt', this.settingClick, this, 1, 0, 0);
        this.credict_bt = game.add.button(game.world.centerX - 295, 270, 'credict_bt', this.credictClick, this, 1, 0, 0);

        this.play_bt.onInputOver.add(this.buttonOver,this);
        this.setting_bt.onInputOver.add(this.buttonOver,this);
        this.credict_bt.onInputOver.add(this.buttonOver,this);

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
            this.playClick();
        }
    },
    buttonOver:function(){
        this.buttonSound=game.add.audio('button_sound');
        this.buttonSound.play();
    },
    playClick:function(){
        score=0;
        outcome=0;
        game.state.start('play');
    },
    settingClick:function(){
        // game.state.start('select');
    },
    credictClick:function(){

    },
    update: function() {

    }
};





