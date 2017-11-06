var scoreText;
var score = 0;
var player;
var dead_player;
var bullets;

var ammos;
var emitter;

//crafting materials
var carrot_mats = 0;
var broccoli_mats = 0;
var onion_mats = 0;

var difficulty = 4000

//for the knife
var fireRate = 1000;
var nextFire = 0;

//for the AR
var Wep2nextFire = 0;
var Wep2fireRate = 100;

//for the wep3
var Wep3nextFire = 0;
var GfireRate = 1000;

//wep4 aka the mine uses wep3

//wep5
var Wep5nextFire = 0;
var FfireRate = 60;

var meleeSound;
var gameOverText;
var HPText
var playerHP = 50;

//tutorial text
var WASDText;
var MouseText;
var AmmoText;
var WeaponText;

//ammo
var ammo1 = 25;
var ammo2 = 0;
var ammo3 = 10;
var ammo4 = 5;
var ammo5 = 200000000;

//weapon states
//true determines whether the weapon is currently out
//therefore, the player starts with the knife out
knifeOut = true;
wep2Out = false;
wep3Out = false;
wep4Out = false;
wep5Out = false;

var trees;
var tree;
var look_left = false;
var carrots;
var enemyspeed = .9;
var carrotsHP = 25;
var HPFrame = 0;
var attackDistance = 250;
var attackTimer = 0;
var attackButton;
var timer;
var gameover_timer;
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
        game.load.image('checkered_tile', 'assets/checkered_tile.jpg');
        
        game.load.spritesheet('player', 'assets/Chef.png', 50, 62);
        game.load.spritesheet('carrot', 'assets/Carrot.png', 50, 50);
        game.load.spritesheet('broccoli', 'assets/broccoli.png', 50, 50); game.load.spritesheet('onion', 'assets/onion.png', 30, 45);
        game.load.spritesheet('health_bar', 'assets/health_bar.png', 124, 20);
        game.load.spritesheet('explosion', 'assets/blender-grenade/explosion.png', 100, 102);
        game.load.spritesheet('flaming', 'assets/fire.png', 50, 50);
        game.load.spritesheet('dead_player', 'assets/Chef_dead.png', 62, 62);
        
        game.load.image('bullet', 'assets/knife.png', 25, 25);
        game.load.image('assault_round', 'assets/assault.png', 10, 10);
        game.load.image('grenade', 'assets/blender-grenade/blender_grenade.png', 30, 30);
        game.load.image('mine', 'assets/Mine.png', 25, 25)
        game.load.image('flame', 'assets/flame.png', 50, 51)
        game.load.image('grocery_bag', 'assets/grocery_bag.png');
        game.load.image('extra_life', 'assets/extra_life.png');
        game.load.image('tree', 'assets/tree.png', 50, 100);
        game.load.image('crosshair', 'assets/crosshair.png', 1, 1);
        game.load.image('startscreen','assets/game_start_screen.jpg');
        game.load.image('chunk', 'assets/carrot_chunk.png');
        //placeholder for grocery store
        game.load.image('grocery_store', 'assets/GroceryStore.png');
        game.load.image('succulent', 'assets/succulent.png',15,15);
        game.load.audio('music','assets/audio/go_to_picnic.mp3');
        game.load.audio('explosion','assets/audio/explosion.mp3');
        game.load.audio('ignite','assets/audio/ignite.mp3');
        game.load.audio('flamethrower','assets/audio/flamethrower.mp3');
        game.load.audio('melee_sound', 'assets/audio/melee_sound.mp3');
        game.load.audio('ar_sound', 'assets/audio/ar_sound.mp3');
        game.load.audio('smash', 'assets/audio/smash.mp3');
        game.load.audio('splat', 'assets/audio/splat.mp3');
        game.load.audio('whack', 'assets/audio/whack.mp3');
        game.load.audio('grunt', 'assets/audio/grunt.mp3');
        // unselected, selected, out of ammo, out of ammo and selected, locked
        game.load.spritesheet('knife_ui', 'assets/Knife_UI.png', 40, 40);
        game.load.spritesheet('ar_ui', 'assets/AR_UI.png', 40, 40);
        game.load.spritesheet('grenade_ui', 'assets/Grenade_UI.png', 40, 40);
        game.load.spritesheet('grenade_ui', 'assets/Grenade_UI.png', 40, 40);
        game.load.spritesheet('mine_ui', 'assets/Mine_UI.png', 40, 40);
        game.load.spritesheet('flamethrower_ui', 'assets/Flamethrower_UI.png', 40, 40);
        
    },
    
    create: function(){
        //calling the new state
        game.state.start('menu');
    }
};
