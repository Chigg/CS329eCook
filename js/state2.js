//This is the core game area
//var emitter;
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){

        
    },
    
    create: function(){
        
        timer = game.time.create(false);
        timer.loop(difficulty, spawnEnemy, this);
        timer.start();

        // JSON TILE MAP
        map = game.add.tilemap('garden');

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

        //audio
        gameAudio();

        game.camera.follow(player);

        // enemy spawns and behavior
        baddies = game.add.group();
        baddies.enableBody = true;
        
        broccolis = game.add.group();
        broccolis.enableBody = true;
        
        baddies = game.add.physicsGroup(Phaser.Physics.ARCADE);
        broccolis = game.add.physicsGroup(Phaser.Physics.ARCADE);
        explosions = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        grocery_store = game.add.sprite(150, 150, 'grocery_store');
        game.physics.arcade.enable(grocery_store);
        grocery_store.enableBody = true;

        //this is where we establish ammo refilling
        ammos = game.add.group();
        ammos.enableBody = true;
        
        //health refills
        HPDrops = game.add.group();
        HPDrops.enableBody = true;
        
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
        //  Create a star inside of the 'stars' group
            var ammo = ammos.create(game.world.randomX, game.world.randomY, 'grocery_bag');
            var HPDrop = HPDrops.create(game.world.randomX, game.world.randomY, 'extra_life');

        }
        
        
        //calling all weapon groups in main.js
        weaponGroups();
        
        trees = game.add.group();
        trees.enableBody = true;
        game.physics.arcade.enable(trees);
        xCoord = Math.random(0, 1920);
        yCoord = Math.random(0, 1920);

        for (var i = 0; i < 5; i++)
            {

                tree = game.add.sprite(game.world.centerX * xCoord, game.world.centerY * yCoord, 'tree');
                xCoord = Math.random(0, xCoord + 100)
                yCoord = Math.random(0, yCoord + 100)
                
            }
        //calling the player HUD
        playerHUD();

        spawning = true;
        
        //creating the crosshair
        crosshair = game.add.sprite(game.world.centerX, game.world.centerY, 'crosshair');
        crosshair.fixedToCamera = true;
        crosshair.cameraOffset.setTo(0,0);

        game.physics.arcade.enable(crosshair);

        cursors = game.input.keyboard.createCursorKeys();
        
    },
    
    
    
    
    update: function(){
        
        PlayerControls();
        playerHUDUpdate();
        
        game.physics.arcade.overlap(player, ammos, collectAmmo, null, this);
        game.physics.arcade.overlap(player, HPDrops, collectHP, null, this);      
        game.physics.arcade.overlap(player, grocery_store, goToMedCenter);
        
        game.physics.arcade.collide(player, blockedLayer);
        console.log(game.physics.arcade.collide(player, blockedLayer));
        
        game.physics.arcade.collide(player, trees);
        
        // crosshair moves with mouse
        crosshair.fixedtoCamera = true;
        crosshair.cameraOffset.setTo((game.input.mousePointer.x)-25, (game.input.mousePointer.y)-25);
        
        baddies.forEach(move);
        broccolis.forEach(b_move);
        
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.overlap(player, baddies, loseHealth, null, this);
        game.physics.arcade.overlap(player, broccolis, loseHealth, null, this);
        
    //collision detection for carrots
    //
    //
    game.physics.arcade.overlap(bullets, baddies, collisionHandler, null, this);
    game.physics.arcade.overlap(AR, baddies, ARcollisionHandler, null, this);
    game.physics.arcade.overlap(grenades, baddies, GcollisionHandler, null, this);
    game.physics.arcade.overlap(explosions, baddies, explosionCollisionHandler, null, this);
    game.physics.arcade.overlap(mines, baddies, GcollisionHandler, null, this);
    game.physics.arcade.overlap(flamefuel, baddies, FcollisionHandler, null, this);
    //collision detection for broccolis
    //
    //
    game.physics.arcade.overlap(bullets, broccolis, collisionHandler, null, this);
    game.physics.arcade.overlap(AR, broccolis, ARcollisionHandler, null, this);
    game.physics.arcade.overlap(grenades, broccolis, GcollisionHandler, null, this);
    game.physics.arcade.overlap(explosions, broccolis, explosionCollisionHandler, null, this);
    game.physics.arcade.overlap(mines, broccolis, GcollisionHandler, null, this);
    game.physics.arcade.overlap(flamefuel, broccolis, FcollisionHandler, null, this);
    

    }
};

//STATE SPECIFIC FUNCTIONS
//
//
function goToMedCenter () {
    game.state.start ('state3');
}
