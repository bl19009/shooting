enchant();

window.onload = function() {
        
    game = new Core(320, 320);
    game.preload('chara1.png');
    
    game.onload = function() {

        /* Player クラスのクマを1匹作る */
        player = new Player(32, 32);
        /* 画面に表示する (ひとつだけでる) */
        game.rootScene.addChild(player);
        
        /* タッチに付いてくるようにする */
        game.rootScene.ontouchmove = function(evt){
            // タッチしている座標が動いたときにここが呼び出される
            // evt.x にタッチのx座標、evt.y にタッチのy座標が入っている
            player.x = evt.x - 16;
            player.y = evt.y - 16;
        }
        
        /* 一定間隔で敵を生成する方法は2種類考えられる */
        
        /* ひとつめのやり方 */
        game.rootScene.onenterframe = function () {
            if(game.frame%30==0){
                game.rootScene.addChild(new Enemy(32, 32));
            }
		};

        /* ふたつめのやり方 */
        /*
        player.tl.delay(30).then(function(){
            game.rootScene.addChild(new Enemy(32, 32));
        }).loop();
        */
    };

    game.start();
};

function rand(num){
    return Math.floor(Math.random() * num);
}

/* 敵クラス (パペット) をつくる */
Enemy = enchant.Class.create(Sprite, {
    initialize: function(width, height) {
        enchant.Sprite.call(this, width, height);
        /* chara1.png をつかう */
        this.image = game.assets['chara1.png'];
        /* しろクマの画像をつかう */
        this.frame = 5;   
        /* 右からやってくるので、左右逆転 */
        this.scaleX = -1; 
        /* x座標は、320 */
        this.x = 320
        /* y座標は、0から319までのランダム */
        this.y = rand(320); 
        /* 5秒間かけて、(-320, 0) だけ移動 */
        this.tl.moveBy(-320, 0, 150);
    },
    
    ontouchstart: function(){
        game.rootScene.removeChild(this);
    },
    
    onenterframe: function(){
        if(this.x==0){
            this.scaleX *= 1.01;
            this.scaleY *= 1.01;
        }
    }
    
});

/* プレイヤークラス (パペット) をつくる */
Player = enchant.Class.create(Sprite, {
    initialize: function(width, height) {
        enchant.Sprite.call(this, width, height);
        this.image = game.assets['chara1.png'];
    }
});
