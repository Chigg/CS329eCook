
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){

    },
    create: function(){
        game.stage.backgroundColor = '#7bbecd';
        background = game.add.tileSprite(0, 0, 600, 400, 'startscreen')
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(startGame, null, null, 2);
        
        music = game.add.audio('music');
        music.play()

        playerHP = 50;
        HPFrame = 0;
        score = 0;
    },
    update: function(){}    
};

function startGame(i, stateNum){
    game.state.start('state2');
}
