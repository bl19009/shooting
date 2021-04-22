enchant();

window.onload = function() {

    game = new Game(320, 320);
    /* 指定のpngをゲーム内で利用できるようにする設定 */
    game.preload('chara0.png')

    game.onload = function()　{
        /* charaという名前のスプライトを作る*/
        /* キャラの大きさは32x32 */
        chara = new Sprite(32, 32);
        /* キャラのX座標 */
        chara.x = 50;
        /* クマのY座標 */
        chara.y = 50;
        /* X座標への拡大率 */
        chara.scaleX = 1;
        /* Y座標への拡大率 */
        chara.scaleY = 1;
        /* chara1.gifの中にある */
        chara.image = game.assets['chara0.png'];
        /* 画面にbearを表示する */
        game.rootScene.addChild(chara); 
    };
    
    game.start();
};