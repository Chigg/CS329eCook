
demo.mapmenu = function(){};
demo.mapmenu.prototype = {
    preload: function(){
        
    },
    create: function(){
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        ruins = game.add.button(game.world.centerX - 295, 300, 'ruins', ruinsClick, this, 2, 1, 0);
        
        garden = game.add.button(game.world.centerX - 95, 300, 'garden', gardenClick, this, 2, 1, 0);
        
        desert = game.add.button(game.world.centerX + 105, 300, 'desert', desertClick, this, 2, 1, 0);
            },
    update: function(){
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

