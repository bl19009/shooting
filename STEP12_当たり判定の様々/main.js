enchant();

window.onload = function() {

    game = new Game(320, 320);
    game.preload('chara1.png');

    game.onload = function() {
        ichi = new FirstKuma();
    }
    
    game.rootScene.ontouchmove = function(evt){
        ichi.x = evt.localX;
    }
    
    game.rootScene.onenterframe = function(){
        if(game.frame % 15 == 0){
            ni = new SecondKuma();
        }
        
        /* あたり判定は2種類のやり方があります． */

        /* intersectを使ったやり方 */
        /*
        //ichiと交差しているすべてのSecondKumaのインスタンスが配列として返される
        var han = ichi.intersect(SecondKuma);
        han.forEach(function(t){
            ichi.say("当たり！");
            game.rootScene.removeChild(t);
        });
        */
        
        /* withinを使ったやり方 */
        for (var i = 0; i < game.rootScene.childNodes.length; i++ ) {
            if(ichi.within(game.rootScene.childNodes[i],15) && game.rootScene.childNodes[i] != ichi){
                ichi.say("白クマさんが"+ichi.sirokuma+"人！");
                game.rootScene.removeChild(game.rootScene.childNodes[i]);
            }
        }
    }
        
    game.start();
}

FirstKuma = enchant.Class.create(Sprite, {
    initialize: function(){
        Sprite.call(this, 32, 32);
        this.x = 50;
        this.y = 250;
        this.sirokuma = 1;
        this.image = game.assets['chara1.png'];
        game.rootScene.addChild(this);
    },
    
    ontouchstart: function(){
        this.frame = 2;
    },
    
    say: function(text){
        var serifu = new Atari(text);
        serifu.x = this.x + 50;
        serifu.y = this.y - 50;
        this.sirokuma++;
        game.rootScene.addChild(serifu);
    }
});

SecondKuma = enchant.Class.create(Sprite, {
    initialize: function(){
        Sprite.call(this, 32, 32);
        this.x = Math.floor(Math.random() * (320-64));
        this.y = 0;
        this.image = game.assets['chara1.png'];
        this.frame = 5; 
        game.rootScene.addChild(this);
    },
    
    onenterframe: function(){
        this.y += ichi.y-this.y >= 50 ? (ichi.y-this.y)/15 : 5;
        this.x -= (this.x-ichi.x)/10;
        if(this.y>320){
            game.rootScene.removeChild(this);
        }
    }
});

Atari = enchant.Class.create(Label, {
    initialize: function(text){
        Label.call(this,text);
    },
    
    onenterframe: function(){
        this.y += 5;
        if(this.y>320){
            game.rootScene.removeChild(this);
        }

    }
});
