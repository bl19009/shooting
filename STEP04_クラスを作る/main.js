enchant();

window.onload = function() {
    
    game = new Game(320, 320);
    game.preload('chara0.png');

    game.onload = function() {      
        boy1 = new Taro();
        boy2 = new Jiro();
    }
    game.start();
}

Taro = enchant.Class.create(Sprite, {
    initialize: function(){
        Sprite.call(this, 32, 32);
        this.x = 50;
        this.y = 50;
        this.image = game.assets['chara0.png'];
        game.rootScene.addChild(this);
    },
    
    ontouchstart: function(){
        this.frame = 2;
    }            
});

/* Taroクラスを継承したJiroクラスの作成 */
Jiro = enchant.Class.create(Taro, {
    initialize: function(){
        Taro.call(this);
        this.x = 100;
        this.y = 100;
        this.frame = 3;
    },
    
    ontouchstart: function(){
        this.frame = 4;
    }
});