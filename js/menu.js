
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){

    },
    create: function(){
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(startGame, null, null, 2);
        
        music = game.add.audio('music');
        music.play()
        
        difficulty = 4000
        
        background = game.add.tileSprite(0, 0, 600, 400, 'startscreen')
        
        easy = game.add.button(game.world.centerX - 295, 300, 'easy', easyClick, this, 2, 1, 0);
        
        medium = game.add.button(game.world.centerX - 95, 300, 'medium', mediumClick, this, 2, 1, 0);
        
        hard = game.add.button(game.world.centerX + 105, 300, 'hard', hardClick, this, 2, 1, 0);
        
        ammo1 = 25;
        ammo2 = 100;
        ammo3 = 10;
        

        playerHP = 50;
        HPFrame = 0;
        score = 0;
    },
    update: function(){}    
};

function startGame(i, stateNum){
    game.state.start('state2');
}

function easyClick() {
    difficulty = 4000;
    
}

function mediumClick() {
    difficulty = 2000;
    
}
function hardClick() {
    difficulty = 400;
    
}

