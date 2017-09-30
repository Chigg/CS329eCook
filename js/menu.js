var demo = {};
var music;
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        game.load.image('startscreen','assets/game_start_screen.jpg');
        game.load.audio('music','assets/audio/go_to_picnic.mp3');
    },
    create: function(){
        game.stage.backgroundColor = '#7bbecd';
        background = game.add.tileSprite(0, 0, 600, 400, 'startscreen')
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeState, null, null, 2);
        music = game.add.audio('music');
        music.play();
    },
    update: function(){}    
};

function changeState(i, stateNum){
    game.state.start('state2');
}
