//This is the core game area
//var emitter;
demo.ruins = function(){};
demo.ruins.prototype = {
    preload: function(){
        var notDead = true; 
        
    },
    
    create: function(){
        
        timer = game.time.create(false);
        timer.loop(50, spawnEnemy, this);
        timer.start();
        
        
        round_over_timer = game.time.create(false);
        gameover_timer = game.time.create(false);
        note_timer = game.time.create(false);
        weapon_timer = game.time.create(false);
        tutorial_timer = game.time.create(false);
        speed_timer = game.time.create(false);

        // JSON TILE MAP
        map = game.add.tilemap('ruins');
    

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        map.addTilesetImage('terrain_atlas', 'terrain');

        //create layer
        backgroundLayer = map.createLayer('backgroundLayer');
        blockedLayer = map.createLayer('blockedLayer');

        //collision on blockedLayer
        map.setCollisionBetween(1, 1024, true, blockedLayer);

        //resizes the game world to match the layer dimensions
        backgroundLayer.resizeWorld();

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#008000';
        
        //emitter for kill effects
        emitter = game.add.emitter(0, 0, 50);
        emitter.makeParticles('chunk');
        emitter.gravity = 1;
        
        //spawn point & initializing player attributes
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        Player();
        
        // death animations
        dead_player = game.add.sprite(0, 0, 'dead_player');
        dead_player.alpha = 0;
        
        Dead_Player();

        //audio
        gameAudio();

        game.camera.follow(player);

        // enemy spawns and behavior
        carrots = game.add.group();
        carrots.enableBody = true;
        
        broccolis = game.add.group();
        broccolis.enableBody = true;
        
        onions = game.add.group();
        onions.enableBody = true;
        
        carrots = game.add.physicsGroup(Phaser.Physics.ARCADE);
        broccolis = game.add.physicsGroup(Phaser.Physics.ARCADE);
        onions = game.add.physicsGroup(Phaser.Physics.ARCADE);
        explosions = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
//        grocery_store = game.add.sprite(150, 150, 'grocery_store');
//        game.physics.arcade.enable(grocery_store);
//        grocery_store.enableBody = true;

        //this is where we establish ammo refilling
        ammos = game.add.group();
        ammos.enableBody = true;
        
        //health refills
        HPDrops = game.add.group();
        HPDrops.enableBody = true;
        
        //powerups
        pu_speed = game.add.group();
        pu_speed.enableBody = true;
        
        // Here we'll create 5 of them evenly spaced apart
        for (var i = 0; i < 5; i++)
        {
        //consumables
            var ammo = ammos.create(game.world.randomX, game.world.randomY, 'grocery_bag');
            var HPDrop = HPDrops.create(game.world.randomX, game.world.randomY, 'extra_life');
            var speed = pu_speed.create(game.world.randomX, game.world.randomY, 'powerUp_speed');

        }
        
        game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, createDrops, this);
        
        //blood display for low health
        blood = game.add.sprite(0,0, 'blood');
        blood.alpha = 0;
        
        //calling all weapon groups in main.js
        weaponGroups();
        
        //calling the player HUD
        playerHUD();


        spawning = true;
        
        //creating the crosshair
        crosshair = game.add.sprite(game.world.centerX, game.world.centerY, 'crosshair');
        crosshair.fixedToCamera = true;
        crosshair.cameraOffset.setTo(0,0);

        game.physics.arcade.enable(crosshair);

        cursors = game.input.keyboard.createCursorKeys();
        
            
        w=game.input.keyboard.addKey(Phaser.Keyboard.W);
        a=game.input.keyboard.addKey(Phaser.Keyboard.A);
        s=game.input.keyboard.addKey(Phaser.Keyboard.S);
        d=game.input.keyboard.addKey(Phaser.Keyboard.D);
    
        //spacebar is for melee but it's not implemented currently    
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //weapon selection goes here
        weaponToggle = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        weaponToggleB = game.input.keyboard.addKey(Phaser.Keyboard.E);
        
        
        
        
    },
    
    
    
    
    update: function(){
        // go to next round once you kill the enemies in the round
        // there are 15 extra enemies per round so player doesn't have to look for them
        if ((enemiesKilled == enemiesLeft - 15) && enemiesKilled != 0){
            round += 1;
            carrots.callAll('kill');
            broccolis.callAll('kill');
            onions.callAll('kill');
            roundOver();}
        
        PlayerControls();
        playerHUDUpdate();
        
        // low health display
        
        if (playerHP <= 5){
           game.add.tween(blood).to( { alpha: .6 }, 200, "Linear", true);
        }
        else if (playerHP <= 15 && playerHP >5){
           game.add.tween(blood).to( { alpha: .3 }, 200, "Linear", true);
        }
        else{
           game.add.tween(blood).to( { alpha: 0 }, 500, "Linear", true);
        }
        
        if (playerHP == 0){
           notDead = false;
        }
        game.physics.arcade.overlap(player, ammos, collectAmmo, null, this);
        game.physics.arcade.overlap(player, HPDrops, collectHP, null, this);
        game.physics.arcade.overlap(player, pu_speed, collectSpeed, null, this); 
//        game.physics.arcade.overlap(player, grocery_store, goToMedCenter);
        
        game.physics.arcade.collide(player, blockedLayer);
        //do carrots, blocked layer collision need to be removed?
        game.physics.arcade.collide(carrots, blockedLayer);
        game.physics.arcade.collide(broccolis, blockedLayer);
        game.physics.arcade.collide(onions, blockedLayer);
        console.log(game.physics.arcade.collide(player, blockedLayer));
        
        
        // crosshair moves with mouse
        crosshair.fixedtoCamera = true;
        crosshair.cameraOffset.setTo((game.input.mousePointer.x)-25, (game.input.mousePointer.y)-25);
        
        carrots.forEach(move);
        broccolis.forEach(b_move);
        onions.forEach(b_move);
        
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.overlap(player, carrots, loseHealth, null, this);
        game.physics.arcade.overlap(player, broccolis, loseHealth, null, this);
        game.physics.arcade.overlap(player, onions, loseHealth, null, this);
        
        //collision detection for carrots
        //
        //
        game.physics.arcade.collide(bullets, blockedLayer, BLcollisionHandler);
        game.physics.arcade.collide(AR, blockedLayer);
        game.physics.arcade.collide(grenades, blockedLayer);
        game.physics.arcade.overlap(bullets, carrots, collisionHandler, null, this);
        game.physics.arcade.overlap(AR, carrots, ARcollisionHandler, null, this);
        game.physics.arcade.overlap(grenades, carrots, GcollisionHandler, null, this);
        game.physics.arcade.overlap(explosions, carrots, explosionCollisionHandler, null, this);
        game.physics.arcade.overlap(mines, carrots, GcollisionHandler, null, this);
        game.physics.arcade.overlap(flamefuel, carrots, FcollisionHandler, null, this);
        game.physics.arcade.overlap(flames, carrots, FcollisionHandler, null, this);
        //collision detection for broccolis
        //
        //
        game.physics.arcade.overlap(bullets, broccolis, collisionHandler, null, this);
        game.physics.arcade.overlap(AR, broccolis, ARcollisionHandler, null, this);
        game.physics.arcade.overlap(grenades, broccolis, GcollisionHandler, null, this);
        game.physics.arcade.overlap(explosions, broccolis, explosionCollisionHandler, null, this);
        game.physics.arcade.overlap(mines, broccolis, GcollisionHandler, null, this);
        game.physics.arcade.overlap(flamefuel, broccolis, FcollisionHandler, null, this);
        game.physics.arcade.overlap(flames, broccolis, FcollisionHandler, null, this);
        
        //collision detection for onions
        //
        //
        game.physics.arcade.overlap(bullets, onions, collisionHandler, null, this);
        game.physics.arcade.overlap(AR, onions, ARcollisionHandler, null, this);
        game.physics.arcade.overlap(grenades, onions, GcollisionHandler, null, this);
        game.physics.arcade.overlap(explosions, onions, explosionCollisionHandler, null, this);
        game.physics.arcade.overlap(mines, onions, GcollisionHandler, null, this);
        game.physics.arcade.overlap(flamefuel, onions, FcollisionHandler, null, this);
        game.physics.arcade.overlap(flames, onions, FcollisionHandler, null, this);
        
        blood.fixedToCamera = true;
        blood.cameraOffset.setTo(0,0);
        
        WASDText.fixedToCamera = true;
        WASDText.cameraOffset.setTo (220, 160);

        MouseText.fixedToCamera = true;
        MouseText.cameraOffset.setTo (230, 180);

        AmmoText.fixedToCamera = true;
        AmmoText.cameraOffset.setTo (420, 330);

        WeaponText.fixedToCamera = true;
        WeaponText.cameraOffset.setTo (0, 330);


    }
};

//STATE SPECIFIC FUNCTIONS
//
//
function createDrops(){
    
    var ammo = ammos.create(game.world.randomX, game.world.randomY, 'grocery_bag');
    var HPDrop = HPDrops.create(game.world.randomX, game.world.randomY, 'extra_life');
    
}
