enchant();

window.onload = function() {

    game = new Game(320, 320);
    /* 指定のpngをゲーム内で利用できるようにする設定 */
    game.preload('chara0.png')
   
    game.onload = function() {
        /*charaという名前の大きさ32x32のスプライトを作る */
        chara = new Sprite(32, 32);
        /*キャラのX座標 */
        chara.x = 50;
        /*キャラのY座標 */
        chara.y = 50;
        /*X座標への拡大率 */
        chara.scaleX = 2;
        /*Y座標への拡大率 */
        chara.scaleY = 2;
        /* chara1.gifの中にある */
        chara.image = game.assets['chara0.png'];
        /* 画面にcharaを表示する */
        game.rootScene.addChild(chara); 
                
        /* タッチされた時，3パターンの書き方のうちどれか一つでよい */
		chara.ontouchstart = function(){
		//chara.addEventListener('touchstart', function(){
        //chara.on('touchstart', function(){
            chara.frame++;
        //});
		};

    }
    game.start();
}