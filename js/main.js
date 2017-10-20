var game = new Phaser.Game(600, 400, Phaser.CANVAS);

game.state.add('load', demo.load);
game.state.add('menu', demo.menu);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('gameover', demo.gameover);

game.state.start('load');


function stageCreate () {
    
    
}


function collisionHandler (bullet, baddie) {

    //  When a bullet hits an carrot we kill them both
    bullet.kill();
    baddie.kill();
    particleBurst(baddie.x,baddie.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}

//this should be temporary, i don't think it's best practice
function ARcollisionHandler (carrotAmmo, baddie) {

    //  When a bullet hits a carrot we kill them both
    carrotAmmo.kill();
    baddie.kill();
    particleBurst(baddie.x,baddie.y);
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function throwKnife(){
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        
        var bullet = bullets.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        bullet.reset(player.x + 35, player.y + 30);
        bullet.anchor.setTo(0.5,0.5);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        game.physics.arcade.moveToPointer(bullet, 800);
        ammo1 -= 1;
        ammoText.text = 'Knives: ' + ammo1;
        
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
        carrotAmmo.reset(player.x + 35, player.y + 30);
        carrotAmmo.anchor.setTo(0.5,0.5);
        carrotAmmo.rotation = game.physics.arcade.angleToPointer(carrotAmmo);
        game.physics.arcade.moveToPointer(carrotAmmo, 1500);
        ammo2 -= 1;
        ammoText.text = 'AR Ammo: ' + ammo2;
        
        if (look_left){
                player.animations.play('meleeLeft');
                ar_sound.play()
                }
        else {
                player.animations.play('meleeRight');
                ar_sound.play()
             }
    }
}

function throwGrenade(){
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        
        var bullet = bullets.getFirstDead();
        
        //initial firing position. Right now it is centered on player.
        bullet.reset(player.x + 35, player.y + 30);
        bullet.anchor.setTo(0.5,0.5);
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        game.physics.arcade.moveToPointer(bullet, 350);
        
        game.time.events.add(Phaser.Timer.SECOND*1, this.explode, this);
        ammo3 -= 1;
        ammoText.text = 'Grenades: ' + ammo3;
        
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

function explode () {
    //whenever 1 second is passed, this function is called
    //create an explosion at this object's location
    
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
            
    playerHP = 50;
    HPFrame = 0;
    score = 0;
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

function collectHP (player, HPDrop) {
    
    if (playerHP < 50) {
        
        HPDrop.kill();
        playerHP += 1;
        HPFrame -= 1;
        health_bar.frame = HPFrame;
        HPText.text = 'Health: ' + playerHP;
        
    }
}

function collectAmmo (player, ammo) {

    // Removes the ammo from the screen
    ammo.kill();
    
    if(knifeOut){
        ammo1 += 20;
    }
        
    if(wep2Out){
        ammo2 += 10;
    }

        
    if(wep3Out){
        ammo3 += 2;
    }


}

 function particleBurst(x, y) {

     //  Position the emitter where the mouse/touch event was
     emitter.x = x;
     emitter.y = y;

     //  The first parameter sets the effect to "explode" which means all particles are emitted at once
     //  The second gives each particle a 2000ms lifespan
     //  The third is ignored when using burst/explode mode
     //  The final parameter (10) is how many particles will be emitted in this single burst
     emitter.start(true, 1000, null, 5);
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

function goToMedCenter () {
    game.state.start ('state3');
}
