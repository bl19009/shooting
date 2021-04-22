enchant();

window.onload = function() {
    
    game = new Game(320, 320);
    game.preload('chara0.png');

    game.onload = function() {
        white = new Chara();
        brown = new Chara();
        white.frame = 6;
        white.x = 50;
        white.x = 150;
    }
    game.start();
}

Chara = enchant.Class.create(Sprite, {
    initialize: function(){
        Sprite.call(this, 32, 32);
        this.x = 50;
        this.y = 50;
        this.image = game.assets['chara0.png'];
        game.rootScene.addChild(this);
    },
    
    ontouchstart: function(){
        game.rootScene.removeChild(this);
    }            
});
    
