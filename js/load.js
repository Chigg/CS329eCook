var scoreText;
var score = 0;
var player;
var bullets;

var ammos;

var difficulty = 4000

//for the knife
var fireRate = 1000;
var nextFire = 0;

//for the AR
var Wep2nextFire = 0;
var Wep2fireRate = 100;

//for the wep3
var Wep3nextFire = 0;
var Wep3fireRate = 00;


var meleeSound;
var gameOverText;
var HPText
var playerHP = 50;

//ammo
var ammo1 = 25;
var ammo2 = 0;
var ammo3 = 10;

//weapon states
//true determines whether the weapon is currently out
//therefore, the player starts with the knife out
knifeOut = true;
wep2Out = false;
wep3Out = false;

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
        
        
        // JSON TILE MAP PRELOAD
        game.load.tilemap ('garden', 'assets/garden.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('terrain', 'assets/terrain_atlas.png');
        
        //menu buttons for difficulty
        game.load.spritesheet('easy', 'assets/menu/easy_button_sprite_sheet.png',193,71);
        game.load.spritesheet('medium', 'assets/menu/medium_button_sprite_sheet.png',193,71);
        game.load.spritesheet('hard', 'assets/menu/hard_button_sprite_sheet.png',193,71);
        
        
        game.load.image('grass', 'assets/grass.png');
        game.load.spritesheet('player', 'assets/Chef.png', 50, 62);
        game.load.spritesheet('baddie', 'assets/Carrot.png', 50, 50);
        game.load.spritesheet('onion', 'assets/Onion.png', 50, 50);
        game.load.spritesheet('health_bar', 'assets/health_bar.png', 124, 20);
        game.load.image('bullet', 'assets/knife.png', 25, 25);
        game.load.image('assault_round', 'assets/assault.png', 10, 10);
        game.load.image('grocery_bag', 'assets/grocery_bag.png');
        game.load.audio('melee_sound', 'assets/audio/melee_sound.mp3');
        game.load.audio('ar_sound', 'assets/audio/ar_sound.mp3');
        game.load.audio('smash', 'assets/audio/smash.mp3');
        game.load.audio('splat', 'assets/audio/splat.mp3');
        game.load.audio('whack', 'assets/audio/whack.mp3');
        game.load.image('tree', 'assets/tree.png', 50, 100);
        game.load.image('crosshair', 'assets/crosshair.png', 1, 1);
        game.load.image('startscreen','assets/game_start_screen.jpg');
        game.load.audio('music','assets/audio/go_to_picnic.mp3');
        game.load.image('chunk', 'assets/carrot_chunk.png');
        
        
        playerHP = 50;
        HPFrame = 0;
        score = 0;
        
    },
    
    create: function(){
        //calling the new state
        game.state.start('menu');
    }
};
