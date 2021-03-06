var game = new Phaser.Game(600, 400, Phaser.CANVAS);

game.state.add('load', demo.load);
game.state.add('menu', demo.menu);
game.state.add('mapmenu', demo.mapmenu);
game.state.add('garden', demo.garden);
game.state.add('desert', demo.desert);
game.state.add('ruins', demo.ruins);
game.state.add('gameover', demo.gameover);

game.state.start('load');

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
//    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Bungee', 'Roboto']
    }

};


//MATERIALS / HP / ITEM COLLECTION
//
//
function collectHP (player, HPDrop) {
    
    if (playerHP < 45) {
        
        noteText = game.add.text(HPDrop.x, HPDrop.y , '+HP', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
        
        HPDrop.kill();
        playerHP += 5;
        HPFrame -= 5;
        health_bar.frame = HPFrame;
        //HPText.text = 'Health: ' + playerHP;
    } else if ((playerHP > 45) && (playerHP < 50)) {
        
        noteText = game.add.text(HPDrop.x, HPDrop.y , '+HP', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
        
        HPDrop.kill();
        playerHP = 50;
        HPFrame = 0;
        health_bar.frame = HPFrame;
        //HPText.text = 'Health: ' + playerHP;
    }
    
    note_timer.add(1000, killnote);
    note_timer.start();
}


function collectAmmo (player, ammo) {

    // Removes the ammo from the screen
    
    if(knifeOut){
        ammo1 += 10;
        noteText = game.add.text(ammo.x, ammo.y, 'Knives +10', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
        
    }
        
    if(wep2Out){
        ammo2 += 10;
        noteText = game.add.text(ammo.x, ammo.y, 'Ammo +10', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
    }   
    
    if(wep3Out){
        ammo3 += 5;
        noteText = game.add.text(ammo.x, ammo.y, 'Grenades +5', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
    }
    
    if(wep4Out){
        ammo4 += 5;
        noteText = game.add.text(ammo.x, ammo.y, 'Mines +5', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
    }
    
    if(wep5Out){
        ammo5 += 15;
        noteText = game.add.text(ammo.x, ammo.y, 'Fuel +5', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
    }
    note_timer.add(1000, killnote);
    note_timer.start();
    ammo.kill();


}
function collectSpeed (player, powerUp) {
    if (playerSpeed <= 4) {
        // Removes the pu from the screen
        
        noteText = game.add.text(powerUp.x, powerUp.y , 'Speed Boost', {font: '17px', fill: '#000'});
        noteText.font = 'Bungee';
        noteText.alpha = 1;
        noteText.anchor.setTo(0.5,0.5);
        note_timer.add(1000, killnote);
        note_timer.start();
        
        speed.play();
        powerUp.kill();
        playerSpeed += 3;
        speed_timer.add(15000, backToNormal);
        speed_timer.start();
    }

}

function backToNormal () {
    playerSpeed -= 3;
}

function killnote(){
    game.add.tween(noteText).to( { alpha: 0 }, 1000, "Linear", true);
    noteText.kill();
}




//COLLISION HANDLERS
//
//
function collisionHandler (bullet, carrot) {

    //  When a bullet hits an carrot we kill them both
    bullet.kill();
    carrot.kill();
    enemiesKilled += 1;
    particleBurst(carrot.x,carrot.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function explosionCollisionHandler (explosion, carrot) {
    
    //  When a bullet hits an carrot we kill them both
    carrot.kill();
    enemiesKilled += 1;
    particleBurst(carrot.x,carrot.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function ARcollisionHandler (carrotAmmo, carrot) {

    //  When a bullet hits a carrot we kill them both
    carrotAmmo.kill();
    carrot.kill();
    enemiesKilled += 1;
    particleBurst(carrot.x,carrot.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function GcollisionHandler (grenade, carrot) {

    //  When a bullet hits an carrot we kill them both
    grenade.kill();
    carrot.kill();
    enemiesKilled += 1;
    particleBurst(carrot.x,carrot.y);
    explode(carrot.x,carrot.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function FcollisionHandler (flame, carrot) {

    //  When a bullet hits an carrot we kill them both
    flame.kill();
    carrot.kill();
    enemiesKilled += 1;
    igniteSound.play()
    //particleBurst(carrot.x,carrot.y);
    enflame(carrot.x,carrot.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}


function BLcollisionHandler (bullet) {
 
     //  When a bullet hits a wall we kill bullet
     bullet.kill();
 }

function particleBurst(x, y) {

     //  Position the emitter where the mouse/touch event was
     emitter.x = x;
     emitter.y = y;

     //  The first parameter sets the effect to "explode" which means all particles are emitted at once
     //  The second gives each particle a 2000ms lifespan
     //  The third is ignored when using burst/explode mode
     //  The final parameter (10) is how many particles will be emitted in this single burst
     emitter.start(true, 500, null, 5);
     var randSound = Math.random(0,3);
     
     if(randSound = 1){
         smash.play()
     }
     if(randSound = 2){
         whack.play()
     }
     if(randSound = 3){
         splat.play()
     }
     

 }

function explode (x, y) {
    
    var explosion = explosions.getFirstDead();
        
    explosion.x = x
    explosion.y = y
    
    explosion.animations.add('explode', [0,1,2,3,4,5,6,7,8,9], 0, true);
    explosion.animations.play('explode');
    explosion_sound.play()
    explosion.animations.getAnimation('explode').delay = 120;
    explosion.reset(explosion.x, explosion.y);
    explosion.play()
    //controls how long the explosion exists
    explosion.lifespan = 2000;
    
}

function enflame (x, y) {
    
    var fire = flames.getFirstDead();
        
    fire.x = x
    fire.y = y
    
    fire.animations.add('enflamed', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 0, true);
    fire.animations.play('enflamed');
    //explosion_sound.play()
    fire.animations.getAnimation('enflamed').delay = 165;
    
    fire.reset(fire.x, fire.y);
    fire.play()
    //controls how long the fire exists
    fire.lifespan = 4000;
    
}




//WEAPON FIRING BEHAVIOR
//
//
function throwKnife(){
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        
        var bullet = bullets.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        bullet.reset(player.x + 35, player.y + 28);
        bullet.anchor.setTo(0.5,0.5);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        game.physics.arcade.moveToPointer(bullet, 800);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true; 
        ammo1 -= 1;
        
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

function ARFire(){
    //for the AR
    if(game.time.now > Wep2nextFire && AR.countDead() > 0)
    {
        Wep2nextFire = game.time.now + Wep2fireRate;
        
        var carrotAmmo = AR.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        if(look_left){carrotAmmo.reset(player.x - 10, player.y + 28);}
        else{carrotAmmo.reset(player.x + 50, player.y + 28);}
        
        carrotAmmo.anchor.setTo(0.5,0.5);
        carrotAmmo.rotation = game.physics.arcade.angleToPointer(carrotAmmo);
        game.physics.arcade.moveToPointer(carrotAmmo, 1500);
        carrotAmmo.lifespan = 300;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        ammo2 -= 1;
        
        if (look_left){
                ar_sound.play()
                }
        else {
                ar_sound.play()
             }
    }
}

function throwGrenade(){
    
    if(game.time.now > nextFire && grenades.countDead() > 0)
    {
        nextFire = game.time.now + GfireRate;
        
        var grenade = grenades.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        grenade.reset(player.x + 35, player.y + 30);
        grenade.anchor.setTo(0.5,0.5);
        game.physics.arcade.moveToPointer(grenade, 350);

        ammo3 -= 1;
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

function throwMine(){
    
    if(game.time.now > nextFire && grenades.countDead() > 0)
    {
        nextFire = game.time.now + GfireRate;
        
        var mine = mines.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        mine.reset(player.x + 35, player.y + 30);
        mine.anchor.setTo(0.5,0.5);
        game.physics.arcade.moveToPointer(mine, 0);

        ammo4 -= 1;
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

function FTFire(){
    
    if(game.time.now > nextFire && flamefuel.countDead() > 0)
    {
        nextFire = game.time.now + FfireRate;
        
        var flame = flamefuel.getFirstDead();
        flame.reset();
        //initial firing position. Right now it is centered on player.
        if(look_left){flame.reset(player.x - 10, player.y + 28);}
        else{flame.reset(player.x + 50, player.y + 28);}
        
        flame.anchor.setTo(0.5,0.5);
        flame.lifespan = 500;
        flame.rotation = game.physics.arcade.angleToPointer(flame);
        game.add.tween(flame.scale).to( { x: 2, y: 2 }, 1000, Phaser.Easing.Linear.None, false);
        game.physics.arcade.moveToPointer(flame, 200);

        ammo5 -= 1;
        FTsound.play()
    }
}
//ENEMY BEHAVIOR
//
//
function move (carrot) {
    //carrots = carrots
    if (carrot.body.velocity == 0) {
           carrot.animations.play ("bRight");
    }
    
   if (game.physics.arcade.distanceBetween(carrot, player) <= attackDistance) {
       game.physics.arcade.moveToObject(carrot,player,200);
       
       
       // moving left
       if (carrot.body.velocity.x < 0) {
           carrot.animations.play("bLeft");
           
       // moving right   
       } else if (carrot.body.velocity.x > 0) {
           carrot.animations.play("bRight");
           
       }
    }
}

function b_move (broccoli) {
    if (broccoli.body.velocity == 0) {
           broccoli.animations.play ("broRight");
    }
    
   if (game.physics.arcade.distanceBetween(broccoli, player) <= attackDistance) {
       game.physics.arcade.moveToObject(broccoli,player,100);
       
       
       // moving left
       if (broccoli.body.velocity.x < 0) {
           broccoli.animations.play("broLeft");
           
       // moving right   
       } else if (broccoli.body.velocity.x > 0) {
           broccoli.animations.play("broRight");
           
       }
    }
}

function o_move (onion) {
    if (onion.body.velocity == 0) {
           onion.animations.play ("ORight");
    }
    
   if (game.physics.arcade.distanceBetween(onion, player) <= attackDistance) {
       game.physics.arcade.moveToObject(onion,player,200);
       
       
       // moving left
       if (onion.body.velocity.x < 0) {
           onion.animations.play("OLeft");
           
       // moving right   
       } else if (onion.body.velocity.x > 0) {
           onion.animations.play("ORight");
           
       }
    }
}

// player loses health when hit by enemy
function loseHealth (player, carrots) {
    playerHP -= .25;
    grunt.play()
    if (playerHP % 1 == 0){
        HPFrame += 1;
        health_bar.frame = HPFrame;
    }
    //HPText.text = 'Health: ' + playerHP;
    
}

function roundOver(){
    //when round over, reset enemies killed and spawned
    //timer only works to show ROUND COMPLETE, doesn't stop spawning
    startSpawn = false;
    enemiesKilled = 0;
    enemiesSpawned = 0;
    round_over_timer.add(3000, resetwave);
    round_over_timer.start();
    health = 50;
    roundText.text = "ROUND COMPLETE";
    //3s break
    
}
function resetwave(){
    // increase in number of enemies spawned
    enemiesLeft = (10*dif) + (round*15);
    startSpawn = true;
    
    //update round text
    roundText.text = "ROUND: " + round;
}
function enemyCoordinates(){
    enemyX = game.world.randomX;
    enemyY = game.world.randomY;
    while (enemyX <= (player.x + 300) && enemyX >= (player.x - 300)
    && (enemyY <= (player.y + 200) && enemyY >= (player.y - 200))){
        enemyX = game.world.randomX;
        enemyY = game.world.randomY;
    }
    enemyX1 = enemyX
    enemyY1 = enemyY
}
function spawnEnemy() {
    // commented out old spawn
    // Keeps count of spawned enemies, spawns one by one
    // Spawns until the round limit is reached (enemiesLeft)
    // 2/5 carrots, 2/5 broccoli, 1/5 onions random
    enemiesLeft = 15 + (10*dif) + (round*20) ;
    enemyType = Math.random();
    enemyCoordinates();
    if (startSpawn && enemiesSpawned+1 <= enemiesLeft ){ 
    if (enemyType < .4)
                {
                    var carrot = carrots.create(enemyX1, enemyY1, 'carrot');
                    //carrot animations
                    carrot.animations.add('bRight',[5,6,7], 16, true);
                    carrot.animations.add('bLeft',[8,9,10], 16, true);
                    carrot.animations.add('meleeRight', [0,1,2], true);
                    carrot.animations.add('meleeLeft', [13,14,15], true);

                    carrot.body.setSize(30, 50, 10, 0);
                    carrot.animations.play("bRight");
                    enemiesSpawned+= 1;
                }

     else if (enemyType >= .4 && enemyType < .8)
            {
                var broccoli = broccolis.create(enemyX1, enemyY1, 'broccoli');
//                var broccoli = broccolis.create(game.world.randomX, game.world.randomY, 'broccoli');
                //broccoli animations
                broccoli.animations.add('broRight', [4,5,6,7], 0, true);
                broccoli.animations.add('broLeft', [0,1,2,3], 0, true);


                broccoli.animations.play("broRight");
                enemiesSpawned+= 1;
            }

     else
            {
                var onion = onions.create(enemyX1, enemyY1, 'onion');
//                var onions = onions.create(game.world.randomX, game.world.randomY, 'onions');
                //onions animations
                onion.animations.add('ORight', [0,1,2,3,4,5], 0, true);
                onion.animations.add('OLeft', [8,9,10,11,12,13], 0, true);

                onion.animations.play("ORight");
                enemiesSpawned+= 1;
            }



        spawning = false;
    }
}
    /*
    for (var i = 0; i < Math.random(0,100); i++)
            {
                var carrot = carrots.create(game.world.randomX, game.world.randomY, 'carrot');
                //carrot animations
                carrot.animations.add('bRight',[5,6,7], 16, true);
                carrot.animations.add('bLeft',[8,9,10], 16, true);
                carrot.animations.add('meleeRight', [0,1,2], true);
                carrot.animations.add('meleeLeft', [13,14,15], true);
                
                carrot.body.setSize(30, 50, 10, 0);
                carrot.animations.play("bRight");
            }
    
    for (var i = 0; i < Math.random(0,100); i++)
            {
                var broccoli = broccolis.create(game.world.randomX, game.world.randomY, 'broccoli');
//                var broccoli = broccolis.create(game.world.randomX, game.world.randomY, 'broccoli');
                //broccoli animations
                broccoli.animations.add('broRight', [4,5,6,7], 0, true);
                broccoli.animations.add('broLeft', [0,1,2,3], 0, true);
                
                
                broccoli.animations.play("broRight");
            }
    
     for (var i = 0; i < Math.random(0,50); i++)
            {
                var onion = onions.create(game.world.randomX, game.world.randomY, 'onion');
//                var onions = onions.create(game.world.randomX, game.world.randomY, 'onions');
                //onions animations
                onion.animations.add('ORight', [0,1,2,3,4,5], 0, true);
                onion.animations.add('OLeft', [8,9,10,11,12,13], 0, true);
                
                onion.animations.play("ORight");
            }
    
    
    
    spawning = false;
}
    */

//GAMEOVER / MISC.
//
//
function meleeLeft(){
    player.animations.play('meleeLeft');
    meleeSound.play()
}

function meleeRight(){
    player.animations.play('meleeRight')
    meleeSound.play()
}

function resetGame() {
    carrots.setAll('body.velocity.x',0);
    carrots.setAll('body.velocity.y',0);
    broccolis.setAll('body.velocity.x',0);
    broccolis.setAll('body.velocity.y',0);
    onions.setAll('body.velocity.x',0);
    onions.setAll('body.velocity.y',0);
    
    player_x = player.x;
    player_y = player.y;
    
    var ammo1 = 25;
    var ammo2 = 100;
    var ammo3 = 10;
    var ammo4 = 5;
    var ammo5 = 10;
    
    dead_player.x = player_x;
    dead_player.y = player_y;
    
    player.kill();
    
    dead_player.alpha = 1;
    
    if (look_left) {
        notDead = false;
        dead_player.animations.play('dead_left');
        
    } else {
        notDead = false;
        dead_player.animations.play ('dead_right');
    }
    
    
//    FinalScoreText.text = "Final Score: " + score;
//    game.add.tween(GameOverText).to( { alpha: 1 }, 1000, "Linear", true);
//    
//    game.add.tween(FinalScoreText).to( { alpha: 1 }, 1000, "Linear", true);
        
    game.time.events.add(Phaser.Timer.SECOND * 3, GameOver, this);
    
//    gameover_timer.add(10000, game.state.start('gameover'));
//    gameover_timer.start();
    //game.state.start('gameover');
    
}

function GameOver () {
    game.state.start('gameover');
}

function Player(){
    
        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.ARCADE;

        //animations  
        //player animations
        player.animations.add('right', [0,1,2,3,4,5,6], 13, true);
        player.animations.add('left', [7,8,9,10,11,12,13], 13, true);
    
        player.animations.add('AR_right', [24,25,26,27,28,29,30], 13, true);
        player.animations.add('AR_left', [31,32,33,34,35,36,37], 13, true);
    
        player.animations.add('FT_right', [38,39,40,41,42,43,44], 13, true);
        player.animations.add('FT_left', [45,46,47,48,49,50,51], 13, true);
    

        player.frame = 0;
        player.animations.add('meleeRight', [14,15,16], 0, false);
        player.animations.add('meleeLeft', [17,18,19], 0, false);
    
        //physics
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0;
        player.body.gravity.y = 0;
        player.body.setSize(26, 62, 12, 0);
        player.body.collideWorldBounds = true;
    
    
}

function Dead_Player() {
    
    dead_player.enableBody = true;
    dead_player.physicsBodyType = Phaser.Physics.ARCADE;

    dead_player.animations.add('dead_right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 13);

    dead_player.animations.add('dead_left', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 13);
    
    game.physics.arcade.enable(dead_player);
    dead_player.body.bounce.y = 0;
    dead_player.body.gravity.y = 0;
    dead_player.body.setSize(26, 62, 12, 0);
    dead_player.body.collideWorldBounds = true;
    
}

function playerHUD(){
    
    //HPText = game.add.text(16, 16, 'Health: ' + playerHP, {font: '15px', fill: '#000'});
    roundText = game.add.text(16, 16, 'ROUND: '+ round, {font: '15px', fill: '#000'}); 
    
    roundText.font = 'Bungee';
    
    enemiesText = game.add.text(16, 16, 'Enemies Left: '+ (enemiesLeft - 15 - enemiesKilled), {font: '15px', fill: '#000'});
    
    enemiesText.font = 'Bungee';
   
    scoreText = game.add.text(16, 16, 'SCORE: ' + score, {font: '30px', fill: '#000'});    
    
    scoreText.font = 'Bungee';
   
    ammoText = game.add.text(16, 16, 'Ammo: ' + '∞', {fontSize: '25px', fill: '#000'});
    
    ammoText.font = 'Bungee';
    
    GameOverText = game.add.text(16, 16, 'GAME OVER',{fontSize: '50px', fill: '#000'});
    GameOverText.alpha = 0;
    
    FinalScoreText = game.add.text(16, 16, 'FINAL SCORE: ' + score, {fontSize: '50px', fill: '#000'});
    FinalScoreText.alpha = 0;
    
    // tutorial text
    WASDText =  game.add.text(16, 16, 'Use WASD keys to MOVE', {fontSize: '15px', fontWeight: 'bold', fill: '#FFA316'});
    WASDText.font = 'Bungee';
    WASDText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    WASDText.alpha = 1;

    MouseText =  game.add.text(16, 16, 'Use MOUSE to SHOOT', {fontSize: '15px', fontWeight: 'bold', fill: '#FFA316'});
    MouseText.font = 'Bungee';
    MouseText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    MouseText.alpha = 1;


    AmmoText = game.add.text(16, 16, 'Keep Track of Ammo', {fontSize: '15px', fontWeight: 'bold', fill: '#FFA316'});
    AmmoText.font = 'Bungee';
    AmmoText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    AmmoText.alpha = 1;


    WeaponText = game.add.text(16, 16, 'Toggle Through Weapons with Q & E', {fontSize: '15px', fontWeight: 'bold', fill: '#FFA316'});
    WeaponText.font = 'Bungee';
    WeaponText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    WeaponText.alpha = 1;
    
    

    //difficultyText = game.add.text(16, 16, 'difficulty: ' + difficulty, {fontSize: '15px', fill: '#000'});  

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
    //mine
    m_ui = game.add.sprite(0,10, 'mine_ui');
    m_ui.animations.add('us', [0], 0, true);
    m_ui.animations.add('s', [1], 1, true);
    m_ui.animations.add('na', [2], 2, true);
    m_ui.animations.add('nas', [3], 3, true);
    m_ui.animations.add('l', [4], 4, true);
    //flamethrower
    f_ui = game.add.sprite(0,10, 'flamethrower_ui');
    f_ui.animations.add('us', [0], 0, true);
    f_ui.animations.add('s', [1], 1, true);
    f_ui.animations.add('na', [2], 2, true);
    f_ui.animations.add('nas', [3], 3, true);
    f_ui.animations.add('l', [4], 4, true);

}
function playerHUDUpdate(){
    // text is locked in upper left corner
    //HPText.fixedToCamera = true;
    //HPText.cameraOffset.setTo(135, 15);

    health_bar.fixedToCamera = true;
    health_bar.cameraOffset.setTo(15,15);
    
    scoreText.anchor.setTo(0.5, 0.5);
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(300,20);
    
    enemiesText.fixedToCamera = true;
    enemiesText.cameraOffset.setTo(430,20);
    
    enemiesText.text = 'Enemies Left: '+ (enemiesLeft - 15 - enemiesKilled);
//    enemiesText.text = 'Enemies Left: '+ (enemiesSpawned);
    
    roundText.anchor.setTo(0.5, 0.5);
    roundText.fixedToCamera = true;
    roundText.cameraOffset.setTo(300,45);

    ammoText.fixedToCamera = true;
    ammoText.cameraOffset.setTo(400, 355);

    //weaponsText.fixedToCamera = true;
    //weaponsText.cameraOffset.setTo(10, 325);
    
    GameOverText.fixedToCamera = true;
    GameOverText.cameraOffset.setTo(130, 160);
    
    FinalScoreText.fixedToCamera = true;
    FinalScoreText.cameraOffset.setTo(130, 200);

    k_ui.fixedToCamera = true;
    k_ui.cameraOffset.setTo(5, 350);

    ar_ui.fixedToCamera = true;
    ar_ui.cameraOffset.setTo(50, 350);

    g_ui.fixedToCamera = true;
    g_ui.cameraOffset.setTo(95, 350);

    m_ui.fixedToCamera = true;
    m_ui.cameraOffset.setTo(140, 350);

    f_ui.fixedToCamera = true;
    f_ui.cameraOffset.setTo(185, 350);
    
    tutorial_timer.add(5000, TutorialFade);
    tutorial_timer.start();
    
}

function TutorialFade() {
    game.add.tween(WASDText).to( { alpha: 0 }, 300, "Linear", true);
    game.add.tween(MouseText).to( { alpha: 0 }, 300, "Linear", true);
    game.add.tween(AmmoText).to( { alpha: 0 }, 300, "Linear", true);
    game.add.tween(WeaponText).to( { alpha: 0 }, 300, "Linear", true);
}

function PlayerControls() {

    if (w.isDown || a.isDown || s.isDown || d.isDown)
    {

        if (d.isDown){
            player.body.x += playerSpeed;
            if(wep2Out){
                player.animations.play('AR_right');
            }
            if(wep5Out){
                player.animations.play('FT_right');
            }
            if(knifeOut || wep3Out || wep4Out){
            player.animations.play('right');
            }
            look_left = false;
        }

        if (a.isDown){
            player.body.x -= playerSpeed;
            if(wep2Out){
                player.animations.play('AR_left');
            }
            if(wep5Out){
                player.animations.play('FT_left');
            }
            if(knifeOut || wep3Out || wep4Out){
            player.animations.play('left');
            }
            look_left = true;
        }

        if (s.isDown){
            player.body.y += playerSpeed;
            if(wep2Out){
                if(look_left){player.animations.play('AR_left');}
                else{player.animations.play('AR_right');}
            }
            if(wep5Out){
                if(look_left){player.animations.play('FT_left');}
                else{player.animations.play('FT_right');}
            }
            if(knifeOut || wep3Out || wep4Out){
                if(look_left){player.animations.play('left');}
                else{player.animations.play('right');}
            }
        }

        if (w.isDown){
            player.body.y -= playerSpeed;
            if(wep2Out){
                if(look_left){player.animations.play('AR_left');}
                else{player.animations.play('AR_right');}
            }
            if(wep5Out){
                if(look_left){player.animations.play('FT_left');}
                else{player.animations.play('FT_right');}
            }
            if(knifeOut || wep3Out || wep4Out){
                if(look_left){player.animations.play('left');}
                else{player.animations.play('right');}
            }
        }
    }
    else {
        player.animations.stop(null, true)
        //uncommenting these below lines will cause the enemies to stop with the player
        //for debugging purposes
//            carrots.setAll('body.velocity.x',0);
//            carrots.setAll('body.velocity.y',0);
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

    
    if (weaponToggleB.isDown) {
        if(game.time.now > togg){
            togg= game.time.now + 125; 
            if (knifeOut && score >= 25) {
                knifeOut = false;
                wep2Out = true;

            } else if (wep2Out && score >= 50) {
                wep2Out = false;
                wep3Out = true;

            } else if (wep3Out && score >= 250) {
                wep3Out = false;
                wep4Out = true;

            } else if (wep4Out && score >= 1000) {
                wep4Out = false;
                wep5Out = true;

            } else if (wep5Out) {
                wep5Out = false;
                knifeOut = true;
            }
        }
    }
    if (weaponToggle.isDown) {
        if(game.time.now > togg){
            togg= game.time.now + 125;
            if (knifeOut && score >= 1000) {
                knifeOut = false;
                wep5Out = true;

            } else if (wep2Out) {
                wep2Out = false;
                knifeOut = true;

            } else if (wep3Out && score >= 25) {
                wep3Out = false;
                wep2Out = true;

            } else if (wep4Out && score >= 50) {
                wep4Out = false;
                wep3Out = true;

            } else if (wep5Out && score >= 250) {
                wep5Out = false;
                wep4Out = true;
            }
        }
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
        if (ammo4 == 0){
            m_ui.animations.play('na');
        }
        else{
            m_ui.animations.play('us');
        }
        if (ammo5 == 0){
            f_ui.animations.play('na');
        }
        else{
            f_ui.animations.play('us');
        }

    }
    if(wep2Out){
        ammoText.text = 'Ammo: ' + ammo2;
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
        if (ammo4 == 0){
            m_ui.animations.play('na');
        }
        else{
            m_ui.animations.play('us');
        }
        if (ammo5 == 0){
            f_ui.animations.play('na');
        }
        else{
            f_ui.animations.play('us');
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
        if (ammo4 == 0){
            m_ui.animations.play('na');
        }
        else{
            m_ui.animations.play('us');
        }
        if (ammo5 == 0){
            f_ui.animations.play('na');
        }
        else{
            f_ui.animations.play('us');
        }
    }
    if(wep4Out){
        ammoText.text = 'Mines: ' + ammo4;
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
            g_ui.animations.play('na');
        }
        else{
            g_ui.animations.play('us');
        }
        if (ammo4 == 0){
            m_ui.animations.play('nas');
        }
        else{
            m_ui.animations.play('s');
        }
        if (ammo5 == 0){
            f_ui.animations.play('na');
        }
        else{
            f_ui.animations.play('us');
        }
    }
    
    if(wep5Out){
        ammoText.text = 'Fuel: ' + ammo5;
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
            g_ui.animations.play('na');
        }
        else{
            g_ui.animations.play('us');
        }
        if (ammo4 == 0){
            m_ui.animations.play('na');
        }
        else{
            m_ui.animations.play('us');
        }
        if (ammo5 == 0){
            f_ui.animations.play('nas');
        }
        else{
            f_ui.animations.play('s');
        }
    }
    //lock weapon UI
    if (score < 25){
        ar_ui.animations.play('l');
    }
    if (score < 50){
        g_ui.animations.play('l');
    }
    if (score < 250){
        m_ui.animations.play('l');
    }
    if (score < 1000){
        f_ui.animations.play('l');
    }
    
    
    if (game.input.activePointer.isDown)
    {   
        if(knifeOut & ammo1 > 0 & notDead){
            throwKnife();
        }

        if(wep2Out & ammo2 > 0 & notDead){
            ARFire();
            //weapon 2 function
        }

        if(wep3Out & ammo3 > 0 & notDead){
            //weapon 3 function
            throwGrenade();
        }
        if(wep4Out & ammo4 > 0 & notDead){
            //weapon 3 function
            throwMine();
        }
        if(wep5Out & ammo5 > 0 & notDead){
            //weapon 3 function
            FTFire();
        }

    }
        
}

function weaponGroups(){
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
    
    //fire
       flames = game.add.group();
       flames.enableBody = true;
       flames.physicsBodyType = Phaser.Physics.ARCADE;
       flames.createMultiple(50, 'flaming');

    //this is where we establish AR projectiles

        AR = game.add.group();
        AR.enableBody = true;
        AR.physicsBodyType = Phaser.Physics.ARCADE;
        AR.createMultiple(100, 'assault_round');
        AR.setAll('checkWorldBounds', true);
        AR.setAll('outOfBoundsKill', true);
        
    //this is where we establish grenades projectiles

        grenades = game.add.group();
        grenades.enableBody = true;
        grenades.physicsBodyType = Phaser.Physics.ARCADE;
        grenades.createMultiple(100, 'grenade');
        grenades.setAll('checkWorldBounds', true);
        grenades.setAll('outOfBoundsKill', true);
    
    //this is where we establish mines projectiles

        mines = game.add.group();
        mines.enableBody = true;
        mines.physicsBodyType = Phaser.Physics.ARCADE;
        mines.createMultiple(100, 'mine');
        mines.setAll('checkWorldBounds', true);
        mines.setAll('outOfBoundsKill', true);
    
    //this is where we establish flameThrower projectiles

        flamefuel = game.add.group();
        flamefuel.enableBody = true;
        flamefuel.physicsBodyType = Phaser.Physics.ARCADE;
        flamefuel.createMultiple(100, 'flame');
        flamefuel.setAll('checkWorldBounds', true);
        flamefuel.setAll('outOfBoundsKill', true);
}

function gameAudio(){
        meleeSound = game.add.audio('melee_sound');
        igniteSound = game.add.audio('ignite');
        FTsound = game.add.audio('flamethrower');
        ar_sound = game.add.audio('ar_sound');
        explosion_sound = game.add.audio('explosion');
        smash = game.add.audio('smash');
        grunt = game.add.audio('grunt');
        whack = game.add.audio('whack');
        splat = game.add.audio('splat');
        speed = game.add.audio('speed_up');
}
