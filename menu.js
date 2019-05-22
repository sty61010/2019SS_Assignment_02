var menuState = {
    preload: function() {
        game.load.image('bg', 'assets/start.jpg');
        game.load.spritesheet('play_bt', 'assets/playbutton.png', 249, 83);
        game.load.spritesheet('setting_bt', 'assets/settingbutton.png', 250, 100);
        game.load.spritesheet('credict_bt', 'assets/credictbutton.png', 250, 85);

        game.load.audio('button_sound', 'assets/button.wav');

    },
    create: function() {
        this.bg=game.add.image(0,0,'bg');
        this.bg.alpha=1.4;
        this.play_bt = game.add.button(game.world.centerX - 295, 100, 'play_bt', this.playClick, this, 1, 0, 0);
        this.setting_bt = game.add.button(game.world.centerX - 295, 170, 'setting_bt', this.settingClick, this, 1, 0, 0);
        // this.credict_bt = game.add.button(game.world.centerX - 295, 270, 'credict_bt', this.credictClick, this, 1, 0, 0);

        this.play_bt.onInputOver.add(this.buttonOver,this);
        this.setting_bt.onInputOver.add(this.buttonOver,this);
        // this.credict_bt.onInputOver.add(this.buttonOver,this);

        game.add.text(game.world.centerX-50, 100, 'P1:', { font: '40px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 150, 'Movement:Up/Down/Right/Left', { font: '30px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 200, 'Shooting:Space', { font: '30px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 250, 'Spcial:Z/X/C', { font: '30px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 300, 'Pause:P', { font: '30px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 350, 'cheeting:Win:K/Lose:L', { font: '30px Georgia', fill: '#fff' });

        game.add.text(game.world.centerX-50, 400, 'P2:', { font: '40px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 450, 'Movement:W/A/S/D', { font: '30px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 500, 'Shooting:Q', { font: '30px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 0, 'Others:', { font: '40px Georgia', fill: '#fff' });
        game.add.text(game.world.centerX-50, 50, 'Check Setting Page', { font: '30px Georgia', fill: '#fff' });

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
            this.playClick();
        }
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
    credictClick:function(){

    },
    update: function() {

    }
};





