demo.gameover = function(){};
demo.gameover.prototype = {
    create: function () {

        var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#FFF'});
        game.stage.backgroundColor = '#0E9200';
        
        /*var bar = game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 600, 100);*/

        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "GAME OVER", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        FinalScoreText = game.add.text(0, 40, 'FINAL SCORE: ' + score, style);
        FinalScoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        restartText = game.add.text(0, 80, "Press SPACE to Restart", style);
        restartText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 600px wide by 100px high
        //text.setTextBounds(0, 100, 600, 100);
        
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeState, null, null, 2);
        
        music.mute = true;

    },

    update: function () {
    }
};

function changeState(i, stateNum){
    game.state.start('menu',false,true);
}