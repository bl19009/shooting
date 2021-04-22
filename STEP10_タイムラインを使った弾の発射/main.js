/* このプログラムは，全ステップでのいくつかの処理をタイムラインに置き換えたものである．
タイムラインを利用する際の参考として活用してもらいたい */

enchant();

window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.png', 'icon0.png');

    game.onload = function() {

        player = new Player(32, 32);

        game.rootScene.addChild(player);

        /* タッチに付いてくるようにする
        touchmove: タッチ座標が動いたときのイベント */
        game.rootScene.ontouchmove = function(evt) {
            /* タッチしている座標が動いたときにここが呼び出される
            evt.x にタッチのx座標、evt.y にタッチのy座標が入っている */
            player.x = evt.x - 16;
            player.y = evt.y - 16;
        }
    };

    game.rootScene.tl.delay(30).then(function() {
        game.rootScene.addChild(new Enemy(32, 32));
    }).loop();

    game.start();
};

function rand(num) {
    return Math.floor(Math.random() * num);
}

Player = Class.create(Sprite, {
    initialize: function(width, height) {
        Sprite.call(this, width, height);
        this.image = game.assets['chara1.png'];
        this.tl.delay(10).then(function() {
            game.rootScene.addChild(new Apple());
        }).loop();

    }
});

Enemy = Class.create(Sprite, {
    initialize: function(width, height) {
        Sprite.call(this, width, height);
        this.image = game.assets['chara1.png'];
        this.frame = 5;
        /* 右からやってくるので、左右逆転 */
        this.scaleX = -1;
        this.x = 320;
        this.y = rand(320);
        /* Timelineの利用．5秒間(150フレーム)かけて(-320, 0)だけ移動 */
        this.tl.moveBy(-320, 0, 150);
    },
    onenterframe: function(){
        if(this.x==0){
            game.rootScene.removeChild(this);   
        }
    }
});

Apple = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        this.image = game.assets['icon0.png'];                
        this.frame = 15;

        /* プレイヤーがいる場所から発射 */
        this.x = game.rootScene.childNodes[0].x + 8;
        this.y = game.rootScene.childNodes[0].y + 8;

        this.tl.moveBy(320, 0, 60).then(function(){
            /* 画面から削除 */
            game.rootScene.removeChild(this);
        });
    }
});
