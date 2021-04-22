enchant();

window.onload = function() {
    
    game = new Game(320, 320);    
    game.preload('chara1.png');

    game.onload = function() {    
        firstman = new BaseKuma();
    }

    game.rootScene.ontouchmove = function(e){
        firstman.x = e.x;
    };

    game.rootScene.onenterframe= function(){
        if(game.frame % 15 == 0){
            new NextKuma();
        }
    };

    game.start();
}

BaseKuma = enchant.Class.create(Sprite, {
    initialize: function(){
        Sprite.call(this, 32, 32);
        this.x = 50;
        this.y = 250;
        this.image = game.assets['chara1.png'];
        game.rootScene.addChild(this);
    },

    ontouchstart: function(){
        this.frame = 2;
    }
});

NextKuma = enchant.Class.create(BaseKuma, {
    initialize: function(){
        BaseKuma.call(this);
        this.x = Math.floor(Math.random() * (320-64));
        this.y = -50;
        this.frame = 5;
    },

    onenterframe: function(){
        this.y +=2;
        if(this.y>320){
            game.rootScene.removeChild(this);            
        }
    }
});
