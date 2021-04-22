enchant();

window.onload = function() {
    
    game = new Game(320, 320);
    game.preload('chara1.png', 'icon0.png');

    game.onload = function() {
        game.keybind(' '.charCodeAt(0), 'a');
        kuma = new Kuma();
    }
    
    game.rootScene.ontouchmove = function(evt) {
        kuma.x = evt.localX;
    }
    
    game.rootScene.onenterframe = function() {
        if (game.frame % 30 == 0) {
            new Enemy();
        }
        if (game.input.right) {
            kuma.x+=5;
        }
        if (game.input.left) {
            kuma.x-=5;
        }
        if (game.input.a) {
            kuma.tama();
        }
        kuma.tamaval = kuma.tamaval >= 0 ? --kuma.tamaval : 0;        
    }

    game.start();
}

Kuma = enchant.Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 32, 32);
        this.x = 50;
        this.y = 250;
        this.tamaval = 0;
        this.image = game.assets['chara1.png'];
        game.rootScene.addChild(this);
    },
    
    tama: function() {
        if(this.tamaval <= 0){
            var tama = new Tama();
            tama.x = this.x + 24;
            tama.y = this.y;
            this.frame = 2;
            this.tamaval += 30;
        }
    },
    
    onenterframe: function() {
        this.intersect(Enemy).forEach(function(p) {
            game.rootScene.removeChild(p[1]);
            game.rootScene.removeChild(p[0]);
            game.end();
        });
    }    
});

Tama = enchant.Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets['icon0.png'];
        this.frame = 24;
        game.rootScene.addChild(this);

        /* 横方向の動きを入れるにずらす 
        この記述は，Timelineを使う必要は無く，onenterframe内で
        少しずつ移動するようにしても良い */
        this.tl.moveBy(Math.floor(Math.random() * 320)-160, 0, 60);
    },
    
    onenterframe: function() {
        this.y -= 2;

        Tama.intersect(Enemy).forEach(function(p) {
            game.rootScene.removeChild(p[1]);
            game.rootScene.removeChild(p[0]);
        });

        /* withinのやり方は以下のとおり */
        /*
        for ( var i = 0; i < game.rootScene.childNodes.length; i++ ) {
            if(this.within(game.rootScene.childNodes[i],20) 
               && game.rootScene.childNodes[i] != this 
               && game.rootScene.childNodes[i] != kuma){
                game.rootScene.removeChild(game.rootScene.childNodes[i]);
                game.rootScene.removeChild(this);
            }
        }
        */
        
        if(this.y<0){
            game.rootScene.removeChild(this);
        }
    }
});

Enemy = enchant.Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 32, 32);
        this.x = Math.floor(Math.random() * (320 - 64));
        this.y = 0;
        this.image = game.assets['chara1.png'];
        this.frame = 5; 
        game.rootScene.addChild(this);
        this.tl.moveBy(Math.floor(Math.random() * 320)-160, 0, 60);
    },

    onenterframe: function() {
        this.y += 5;
        if(this.y>320){
            game.rootScene.removeChild(this);
        }
    }
});
