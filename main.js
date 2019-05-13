var score = 0;
var scoreString = '';
var scoreText;
var lives;
var stateText;

var main = {
    preload: function() {
        // Loat game sprites.
        game.load.image('background', 'assets/background.png');
        game.load.image('pixel', 'assets/pixel.png');
        game.load.image('live', 'assets/live.png');
        /// Load block spritesheet.
        game.load.spritesheet('obstacle', 'assets/obstacle.png', 46, 100);
        game.load.spritesheet('enemy', 'assets/enemy.png', 53, 86);
        game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
        game.load.spritesheet('player', 'assets/player.png', 144, 128);
        game.load.spritesheet('bullet', 'assets/flame.png', 103, 103);
        game.load.spritesheet('bullet2', 'assets/bomb1.png', 282, 234);
        game.load.spritesheet('coin', 'assets/coin.png', 46, 100);

        
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        ///scrolling background
        this.bg = game.add.tileSprite(0, 0, 800, 600, 'background');

        ///player
        this.player = game.add.sprite(400, 550, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('player_fly', [0, 1, 2], 5, true);
        this.player.play('player_fly');
        game.physics.arcade.enable(this.player);
        this.player.speed = 300;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 20, 0, -5);
        
        ///enemy
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
        this.enemyDelay = 1500;
    
        ///bullet
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
        
        ///obstacle
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

        ///control
        this.cursors = game.input.keyboard.createCursorKeys();

        ///score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Georgia', fill: '#000' });

        ///lives
        lives = game.add.group();
        game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Georgia', fill: '#000' });

        ///Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Georgia', fill: '#000' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        for (var i = 0; i < 3; i++) 
        {
            var live = lives.create(game.world.width - 100 + (30 * i), 60, 'live');
            live.scale.setTo(0.008, 0.008);
            // live.alpha = 0.4;
        }

        /// Particle
        // this.emitter = game.add.emitter(422, 320, 150);
        // this.emitter.makeParticles('pixel');
        // this.emitter.setYSpeed(-150, 150);
        // this.emitter.setXSpeed(-150, 150);
        // this.emitter.setScale(2, 0, 2, 0, 800);
        // this.emitter.gravity = 0;
    },

    update: function() {
        ///  Scroll the background
        this.bg.tilePosition.y += 2;        
        ///enemy
        this.GenerateEnemy();
        ///obstacle
        this.GenerateObstacle();
        ///player
        this.MovePlayer();
        ///collide
        game.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);
        game.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.enemyHit, null, this);
        game.physics.arcade.overlap(this.enemyPool, this.obstaclePool, this.obstacleHit, null, this);
        game.physics.arcade.collide(this.player, this.obstaclePool, null, null, this);
    }, 
    explosion: function() {

        /// ToDo 5: Start our emitter.
        ///      1. We'll burst out all partice at once.
        ///      2. The particle's lifespan is 800 ms.
        ///      3. Set frequency to null since we will burst out all partice at once.
        ///      4. We'll launch 15 particle.


    },
    playerDie: function() { game.state.start('main');},
    GenerateObstacle: function(){
        if (this.nextobstacleAt<game.time.now && this.obstaclePool.countDead()>0) {
            this.nextobstacleAt = game.time.now + this.obstacleDelay;
            var obstacle = this.obstaclePool.getFirstExists(false);
            obstacle.reset(game.rnd.integerInRange(20, 780), 0);
            obstacle.body.velocity.y = game.rnd.integerInRange(30, 60);
            // obstacle.reset(0,game.rnd.integerInRange(20, 580));
            // obstacle.body.velocity.x = game.rnd.integerInRange(30, 60);
            obstacle.play('obstacle_fly');
        }
    },
    GenerateEnemy: function(){
        if (this.nextEnemyAt<game.time.now && this.enemyPool.countDead()>0) {
            this.nextEnemyAt = game.time.now + this.enemyDelay;
            var enemy = this.enemyPool.getFirstExists(false);
            enemy.reset(game.rnd.integerInRange(20, 780), 0);
            enemy.body.velocity.y = game.rnd.integerInRange(30, 60);
            enemy.body.velocity.x = game.rnd.integerInRange(30, 60);

            enemy.play('enemy_fly');
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
            this.fire();
        }
        
 
    },
    obstacleHit: function(enemy, obstacle) { 
        ///Increase the score
        score += 50;
        scoreText.text = scoreString + score;
        if (score>=1000)
        {
            score += 1000;
            scoreText.text = scoreString + score;

            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;
        }
        ///
        enemy.animations.add('enemy_hit',[5, 6], 20, true);
        enemy.play('enemy_hit');
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.setTo(0.5);
        explosion.animations.add('boom');
        explosion.play('boom', 15, false, true);
        enemy.kill();;
        game.load.spritesheet('bullet', 'assets/bomb1.png', 282, 234);
    },
    enemyHit: function(bullet, enemy) {
        ///Increase the score
        score += 10;
        scoreText.text = scoreString + score;
        if (score>=1000)
        {
            score += 1000;
            scoreText.text = scoreString + score;
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;
        }
        ///
        enemy.animations.add('enemy_hit',[5, 6], 20, true);
        enemy.play('enemy_hit');
        bullet.kill();
        var explosion = game.add.sprite(enemy.x, enemy.y, 'explosion');
        explosion.anchor.setTo(0.5);
        explosion.animations.add('boom');
        explosion.play('boom', 15, false, true);
        enemy.kill();

    },
    playerHit: function(player, enemy) { 
        enemy.kill();
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
        }
    },
    fire: function() { 
        if (!this.player.alive || this.nextShotAt>game.time.now)
            return;
        if (this.bulletPool.countDead()==0)
            return;
        this.nextShotAt = game.time.now + this.shotDelay;
        var bullet = this.bulletPool.getFirstExists(false);
        bullet.reset(this.player.x, this.player.y-20);
        bullet.body.velocity.y = -500;
        bullet.play('bullet',true,true);
    },


};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
game.state.add('main', main);
game.state.start('main');



