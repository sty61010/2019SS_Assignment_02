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
        game.stage.backgroundColor = '#3498db';
        game.add.image(0, 0, 'background'); 

        /// ToDo 2: How can we enable physics in Phaser? (Mode : ARCADE)

        ///

        game.renderer.renderSession.roundPixels = true;

        this.cursor = game.input.keyboard.createCursorKeys();

        
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        this.player.facingLeft = false;


        /// ToDo 3: Add 4 animations.
        /// 1. Create the 'rightwalk' animation with frame rate = 8 by looping the frames 1 and 2

        /// 2. Create the 'leftwalk' animation with frame rate = 8 by looping the frames 3 and 4
        
        /// 3. Create the 'rightjump' animation with frame rate = 16 (frames 5 and 6 and no loop)
        
        /// 4. Create the 'leftjump' animation with frame rate = 16 (frames 7 and 8 and no loop)
        
        ///


        /// Add a little yellow block :)
        this.yellowBlock = game.add.sprite(200, 320, 'block1');
        this.yellowBlock.animations.add('Yblockanim', [0, 1, 2, 3], 8,  true);
        game.physics.arcade.enable(this.yellowBlock);
        this.yellowBlock.body.immovable = true;        
        
        /// Add a little dark blue block ;)
        this.blueBlock = game.add.sprite(422, 320, 'block2');
        this.blueBlock.animations.add('Bblockanim', [0, 1, 2, 3], 8,  true);
        game.physics.arcade.enable(this.blueBlock);
        this.blueBlock.body.immovable = true;
        

        /// Particle
        this.emitter = game.add.emitter(422, 320, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.setScale(2, 0, 2, 0, 800);
        this.emitter.gravity = 500;


        /// Add floor
        this.floor = game.add.sprite(0, game.height - 30, 'ground'); 
        game.physics.arcade.enable(this.floor);
        this.floor.body.immovable = true;

        game.physics.arcade.enable(this.player);

        // Add vertical gravity to the player
        this.player.body.gravity.y = 500;

    },
    blockTween: function() {

        var yellowBlockOriginalX = this.yellowBlock.x;
        var yellowBlockOriginalY = this.yellowBlock.y;
        /// ToDo 4: Tween yellow block.
        ///     Add Tween here: game.add.tween(this.yellowBlock)....? 
        ///     Move block to 20px above its original place with duration 100 ms 
        ///     And move it back (yoyo function).

        ///
    },

    blockParticle: function() {

        /// ToDo 5: Start our emitter.
        ///      1. We'll burst out all partice at once.
        ///      2. The particle's lifespan is 800 ms.
        ///      3. Set frequency to null since we will burst out all partice at once.
        ///      4. We'll launch 15 particle.

        ///
    },
    update: function() {
        /// ToDo 6: Add collision 
        /// 1. Add collision between player and walls
        
        /// 2. Add collision between player and floor
        
        /// 3. Add collision between player and yellowBlock and add trigger animation "blockTween"
        
        /// 4. Add collision between player and blueBlock and add trigger animation "blockParticle"
        
        ///

        // Play the animation.
        this.yellowBlock.animations.play('Yblockanim');
        this.blueBlock.animations.play('Bblockanim');


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
            if(this.player.body.touching.down){
                // Move the player upward (jump)
                if(this.player.facingLeft) {
                    /// 3. Play the 'leftjump' animation

                    ///
                }else {
                    /// 4. Play the 'rightjump' animation

                    ///
                }
                this.player.body.velocity.y = -350;
            }
        }  
        // If neither the right or left arrow key is pressed
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
            this.player.animations.stop();
        }    
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
game.state.add('main', main);
game.state.start('main');



