var game = new Phaser.Game(600, 400, Phaser.CANVAS);

game.state.add('load', demo.load);
game.state.add('menu', demo.menu);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('gameover', demo.gameover);

game.state.start('load');


function stageCreate () {
    
    
}



function collectHP (player, HPDrop) {
    
    if (playerHP < 50) {
        
        HPDrop.kill();
        playerHP += 5;
        HPFrame -= 5;
        health_bar.frame = HPFrame;
        HPText.text = 'Health: ' + playerHP;
        
    }
}

function goToMedCenter () {
    game.state.start ('state3');
}

function goToGarden () {
    game.state.start ('state2');
}