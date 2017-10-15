//This is the core game area

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){

        
    },
    
    create: function(){
        timer = game.time.create(false);
        timer.loop(4000,spawnEnemy, this);
        timer.start();
        
        // JSON TILE MAP
        this.map = this.add.tilemap('garden');
 
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('terrain_atlas', 'terrain');

        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();
        
        
        // TILED GRASS
        // background = game.add.tileSprite(0, 0, 1920, 1920, 'grass');
        
        
        //game.world.setBounds(0, 0, 1920, 1920);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';
        
        //spacebar is for melee but it's not implemented currently
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.ARCADE;
        
        //ANIMATIONS
        
        //player animations
        player.animations.add('right', [0,1,2,3,4,5,6], 13, true);
        player.animations.add('left', [7,8,9,10,11,12,13], 13, true);
        
        player.frame = 0;
        player.animations.add('meleeRight', [14,15,16], 0, false);
        player.animations.add('meleeLeft', [17,18,19], 0, false);

        
        //audio
        meleeSound = game.add.audio('melee_sound');
        
        //physics
        game.physics.arcade.enable(player);
        
        game.camera.follow(player);
        
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;
        
        // enemy spawns and behavior
        baddies = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        onions = game.add.physicsGroup(Phaser.Physics.ARCADE);

        baddies = game.add.group();
        baddies.enableBody = true;
        
      
        
        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);
        
        for (var i = 0; i < 5; i++)
            {
                var baddie = baddies.create(game.world.randomX, game.world.randomY, 'baddie');
                //baddie animations
                baddie.animations.add('bRight',[5,6,7], 16, true);
                baddie.animations.add('bLeft',[8,9,10], 16, true);
                baddie.animations.add('meleeRight', [0,1,2], true);
                baddie.animations.add('meleeLeft', [13,14,15], true);
                
                baddie.animations.play("bRight");
                
            }
        
        
        
    //this is where we establish projectiles
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        trees = game.add.group();
        
        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);
        
//        for (var i = 0; i < 5; i++)
//            {
//                
//                tree = game.add.sprite(game.world.centerX * xCoord, game.world.centerY * yCoord, 'tree');
//                xCoord = Math.random(0, xCoord + 100)
//                yCoord = Math.random(0, yCoord + 100)
//            }
//        
        HPText = game.add.text(16, 16, 'Health: ' + playerHP, {fontSize: '15px', fill: '#000'});
        scoreText = game.add.text(16, 16, 'Score: ' + score, {fontSize: '15px', fill: '#000'});
        health_bar = game.add.sprite(16, 16, 'health_bar');
        
        w=game.input.keyboard.addKey(Phaser.Keyboard.W);
        a=game.input.keyboard.addKey(Phaser.Keyboard.A);
        s=game.input.keyboard.addKey(Phaser.Keyboard.S);
        d=game.input.keyboard.addKey(Phaser.Keyboard.D);
        spawning = true;
        
        
        crosshair = game.add.sprite(game.world.centerX, game.world.centerY, 'crosshair');
        crosshair.fixedToCamera = true;
        crosshair.cameraOffset.setTo(0,0);
        
        game.physics.arcade.enable(crosshair);
            
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    
    
    
    update: function(){
        
        // text is locked in upper left corner
        HPText.fixedToCamera = true;
        HPText.cameraOffset.setTo(135, 15);
        
        health_bar.fixedToCamera = true;
        health_bar.cameraOffset.setTo(0, 15);
        
        scoreText.fixedToCamera = true;
        scoreText.cameraOffset.setTo(0,40);

        // crosshair moves with mouse
        crosshair.fixedtoCamera = true;
        crosshair.cameraOffset.setTo(game.input.mousePointer.x, game.input.mousePointer.y);
        
        game.physics.arcade.collide(player, 'blockedLayer');
        game.physics.arcade.collide(baddies, 'blockedLayer');
        
        baddies.forEach(move);
        
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.overlap(player, baddies, loseHealth, null, this);
        
        
        if (w.isDown || a.isDown || s.isDown || d.isDown)
        {
            
            if (d.isDown){
                player.x += 4;
                player.animations.play('right');
                look_left = false;
            }
            
            if (a.isDown){
                player.x -= 4;
                player.animations.play('left');
                look_left = true;
            }
            
            if (s.isDown){
                player.y += 4;
                if(look_left){player.animations.play('left');}
                else{player.animations.play('right');}
            }
            
            if (w.isDown){
                player.y -= 4;
                if(look_left){player.animations.play('left');}
                else{player.animations.play('right');}
            }
        }
        else {
            player.animations.stop(null, true)
            baddies.setAll('body.velocity.x',0);
        }
        
       // console.log(player.meleeRight.animations.currentAnim.isPlaying); 
        
        if (attackButton.isDown) {
            //&& game.time.now > attackTimer
            // attackTimer = game.time.now + 300;
            if (look_left){
                player.animations.play('meleeLeft');
                meleeSound.play()
            }
             else {
                player.animations.play('meleeRight');
                meleeSound.play()
             }
                    
                }
        
        // game over if player loses all health
        if (playerHP <= 0) {
            resetGame();
        }
        
        if (game.input.activePointer.isDown)
        {   
            fire();
        }
        
      game.physics.arcade.overlap(bullets, baddies, collisionHandler, null, this);


    }
};

function collisionHandler (bullet, baddie) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    baddie.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function fire(){
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        
        var bullet = bullets.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        bullet.reset(player.x + 35, player.y + 30);
        bullet.anchor.setTo(0.5,0.5);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        game.physics.arcade.moveToPointer(bullet, 800);
        
        if (look_left){
                player.animations.play('meleeLeft');
                meleeSound.play()
                }
        else {
                player.animations.play('meleeRight');
                meleeSound.play()
             }
    }
}

// player loses health when hit by enemy
function loseHealth (player, baddies) {
    playerHP -= 1;
    HPFrame += 1;
    health_bar.frame = HPFrame;
    HPText.text = 'Health: ' + playerHP;
    
}

function move (baddie) {
    if (baddie.body.velocity == 0) {
           baddie.animations.play ("bRight");
    }
    
   if (game.physics.arcade.distanceBetween(baddie, player) <= attackDistance) {
       game.physics.arcade.moveToObject(baddie,player,200);
       
       
       // moving left
       if (baddie.body.velocity.x < 0) {
           baddie.animations.play("bLeft");
           
       // moving right   
       } else if (baddie.body.velocity.x > 0) {
           baddie.animations.play("bRight");
           
       }
    }
}

//function move(baddie) {
//    game.physics.arcade.moveToObject(baddie,player,60,enemyspeed*2000);
//    baddie.animations.play("bRight");
//}

function resetGame() {
    game.state.start('gameover');
    
}

function meleeLeft(){
    player.animations.play('meleeLeft');
    meleeSound.play()
}

function meleeRight(){
    player.animations.play('meleeRight')
    meleeSound.play()
}

function spawnEnemy() {
    
    for (var i = 0; i < Math.random(0,100); i++)
            {
                var baddie = baddies.create(game.world.randomX, game.world.randomY, 'baddie');
                //baddie animations
                baddie.animations.add('bRight',[5,6,7], 16, true);
                baddie.animations.add('bLeft',[8,9,10], 16, true);
                baddie.animations.add('meleeRight', [0,1,2], true);
                baddie.animations.add('meleeLeft', [13,14,15], true);
                
                
                baddie.animations.play("bRight");
            }
    
    
    spawning = false;
    
}
