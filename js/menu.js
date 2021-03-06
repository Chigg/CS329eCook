demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        
        
    },
    create: function(){
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        music = game.add.audio('music');
        music.play()
        
        background = game.add.tileSprite(0, 0, 600, 400, 'startscreen')
        
        easy = game.add.button(game.world.centerX - 295, game.world.centerY + 90, 'easy', easyClick, this, 2, 1, 0);
        
        
        medium = game.add.button(game.world.centerX - 95, game.world.centerY + 90, 'medium', mediumClick, this, 2, 1, 0);
    
        
        hard = game.add.button(game.world.centerX + 105, game.world.centerY + 90, 'hard', hardClick, this, 2, 1, 0);
    
        
        ammo1 = 25;
        ammo2 = 100;
        ammo3 = 10;
        

        playerHP = 50;
        HPFrame = 0;
        score = 0;
    },
    update: function(){
        easy.fixedToCamera = true;
        easy.cameraOffset.setTo (10, 290);
        
        medium.fixedToCamera = true;
        medium.cameraOffset.setTo (205, 290);
        
        hard.fixedToCamera = true;
        hard.cameraOffset.setTo (405, 290);
    }    
};

function easyClick() {
    difficulty = 2000;
    dif = 1;
    game.state.start('mapmenu')
    
    
}

function mediumClick() {
    difficulty = 1000;
    dif = 3;
    game.state.start('mapmenu')
    
}
function hardClick() {
    difficulty = 250;
    dif = 5
    game.state.start('mapmenu')
    
    
}

