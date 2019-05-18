var settingState = {
    preload: function() {
        game.load.image('setting_bg', 'assets/setting_bg.jpg');

        game.load.spritesheet('p_bt', 'assets/p_bt.png', 166, 149);
        game.load.spritesheet('music_bt', 'assets/music_bt.png', 165, 149);
        game.load.spritesheet('sound_bt', 'assets/sound_bt.png', 166, 149);
        game.load.spritesheet('rank_bt', 'assets/rank_bt.png', 166, 149);
        game.load.spritesheet('lock_bt', 'assets/lock_bt.png', 166, 149);

        game.load.audio('button_sound', 'assets/button.wav');
    },
    create: function() {
        this.setting_bg=game.add.image(0,0,'setting_bg');
        this.setting_bg.scale.setTo(0.85,0.85);
        this.p_bt = game.add.button(game.world.centerX +200, 50, 'p_bt', this.playClick, this, 1, 0, 0);
        this.p_bt.scale.setTo(0.5,0.5);
        this.music_bt = game.add.button(game.world.centerX +200, 130, 'music_bt', this.musicClick, this, 1, 0, 0);
        this.music_bt.scale.setTo(0.5,0.5);        
        this.sound_bt = game.add.button(game.world.centerX +200, 210, 'sound_bt', this.soundClick, this, 1, 0, 0);
        this.sound_bt.scale.setTo(0.5,0.5);        
        this.rank_bt = game.add.button(game.world.centerX +200, 290, 'rank_bt', this.rankClick, this, 1, 0, 0);
        this.rank_bt.scale.setTo(0.5,0.5);        
        this.lock_bt = game.add.button(game.world.centerX +200, 370, 'lock_bt', this.lockClick, this, 1, 0, 0);
        this.lock_bt.scale.setTo(0.5,0.5);

        this.p_bt.onInputOver.add(this.buttonOver,this);
        this.music_bt.onInputOver.add(this.buttonOver,this);
        this.sound_bt.onInputOver.add(this.buttonOver,this);
        this.rank_bt.onInputOver.add(this.buttonOver,this);
        this.lock_bt.onInputOver.add(this.buttonOver,this);
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
    lockClick:function(){
        game.state.start('menu');
    },
    musicClick:function(){

    },
    soundClick:function(){

    },
    rankClick:function(){

    },
    update: function() {

    }
};