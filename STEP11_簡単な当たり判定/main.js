enchant();

window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.png');

    game.onload = function() {
        
        /* Playerクラスのクマを1匹作る */
        player = new Player(32, 32);
        /* 画面に表示する (ひとつだけでる) */
        game.rootScene.addChild(player);

        /* タッチに付いてくるようにする
        touchmove: タッチ座標が動いたときのイベント */
        game.rootScene.ontouchmove = function(evt) {
            /* タッチしている座標が動いたときにここが呼び出される
            evt.x にタッチのx座標、evt.y にタッチのy座標が入っている */
            player.x = evt.x - 16;
            player.y = evt.y - 16;
        }
        
        game.rootScene.onenterframe = function () {
            if(game.frame%30==0){
                game.rootScene.addChild(new Enemy(32, 32));
            }
		};
    };

    game.start();
};

function rand(num) {
    return Math.floor(Math.random() * num);
}

/* プレイヤークラス (パペット) をつくる */
Player = Class.create(Sprite, {
    initialize: function(width, height) {
        Sprite.call(this, width, height);
        /* chara1.png をつかう
        this は作ったクマ自身のこと */
        this.image = game.assets['chara1.png'];
    }
});

/* 敵クラス (パペット) をつくる */
Enemy = Class.create(Sprite, {
    initialize: function(width, height) {
        enchant.Sprite.call(this, width, height);
        this.image = game.assets['chara1.png'];
        this.frame = 5;
        this.scaleX = -1;
        this.x = 320;
        this.y = rand(320);
        this.tl.moveBy(-320, 0, 150);
    },

    onenterframe: function(){
        /* enemy と、player と交差しているかどうか判定 */
        if (this.intersect(player)) {
            /* rootSceneからplayerを削除 (画面から消す)しゲームオーバー */
            game.rootScene.removeChild(player);
            game.end();
        }
        if(this.x==0){
            game.rootScene.removeChild(this);
        }
    },

    /* touchstart: タッチされた瞬間に発生するイベント */
    ontouchstart: function(){
        /* rootScene から、this (= enemy) を削除 (画面から消す) */
        game.rootScene.removeChild(this);
    }
});