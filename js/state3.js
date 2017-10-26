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
        
        //emitter for kill effects
        emitter = game.add.emitter(0, 0, 50);
        emitter.makeParticles('chunk');
        emitter.gravity = 1;
        
        //spawn point & initializing player attributes
        player = game.add.sprite(game.world.centerX, game.world.height - 200, 'player');
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
        
        GardenText = game.add.text(game.world.centerX, game.world.height - 150, 'Go To Garden', {fontSize:'20px', fill: '#000'});
        succulent = game.add.sprite(game.world.centerX, game.world.height - 100, 'succulent');
        game.physics.enable(succulent);
        
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
        
    },
    
    
    
    
    update: function(){
        
        PlayerControls();
        playerHUDUpdate();
        
        game.physics.arcade.overlap(player, ammos, collectAmmo, null, this);
        game.physics.arcade.overlap(player, HPDrops, collectHP, null, this);      
        game.physics.arcade.overlap(player, succulent, goToGarden);
        
        game.physics.arcade.collide(player, 'blockedLayer');
        game.physics.arcade.collide(player, trees);
        
        // crosshair moves with mouse
        crosshair.fixedtoCamera = true;
        crosshair.cameraOffset.setTo((game.input.mousePointer.x)-25, (game.input.mousePointer.y)-25);
        
        baddies.forEach(move);
        broccolis.forEach(b_move);
        
        cursors = game.input.keyboard.createCursorKeys();

        game.physics.arcade.overlap(player, baddies, loseHealth, null, this);
        game.physics.arcade.overlap(player, broccolis, loseHealth, null, this);
        
    game.physics.arcade.overlap(bullets, baddies, collisionHandler, null, this);
    game.physics.arcade.overlap(AR, baddies, ARcollisionHandler, null, this);
    game.physics.arcade.overlap(grenades, baddies, GcollisionHandler, null, this);
    game.physics.arcade.overlap(explosions, baddies, explosionCollisionHandler, null, this);
        
    game.physics.arcade.overlap(bullets, broccolis, collisionHandler, null, this);
    game.physics.arcade.overlap(AR, broccolis, ARcollisionHandler, null, this);
    game.physics.arcade.overlap(grenades, broccolis, GcollisionHandler, null, this);
    game.physics.arcade.overlap(explosions, broccolis, explosionCollisionHandler, null, this);

    }
};
//STATE SPECIFIC FUNCTIONS
//
//
function goToGarden () {
    game.state.start ('state2');
}