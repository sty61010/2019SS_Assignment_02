var main = {
    preload: function() {
        // Loat game sprites.
        game.load.image('background', 'assets/bg.png');
        game.load.image('pixel', 'assets/pixel.png');
        game.load.image('bullet', 'assets/bullet.png');
        
        /// Load block spritesheet.
        game.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
        game.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
        game.load.spritesheet('player', 'assets/player.png', 64, 64);
    },
    create: function() {
        game.stage.backgroundColor = 'black';
        game.add.image(0, 0, 'background'); 

        game.physics.startSystem(Phaser.Physics.ARCADE);
  
        ///player
        // this.sea = game.add.tileSprite(0, 0, 800, 600, 'sea');
        this.player = game.add.sprite(400, 550, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('fly', [0, 1, 2], 20, true);
        this.player.play('fly');
        game.physics.arcade.enable(this.player);
        this.player.speed = 30;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 20, 0, -5);

        ///bullet
        this.bulletPool = game.add.group();
        this.bulletPool.enableBody = true;
        this.bulletPool.createMultiple(100, 'bullet');
        this.bulletPool.setAll('anchor.x', 0.5);
        this.bulletPool.setAll('anchor.y', 0.5);
        this.nextShotAt = 0;
        this.shotDelay = 100;
        
        ///enemy
        this.enemyPool = game.add.group();
        this.enemyPool.enableBody = true;
        this.enemyPool.createMultiple(50, 'enemy');
        this.enemyPool.setAll('anchor.x', 0.5);
        this.enemyPool.setAll('anchor.y', 0.5);
        this.enemyPool.setAll('outOfBoundsKill', true);
        this.enemyPool.setAll('checkWorldBounds', true);
        this.enemyPool.forEach(function(enemy) {
          enemy.animations.add('fly',[0, 1, 2], 20, true);
        });
        this.nextEnemyAt = 0;
        this.enemyDelay = 1000;
    
        /// Particle
        this.emitter = game.add.emitter(422, 320, 150);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.setScale(2, 0, 2, 0, 800);
        this.emitter.gravity = 0;
    },


    explosion: function() {

        /// ToDo 5: Start our emitter.
        ///      1. We'll burst out all partice at once.
        ///      2. The particle's lifespan is 800 ms.
        ///      3. Set frequency to null since we will burst out all partice at once.
        ///      4. We'll launch 15 particle.

        ///
    },
    update: function() {



        if (!this.player.inWorld) { this.playerDie();}
        this.movePlayer();
    }, 
    playerDie: function() { game.state.start('main');},

    /// ToDo 7: Finish the 4 animation part.
    movePlayer: function() {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.facingLeft = true;

            /// 1. Play the animation 'leftwalk'

            ///
        }
        else if (this.cursor.right.isDown) { 
            this.player.body.velocity.x = 200;
            this.player.facingLeft = false;

            /// 2. Play the animation 'rightwalk' 

            ///
        }    

        // If the up arrow key is pressed, And the player is on the ground.
        else if (this.cursor.up.isDown) { 

            
        }  
        // If neither the right or left arrow key is pressed
        else if (this.cursor.up.isDown) { 

            
        }  
        else {
            // Stop the player 
            this.player.body.velocity.x = 0;
        
            if(this.player.facingLeft) {
                // Change player frame to 3 (Facing left)
                this.player.frame = 3;
            }else {
                // Change player frame to 1 (Facing right)
                this.player.frame = 1;
            }
            // Stop the animation
            // this.player.animations.stop();
        }    
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
game.state.add('main', main);
game.state.start('main');



