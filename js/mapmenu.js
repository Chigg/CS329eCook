
demo.mapmenu = function(){};
demo.mapmenu.prototype = {
    preload: function(){
        game.load.spritesheet('d_prev', 'assets/desert_prev.jpg', 190, 190);
        game.load.spritesheet('r_prev', 'assets/ruins_prev.jpg', 190, 190);
        game.load.spritesheet('g_prev', 'assets/garden_prev.jpg', 190, 190);
    },
    create: function(){
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        game.stage.backgroundColor = '#000000';
        
        ruins = game.add.button(game.world.centerX - 295, 300, 'ruins', ruinsClick, this, 2, 1, 0);
        r_prev = game.add.sprite(game.world.centerX - 290, 90, 'r_prev');
        
        garden = game.add.button(game.world.centerX - 95, 300, 'garden', gardenClick, this, 2, 1, 0);
        g_prev = game.add.sprite(game.world.centerX - 95, 90, 'g_prev');
        
        desert = game.add.button(game.world.centerX + 105, 300, 'desert', desertClick, this, 2, 1, 0);
        d_prev = game.add.sprite(game.world.centerX + 105, 90, 'd_prev');
            },
    update: function(){
        ruins.fixedToCamera = true;
        ruins.cameraOffset.setTo (10, 290);
        
        r_prev.fixedToCamera = true;
        r_prev.cameraOffset.setTo (10, 90);
        
        garden.fixedToCamera = true;
        garden.cameraOffset.setTo (205, 290);
        
        g_prev.fixedToCamera = true;
        g_prev.cameraOffset.setTo (205, 90);
        
        desert.fixedToCamera = true;
        desert.cameraOffset.setTo (405, 290);
        
        d_prev.fixedToCamera = true;
        d_prev.cameraOffset.setTo (405, 90);
    }    
};


function ruinsClick() {
    mapSelected = "ruins"
    game.state.start('ruins');
    
    
}

function gardenClick() {
    mapSelected = "garden"
    game.state.start('garden');
    
}
function desertClick() {
    mapSelected = "desert"
    game.state.start('desert');
    
}

