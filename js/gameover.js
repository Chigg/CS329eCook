demo.gameover = function(){};
demo.gameover.prototype = {
    create: function () {

        var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#FFF'});
        game.stage.backgroundColor = '#FFF';
        
        var bar = game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 600, 100);

        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "Game Over; Press Space to Replay", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(0, 100, 600, 100);
        
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeState, null, null, 2);
        
        music.mute = true;

    },

    update: function () {
    }
};

function changeState(i, stateNum){
    game.state.start('menu',false,true);
}