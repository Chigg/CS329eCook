demo.gameover = function(){};
demo.gameover.prototype = {
    create: function () {

        var gameoverLabel = stateText = game.add.text(500, 300, ' ', {font: '50px Arial', fill: '#FFF'});
        game.stage.backgroundColor = '#0E9200';

        var style = { font: "bold 32px Bungee", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        text = game.add.text(180, 120, "GAME OVER", { font: "bold 32px Bungee", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        FinalScoreText = game.add.text(140, 160, 'FINAL SCORE: ' + score, { font: "bold 32px Bungee", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
        FinalScoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        restartText = game.add.text(80, 200, "Press SPACE to Restart", { font: "bold 32px Bungee", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" });
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