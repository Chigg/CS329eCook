demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){

        
    },
    
    create: function(){
        timer = game.time.create(false);
        timer.loop(difficulty, spawnEnemy, this);
        timer.start();
        
        
        //creates the floor
        background = game.add.tileSprite(0, 0, 1920, 1920, 'checkered_tile');
        game.world.setBounds(0, 0, 1920, 1920);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';

        //spacebar is for melee but it's not implemented currently    
        
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //weapon selection goes here
        wep1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        wep2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        wep3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        baddies = game.add.physicsGroup(Phaser.Physics.ARCADE);
        broccolis = game.add.physicsGroup(Phaser.Physics.ARCADE);
        explosions = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        emitter = game.add.emitter(0, 0, 50);

        emitter.makeParticles('chunk');
        emitter.gravity = -10;

        player = game.add.sprite(game.world.centerX, game.world.height - 200, 'player');
        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.ARCADE;

        //animations  
        //player animations
        player.animations.add('right', [0,1,2,3,4,5,6], 13, true);
        player.animations.add('left', [7,8,9,10,11,12,13], 13, true);

        player.frame = 0;
        player.animations.add('meleeRight', [14,15,16], 0, false);
        player.animations.add('meleeLeft', [17,18,19], 0, false);
        

        //audio
        meleeSound = game.add.audio('melee_sound');
        ar_sound = game.add.audio('ar_sound');
        explosion_sound = game.add.audio('explosion');
        smash = game.add.audio('smash');
        grunt = game.add.audio('grunt');
        whack = game.add.audio('whack');
        splat = game.add.audio('splat');

        //physics
        game.physics.arcade.enable(player);

        game.camera.follow(player);

        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.collideWorldBounds = true;

        // enemy spawns and behavior
        baddies = game.add.group();
        baddies.enableBody = true;
        
        broccolis = game.add.group();
        broccolis.enableBody = true;

        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);

        med_center = game.add.sprite(150, 150, 'med_center');
        game.physics.arcade.enable(med_center);
        med_center.enableBody = true;

    //        for (var i = 0; i < 15; i++)
    //            {
    //                var baddie = baddies.create(game.world.randomX, game.world.randomY, 'baddie');
    //                //baddie animations
    //                baddie.animations.add('bRight',[5,6,7], 16, true);
    //                baddie.animations.add('bLeft',[8,9,10], 16, true);
    //                baddie.animations.add('meleeRight', [0,1,2], true);
    //                baddie.animations.add('meleeLeft', [13,14,15], true);
    //                
    //                baddie.animations.play("bRight");
    //            }

    //this is where we establish ammo refilling
        ammos = game.add.group();
        ammos.enableBody = true;

        HPDrops = game.add.group();
        HPDrops.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
        //  Create a star inside of the 'stars' group
            var ammo = ammos.create(game.world.randomX, game.world.randomY, 'grocery_bag');
            var HPDrop = HPDrops.create(game.world.randomX, game.world.randomY, 'extra_life');

        }

    //this is where we establish knife projectiles
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

    //explosions
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(50, 'explosion');
        

    //this is where we establish AR projectiles

        AR = game.add.group();
        AR.enableBody = true;
        AR.physicsBodyType = Phaser.Physics.ARCADE;
        AR.createMultiple(100, 'assault_round');
        AR.setAll('checkWorldBounds', true);
        AR.setAll('outOfBoundsKill', true);
        
    //this is where we establish AR projectiles

        grenades = game.add.group();
        grenades.enableBody = true;
        grenades.physicsBodyType = Phaser.Physics.ARCADE;
        grenades.createMultiple(100, 'grenade');
        grenades.setAll('checkWorldBounds', true);
        grenades.setAll('outOfBoundsKill', true);

    //this is where we establish shotgun projectiles
    //        shells = game.add.group();
    //        shells.enableBody = true;

        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);

        HPText = game.add.text(16, 16, 'Health: ' + playerHP, {fontSize: '15px', fill: '#000'});
        scoreText = game.add.text(16, 16, 'Score: ' + score, {fontSize: '15px', fill: '#000'});    
        ammoText = game.add.text(16, 16, 'Ammo: ' + '∞', {fontSize: '15px', fill: '#000'});
        weaponsText = game.add.text(16, 16, '1    2    3', {fontSize: '15px', fill: '#000'});
        //difficultyText = game.add.text(16, 16, 'difficulty: ' + difficulty, {fontSize: '15px', fill: '#000'});  
        
        GardenText = game.add.text(game.world.centerX, game.world.height - 150, 'Go To Garden', {fontSize:'20px', fill: '#000'});
        succulent = game.add.sprite(game.world.centerX, game.world.height - 100, 'succulent');
        game.physics.enable(succulent);
        
        health_bar = game.add.sprite(16, 16, 'health_bar');
        
        //0 UnSelected, 1 Selected, 2 No Ammo, 3 No Ammo, 4Locked
        //knife
        k_ui = game.add.sprite(0,10, 'knife_ui');
        k_ui.animations.add('us', [0], 0, true);
        k_ui.animations.add('s', [1], 1, true);
        k_ui.animations.add('na', [2], 2, true);
        k_ui.animations.add('nas', [3], 3, true);
        k_ui.animations.add('l', [4], 4, true);
        //Assult Rifle
        ar_ui = game.add.sprite(0,10, 'ar_ui');
        ar_ui.animations.add('us', [0], 0, true);
        ar_ui.animations.add('s', [1], 1, true);
        ar_ui.animations.add('na', [2], 2, true);
        ar_ui.animations.add('nas', [3], 3, true);
        ar_ui.animations.add('l', [4], 4, true);
        //Grenade
        g_ui = game.add.sprite(0,10, 'grenade_ui');
        g_ui.animations.add('us', [0], 0, true);
        g_ui.animations.add('s', [1], 1, true);
        g_ui.animations.add('na', [2], 2, true);
        g_ui.animations.add('nas', [3], 3, true);
        g_ui.animations.add('l', [4], 4, true);

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
        
        ammoText.fixedToCamera = true;
        ammoText.cameraOffset.setTo(490, 370);
        
        weaponsText.fixedToCamera = true;
        weaponsText.cameraOffset.setTo(10, 350);
        
        k_ui.fixedToCamera = true;
        k_ui.cameraOffset.setTo(5, 370);
        
        ar_ui.fixedToCamera = true;
        ar_ui.cameraOffset.setTo(30, 370);
        
        g_ui.fixedToCamera = true;
        g_ui.cameraOffset.setTo(55, 370);
        
        game.physics.arcade.overlap(player, ammos, collectAmmo, null, this);
        game.physics.arcade.overlap(player, HPDrops, collectHP, null, this);
        
        game.physics.arcade.collide(player, 'blockedLayer');
        
        
        game.physics.arcade.overlap(player, med_center, goToMedCenter);
        
        console.log(game.physics.arcade.overlap(player, med_center));
        
        /*//if the distance to pointer is greater than 50, the sprite while move to the new cursor position
        if(game.physics.arcade.distanceToPointer(crosshair, game.input.activePointer)> 50)
            {
                //crosshair refers to the sprite, while 1000 refers to the speed at which the sprite moves
                game.physics.arcade.moveToPointer(crosshair, 1000);
            }
        else
        //if the cursor is within 50, it will not move. This is likely redundant, but I didn't want to take any chances
        //since it's a peripheral
            {
                crosshair.body.velocity.set(0);
            }*/
        
        // crosshair moves with mouse
        crosshair.fixedtoCamera = true;
        crosshair.cameraOffset.setTo((game.input.mousePointer.x)-25, (game.input.mousePointer.y)-25);
        
        baddies.forEach(move);
        broccolis.forEach(b_move);
        
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.overlap(player, baddies, loseHealth, null, this);
        game.physics.arcade.overlap(player, broccolis, loseHealth, null, this);
        
        
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
            //uncommenting these below lines will cause the enemies to stop with the player
            //for debugging purposes
//            baddies.setAll('body.velocity.x',0);
//            baddies.setAll('body.velocity.y',0);
        }
        
       // console.log(player.meleeRight.animations.currentAnim.isPlaying); 
        
        if (attackButton.isDown) {
            //&& game.time.now > attackTimer
            // attackTimer = game.time.now + 300;
            if (look_left){
                player.animations.play('meleeLeft');
                
            }
             else {
                player.animations.play('meleeRight');
             }
                    
                }
        
        // game over if player loses all health
        if (playerHP <= 0) {
            resetGame();
        }
        
        //if number one is pressed, it pulls the knife out and puts away the other weapons
        
        if (wep1.isDown){
            knifeOut = true;
            wep2Out = false;
            wep3Out = false;
            
        }
        
        if (wep2.isDown){
            knifeOut = false;
            wep2Out = true;
            wep3Out = false;
            
        }
        
        if (wep3.isDown){
            knifeOut = false;
            wep2Out = false;
            wep3Out = true;
        }
        
        if (knifeOut){
            ammoText.text = 'Knives: ' + ammo1;
            if (ammo1 == 0){
            k_ui.animations.play('nas');
            }
            else{
                k_ui.animations.play('s');
            }
            if (ammo2 == 0){
                ar_ui.animations.play('na');
            }
            else{
                ar_ui.animations.play('us');
            }
            
            if (ammo3 == 0){
                g_ui.animations.play('na');
            }
            else{
                g_ui.animations.play('us');
            }
            
        }
        if(wep2Out){
            ammoText.text = 'AR Ammo: ' + ammo2;
            if (ammo1 == 0){
                k_ui.animations.play('na');
            }
            else{
                k_ui.animations.play('us');
            }
            if (ammo2 == 0){
                ar_ui.animations.play('nas');
            }
            else{
                ar_ui.animations.play('s');
            }
            
            if (ammo3 == 0){
                g_ui.animations.play('na');
            }
            else{
                g_ui.animations.play('us');
            }
        }
        if(wep3Out){
            ammoText.text = 'Grenades: ' + ammo3;
            if (ammo1 == 0){
                k_ui.animations.play('na');
            }
            else{
                k_ui.animations.play('us');
            }
            if (ammo2 == 0){
                ar_ui.animations.play('na');
            }
            else{
                ar_ui.animations.play('us');
            }
            
            if (ammo3 == 0){
                g_ui.animations.play('nas');
            }
            else{
                g_ui.animations.play('s');
            }
        }
        
        if (game.input.activePointer.isDown)
        {   
            if(knifeOut & ammo1 > 0){
                throwKnife();
            }
            
            if(wep2Out & ammo2 > 0){
                ARFire();
                //weapon 2 function
            }
            
            if(wep3Out & ammo3 > 0){
                //weapon 3 function
                throwGrenade();
            }
            
        }
        
    game.physics.arcade.overlap(bullets, baddies, collisionHandler, null, this);
    game.physics.arcade.overlap(AR, baddies, ARcollisionHandler, null, this);
    game.physics.arcade.overlap(grenades, baddies, GcollisionHandler, null, this);
    game.physics.arcade.overlap(explosions, baddies, explosionCollisionHandler, null, this);
        
    game.physics.arcade.overlap(bullets, broccolis, collisionHandler, null, this);
    game.physics.arcade.overlap(AR, broccolis, ARcollisionHandler, null, this);
    game.physics.arcade.overlap(grenades, broccolis, GcollisionHandler, null, this);
    game.physics.arcade.overlap(explosions, broccolis, explosionCollisionHandler, null, this);
    game.physics.arcade.overlap(player, succulent, goToGarden);

    }
};

function goToGarden () {
    game.state.start ('state2');
}