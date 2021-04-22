enchant();

window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.png', 'icon0.png');
    
    game.onload = function() {
        /* スペースキーをaボタンに設定 */
        game.keybind(' '.charCodeAt(0), 'a');
        chara = new Kuma();
    }
    
    game.rootScene.ontouchmove = function(evt) {
        chara.x = evt.localX;
    }
    
    game.rootScene.onenterframe = function() {
        if (game.frame % 30 == 0) {
            new Enemy();
        }
        if (game.input.right) {
            chara.x+=5;
        }
        if (game.input.left) {
            chara.x-=5;
        }
        if (game.input.a) {
            /* 爆弾を放出 */
            chara.tama();
        }
        /* 条件演算子．tamavalが0以上ならば，tamavalデクリメント．それ以外は0 */
        chara.tamaval = chara.tamaval >= 0 ? --chara.tamaval : 0;
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
        /* tamavalが0以下ならば放出可能 */
        if(this.tamaval <= 0){
            var tama = new Tama();
            tama.x = this.x + 24;
            tama.y = this.y;
            this.frame = 2;
            this.tamaval += 30;
        }
    },
});

Tama = enchant.Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets['icon0.png'];
        this.frame = 24;
        game.rootScene.addChild(this);
    },
    
    /* 爆弾はフレーム切り替えごとに上に進む */
    onenterframe: function() {
        this.y -= 2;
    }
});

Enemy = enchant.Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 32, 32);
        this.x = Math.floor(Math.random() * (320 - 64));
        this.y = -50;
        this.image = game.assets['chara1.png'];
        this.frame = 5; 
        game.rootScene.addChild(this);
    },
    
    onenterframe: function() {
        this.y += 5;
        if(this.y>320){
             game.rootScene.removeChild(this);
        }
    }
});