enchant();

window.onload = function() {
    
    game = new Game(320, 320);
    game.preload('chara0.png'); // png を読み込む
    game.rootScene.backgroundColor = 'yellow';

    game.onload = function() {        
        boy1 = new Taro();
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
    },
    
    onenterframe: function(){
        if(game.frame % 15 == 0){
            /* インスタンスを今後明示的に区別する必要が無ければ
            以下のように省略して書くことが可能 */
            new Jiro();                
        }
    }
});

Jiro = enchant.Class.create(Taro, {
    initialize: function(){
        Taro.call(this);
        this.x = 90;
        this.y = -50;
        this.frame = 3;
    },
    
    ontouchstart: function(){
        this.frame = 4;
    },
    
    onenterframe: function(){
        this.y +=2;
        if(this.y>320){
            game.rootScene.removeChild(this);    
        }
    }
});
