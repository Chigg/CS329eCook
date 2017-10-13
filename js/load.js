var scoreText;
var score = 0;
var player;
var bullets;
var ammo1 = 25;
var fireRate = 1000;
var nextFire = 0;
var meleeSound;
var gameOverText;
var HPText
var playerHP = 50;

var trees;
var tree;
var look_left = false;
var baddies;
var enemyspeed = .9;
var baddiesHP = 25;
var HPFrame = 0;
var attackDistance = 250;
var attackTimer = 0;
var attackButton;
var timer;
var music;

var demo = {};
demo.load = function(){};
demo.load.prototype = {
    preload: function(){
        
        var loadingLabel = game.add.text(80, 150, 'loading...',
                                        {  font: '30px Courier', fill: '#fff'});
        game.load.image('grass', 'assets/grass.png');
        game.load.spritesheet('player', 'assets/Chef.png', 50, 62);
        game.load.spritesheet('baddie', 'assets/Carrot.png', 50, 50);
        game.load.spritesheet('health_bar', 'assets/health_bar.png', 124, 20);
        game.load.image('bullet', 'assets/knife.png', 25, 25);
        game.load.audio('melee_sound', 'assets/audio/melee_sound.mp3');
        game.load.image('tree', 'assets/tree.png', 50, 100);
        game.load.image('crosshair', 'assets/crosshair.png', 1, 1);
        game.load.image('startscreen','assets/game_start_screen.jpg');
        game.load.audio('music','assets/audio/go_to_picnic.mp3');
        
        
        playerHP = 50;
        HPFrame = 0;
        score = 0;
        
    },
    
    create: function(){
        //calling the new state
        game.state.start('menu');
    }
};
