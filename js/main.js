var game = new Phaser.Game(600, 400, Phaser.CANVAS);

game.state.add('menu', demo.menu);
game.state.add('state2', demo.state2);
game.state.add('gameover', demo.gameover);

game.state.start('menu');