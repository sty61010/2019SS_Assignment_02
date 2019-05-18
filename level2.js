
var level2State = { 
    preload: function() {
        /// Loat game image
        game.load.image('background', 'assets/background.png');
        game.load.image('pixel', 'assets/flame.png');
        game.load.image('live', 'assets/live.png');
        /// Load block spritesheet.
        game.load.spritesheet('obstacle', 'assets/obstacle.png', 46, 100);
        game.load.spritesheet('enemy', 'assets/enemy.png', 53, 86);
        game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
        // game.load.spritesheet('player', 'assets/player.png', 144, 128);
        // game.load.spritesheet('player', 'assets/ironman.png', 83, 165);
        game.load.spritesheet('player', 'assets/ace.png', 160, 175);

        // game.load.spritesheet('bullet', 'assets/flame.png', 103, 103);
        game.load.spritesheet('bullet', 'assets/bomb1.png', 282, 234);
        game.load.spritesheet('coin', 'assets/coin.png', 32, 35);
        // game.load.spritesheet('boss', 'assets/boss.png', 65, 78);//////
        game.load.spritesheet('boss', 'assets/boss.png', 65, 78);

        ///sound
        game.load.audio('player_fire', 'assets/flame.wav');
        game.load.audio('enemy_fire', 'assets/enemy-fire.wav');
        game.load.audio('enemy_explosion', 'assets/explosion.wav');
        game.load.audio('player_explosion', 'assets/dragon_pain.wav');
        game.load.audio('power_up', 'assets/powerup.wav');
        game.load.audio('coin', 'assets/coin.wav');
        game.load.audio('magnet', 'assets/magnet.wav');
        game.load.audio('roar', 'assets/ace-bomb.wav');
        
    },
    ///create
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    create: function() {
        ///phicics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        ///scrolling background
        this.bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        ///player
        this.createPlayer();
        ///enemy
        this.createEnemy();
        ///bullet
        this.createBullet();
        ///obstacle
        this.createObstacle();
        ///boss
        // this.createBoss();
        ///coin
        this.createCoin();
        ///sound
        this.createSound();
        ///particle

        ///control
        this.cursors = game.input.keyboard.createCursorKeys();
        ///score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Georgia', fill: '#000' });
        ///lives
        lives = game.add.group();
        game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Georgia', fill: '#000' });
        for (var i = 0; i < 3; i++) 
        {
            var live = lives.create(game.world.width - 100 + (30 * i), 60, 'live');
            live.scale.setTo(0.008, 0.008);
            live.alpha = 0.8;
        }
        ///text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Georgia', fill: '#000' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    createBoss:function(){
        this.boss = game.add.sprite(400, 50, 'boss');
        this.boss.anchor.setTo(0.5);
        this.boss.animations.add('boss_fly', [8, 9, 10, 11, 12, 13], 5, true);
        this.boss.play('boss_fly');
        game.physics.arcade.enable(this.boss);
        this.boss.body.collideWorldBounds = true;
        this.boss.enableBody = true;
        this.boss.scale.setTo(4, 4);
    },
    createSound:function(){
        this.player_fireSound=game.add.audio('player_fire');
        this.enemy_fireSound=game.add.audio('enemy_fire');
        this.player_explosionSound=game.add.audio('player_explosion');
        this.enemy_explosionSound=game.add.audio('enemy_explosion');
        this.power_upSound=game.add.audio('power_up');
        this.coinSound=game.add.audio('coin');
        this.magnetSound=game.add.audio('magnet');
        this.roarSound=game.add.audio('roar');
    },
    createParitcle:function(){
        this.particlePool=game.add.group();
        this.particlePool=enableBody=true;
        this.particlePool.createMultiple()
        this.particlePool.setAll('anchor.x',0.5);
        this.particlePool.setAll('anchor.y',0.5);
        ///emitter
        this.emitter = game.add.emitter(0, 0, 150);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-500, 500);
        this.emitter.setXSpeed(-500, 500);
        this.emitter.setScale(2, 0, 2, 0, 800);
        // this.emitter.scale.setTo(0.001,0.001);
        this.emitter.gravity = 0;
    },
    createPlayer:function(){
        this.player = game.add.sprite(400, 550, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('player_fly', [ 1, 2, 3], 5, true);
        this.player.play('player_fly');
        game.physics.arcade.enable(this.player);
        this.player.speed = 300;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 20, 0, -5);
        this.player.scale.setTo(0.7,0.7);
    },
    createObstacle:function(){
        this.obstaclePool = game.add.group();
        this.obstaclePool.enableBody = true;
        this.obstaclePool.createMultiple(50, 'obstacle');
        this.obstaclePool.setAll('anchor.x', 0.5);
        this.obstaclePool.setAll('anchor.y', 0.5);
        this.obstaclePool.setAll('outOfBoundsKill', true);
        this.obstaclePool.setAll('checkWorldBounds', true);
        this.obstaclePool.forEach(function(obstacle) {
            obstacle.animations.add('obstacle_fly',[0, 1, 2, 3, 4], 10, true);
        });
        this.nextobstacleAt = 0;
        this.obstacleDelay = 15000;
    },
    createEnemy:function(){
        this.enemyPool = game.add.group();
        this.enemyPool.enableBody = true;
        this.enemyPool.createMultiple(100, 'enemy');
        this.enemyPool.setAll('anchor.x', 0.5);
        this.enemyPool.setAll('anchor.y', 0.5);
        this.enemyPool.setAll('outOfBoundsKill', true);
        this.enemyPool.setAll('checkWorldBounds', true);
        this.enemyPool.forEach(function(enemy) {
            enemy.animations.add('enemy_fly',[0, 1, 2, 3, 4], 15, true);
        });
        this.nextEnemyAt = 0;
        this.enemyDelay = 500;
    },
    createBullet:function(){
        this.bulletPool = game.add.group();
        this.bulletPool.enableBody = true;
        this.bulletPool.createMultiple(150, 'bullet');
        this.bulletPool.setAll('anchor.x', 0.5);
        this.bulletPool.setAll('anchor.y', 1);
        this.bulletPool.setAll('outOfBoundsKill', true);
        this.bulletPool.setAll('checkWorldBounds', true);
        this.bulletPool.forEach(function(bullet) {
            bullet.animations.add('bullet');
        });
        this.nextShotAt = 0;
        this.shotDelay = 100;   
    },
    createCoin:function(){
        this.coinPool = game.add.group();
        this.coinPool.enableBody = true;
        this.coinPool.createMultiple(100, 'coin');
        this.coinPool.setAll('anchor.x', 0.5);
        this.coinPool.setAll('anchor.y', 0.5);
        this.coinPool.setAll('outOfBoundsKill', true);
        this.coinPool.setAll('checkWorldBounds', true);
        this.coinPool.forEach(function(coin) {
            coin.animations.add('coin_fly',[0, 1, 2, 3, 4], 15, true);
        });
        this.nextcoinAt = 0;
        this.coinDelay = 5000;
    },
    ///update
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    update: function() {
        ///  Scroll the background
        this.bg.tilePosition.x -= 2;        
        ///enemy
        this.GenerateEnemy();
        ///obstacle
        this.GenerateObstacle();
        ///coin
        this.GenerateCoin();
        ///player
        this.MovePlayer();
        ///collide
        game.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);
        game.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.enemyHit, null, this);
        game.physics.arcade.overlap(this.enemyPool, this.obstaclePool, this.obstacleHit, null, this);
        game.physics.arcade.collide(this.player, this.obstaclePool, this.playerMagnet, null, this);
        game.physics.arcade.collide(this.player, this.coinPool, this.coinHit, null, this);
        // game.physics.arcade.overlap(this.enemy, this.emitter, null, null,this);
    }, 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    playerMagnet:function(){
        this.magnetSound.play();
    },
    playerExplosion: function() {
        ///sound
        this.roarSound.play();
        ///emitter
        this.emitter = game.add.emitter(0, 0, 150);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-500, 500);
        this.emitter.setXSpeed(-500, 500);
        this.emitter.setScale(2, 0, 2, 0, 800);
        this.emitter.gravity = 0;
        // this.emitter.scale.setTo(0.1,0.1);

        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y; 
        this.emitter.start(true, 800, null, 15);
    },
    GenerateObstacle: function(){
        if (this.nextobstacleAt<game.time.now && this.obstaclePool.countDead()>0) {
            this.nextobstacleAt = game.time.now + this.obstacleDelay;
            var obstacle = this.obstaclePool.getFirstExists(false);
            obstacle.reset(780, game.rnd.integerInRange(20, 580));
            obstacle.body.velocity.y = game.rnd.integerInRange(-100, 120);
            // obstacle.reset(0,game.rnd.integerInRange(20, 580));
            obstacle.body.velocity.x = -game.rnd.integerInRange(30, 160);
            obstacle.play('obstacle_fly');
        }
    },
    GenerateEnemy: function(){
        if (this.nextEnemyAt<game.time.now && this.enemyPool.countDead()>0) {
            this.nextEnemyAt = game.time.now + this.enemyDelay;
            var enemy = this.enemyPool.getFirstExists(false);
            enemy.reset(780,game.rnd.integerInRange(20, 580));
            enemy.body.velocity.y = game.rnd.integerInRange(-30, 60);
            enemy.body.velocity.x = -game.rnd.integerInRange(30, 60);
            enemy.play('enemy_fly');
        }
    },
    GenerateCoin: function(){
        if (this.nextcoinAt<game.time.now && this.coinPool.countDead()>0) {
            this.nextcoinAt = game.time.now + this.coinDelay;
            var coin = this.coinPool.getFirstExists(false);
            coin.reset(0, game.rnd.integerInRange(20, 20));
            coin.body.velocity.y = game.rnd.integerInRange(50, 90);
            coin.body.velocity.x = game.rnd.integerInRange(30, 90);
            coin.play('coin_fly');
        }
    },
    MovePlayer: function() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.player.speed;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.player.speed;
        }
        else if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.player.speed;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.player.speed;
        }
        if (game.input.activePointer.isDown && game.physics.arcade.distanceToPointer(this.player)>15) {
            game.physics.arcade.moveToPointer(this.player, this.player.speed);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
            this.playerFire();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.Z) ) {
            this.playerExplosion();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.X) ) {

        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.C) ) {

        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W) ) {
            this.cheetingWin();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.L) ) {
            this.cheetingLose();
        }
    },
    cheetingWin:function(){
        outcome=1;
        game.state.start('end');
    },
    cheetingLose:function(){
        outcome=0;
        game.state.start('end');
    },
    coinHit:function(play,coin){
        ///sound
        this.coinSound.play();
        ///Increase the score
        score += 20;
        scoreText.text = scoreString + score;
        if (score>=1000)
        {

            scoreText.text = scoreString + score;
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;

            outcome=1;
            game.state.start('end');
        }
        ///kill
        coin.animations.add('coin_hit',[6, 7, 8, 9, 10, 11], 20, true);
        coin.play('coin_hit');
        coin.kill();
    },
    obstacleHit: function(enemy, obstacle) { 
        ///sound
        this.magnetSound.play();
        ///Increase the score
        score += 100;
        scoreText.text = scoreString + score;
        if (score>=1000)
        {
            scoreText.text = scoreString + score;
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;

            outcome=1;
            game.state.start('end');
        }
        ///
        enemy.animations.add('enemy_hit',[5, 6], 20, true);
        enemy.play('enemy_hit');
        ///explosion
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.setTo(0.5);
        explosion.animations.add('boom');
        explosion.play('boom', 15, false, true);
        enemy.kill();
    },
    enemyHit: function(bullet, enemy) {
        ///sound
        this.enemy_explosionSound.play();
        ///Increase the score
        score += 10;
        scoreText.text = scoreString + score;
        if (score>=1000)
        {
            scoreText.text = scoreString + score;
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;

            outcome=1;
            game.state.start('end');
        }
        ///kill
        enemy.animations.add('enemy_hit',[5, 6], 20, true);
        enemy.play('enemy_hit');
        bullet.kill();
        ///explosion
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.setTo(0.5);
        explosion.animations.add('boom');
        explosion.play('boom', 15, false, true);
        enemy.kill();
    },
    playerHit: function(player, enemy) { 
        ///sound
        this.player_explosionSound.play();
        enemy.kill();
        ///explosioin
        var explosion = game.add.sprite(player.x, player.y, 'explosion');
        explosion.anchor.setTo(0.5);
        explosion.animations.add('boom');
        explosion.play('boom', 15, false, true);

        ///live
        live = lives.getFirstAlive();
        if (live)
        {
            live.kill();
        }
        if (lives.countLiving() < 1)
        {
            player.kill();
            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            outcome=0;
            game.state.start('end');
        }
    },
    playerFire: function() { 
        //sound
        this.player_fireSound.play();

        if (!this.player.alive || this.nextShotAt>game.time.now)
            return;
        if (this.bulletPool.countDead()==0)
            return;
        this.nextShotAt = game.time.now + this.shotDelay;
        var bullet = this.bulletPool.getFirstExists(false);
        bullet.angle=90;
        bullet.reset(this.player.x, this.player.y-20);
        bullet.body.velocity.x = 500;
        bullet.play('bullet',true,true);
    },

};




