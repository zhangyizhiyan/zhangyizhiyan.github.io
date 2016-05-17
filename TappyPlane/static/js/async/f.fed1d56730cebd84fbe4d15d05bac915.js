/*coolie built*/
define("0",["1"],function(e){return e("1")});
define("1",["4","5","6","7"],function(t,a,i){var e=new laya.utils.TimeLine,n=new laya.utils.Tween,l=Laya.timer,r=(laya.utils.Ease,laya.utils.Handler),d=function(){d=new laya.display.Sprite;d.width=Laya.stage.width;d.height=Laya.stage.height;return d}(),o=function(){o=new laya.display.Sprite;o.loadImage("TappyPlane/background.png",0,0);return o}(),h=function(){h=t("4").init(0,d.height);h.pivot(0,h.height);return h}(),s=t("5").init(50,350),p=t("5").init(700,180,"gold"),c=t("5").init(600,20,"silver"),g=function(){g=new laya.display.Sprite;g.loadImage("UI/textGetReady.png");g.pivot(g.width/2,g.height/2);g.pos(d.width/2,80);e.add("scaleDown",0);e.to(g,{scaleX:.8,scaleY:.8},2e3);e.add("scaleUp",0);e.to(g,{scaleX:1,scaleY:1},2e3);e.play(0,!0);return g}(),u=function(){var e,o,h;u=new laya.display.Sprite;u.width=150;u.height=150;e=function(){e=t("6").init(u.width/2,u.height/2,"blue",!1);e.pivot(e.width/2,e.height/2);return e}();o=function(){function t(){n.to(e,{rotation:-45},2e3,null,r.create(this,a));e.stop();e.interval=.6*s;e.play();d()}function a(){n.to(e,{rotation:0},2e3,null,r.create(this,t));e.stop();e.interval=s;e.play();d()}function d(){var t=(h=!h)?"UI/tapTick.png":"UI/tap.png";o.graphics.clear();o.loadImage(t)}var h=!1,s=e.interval;o=new laya.display.Sprite;o.loadImage("UI/tap.png");o.pos(u.width/2+40,u.height/2+40);l.once(1e3,i,function(){t()});return o}();u.addChild(o);h=function(){var t,a,i=new laya.display.Sprite;i.width=300;i.height=150;t=new laya.display.Sprite;t.loadImage("UI/tapRight.png");t.pos(10,i.height/2-20);a=new laya.display.Sprite;a.loadImage("UI/tapLeft.png");a.pos(i.width-90,i.height/2-20);i.addChild(t);i.addChild(a);i.pos(u.width/2,u.height/2);i.pivot(i.width/2,i.height/2);return i}();u.addChild(h);u.addChild(e);u.pivot(u.width/2,u.height/2);u.pos(d.width/2,d.height/2-20);u.once("click",this,function(){var e,n,r=a.clear;if(laya.renders.Render.isWebGl){e=[.3086,.6094,.082,0,0,.3086,.6094,.082,0,0,.3086,.6094,.082,0,0,0,0,0,1,0];n=new Laya.ColorFilter(e);d.filters=[n]}t.async("g",function(t){l.once(500,i,function(){t.show();r()})})});return u}(),y=function(){y=t("7").createRocks("rock");y.pos(d.width-150,0);return y}();a.show=function(){var t,a,i;Laya.stage.addChild(d);t=[o,g,s,p,c,u,y,h];for(a=0,i=t.length;a<i;a++)d.addChild(t[a])};a.clear=function(){n.clear();l.clearAll(i);e.destory();Laya.stage.removeChild(d)}});
define("4",["8"],function(e,t,r){var a=e("8").game.layaClass.Sprite,n=Matter.Bodies,i=Matter.Vertices,o=Matter.Vector,s=Matter.Body,c=e("8").game.collisionCategory,l=i.fromPath("808 71 807 37 764 27 744 1 657 3     636 24 599 27 574 55 534 55 509 44 470 44 437 13 374 13     350 27 307 28 249 6 159 8 134 34 91 46 41 43 33 35 0 36 0 70");t.init=function(e,t,r,i){function p(e,t,r){var n=Object.create(a),i=g(r);n.loadImage(i);n.pos(e,t);return n}function d(e,t,r){var i=n.fromVertices(0,0,l),p=o.sub(i.position,i.bounds.min);i._offset=p;i.render.sprite.xOffset=p.x;i.render.sprite.yOffset=p.y;p=o.add(p,o.create(e,t));s.translate(i,p);i._display=Object.create(a);i._display.loadImage(g(r));i._display.zOrder=100;i.collisionFilter.category=c.GROUND;i.collisionFilter.mask=c.PLAYER;s.setStatic(i,!0);s.setDensity(i,9999);return i}function g(e){var t="TappyPlane/groundDirt.png";"grass"==e?t="TappyPlane/groundGrass.png":"ice"==e?t="TappyPlane/groundIce.png":"snow"==e&&(t="TappyPlane/groundSnow.png");return t}return void 0==i||0==i?p(e,t,r):d(e,t,r)}});
define("8",[],function(e,t,n){t.game={layaClass:{Sprite:new laya.display.Sprite,Animation:new laya.display.Animation},collisionCategory:{PLAYER:Math.pow(2,0),GROUND:Math.pow(2,1),ROCK:Math.pow(2,2),COLLECTABLE:Math.pow(2,3)},_scrollSpeed:40,get scrollSpeed(){return this._scrollSpeed},set scrollSpeed(e){this._scrollSpeed=e;Laya.stage.event("speedChange")},rockTime:5e3,_score:0,get score(){return this._score},set score(e){this._score=e;Laya.stage.event("scoreChange")},backgroundSpeed:1,isGameEnd:!1,container:null,level1:20,level2:60,level3:100,isReset:!1}});
define("5",["8","9"],function(e,a,i){var n=e("8").game.layaClass.Sprite,t=e("8").game.collisionCategory,o=new laya.utils.TimeLine,s=Laya.timer,r=(laya.utils.Handler,laya.utils.Ease.linearIn,Laya.loader.getRes("TappyPlane/starBronze.png").width),l=Laya.loader.getRes("TappyPlane/starBronze.png").height,p=Matter.Bodies,d=(Matter.Vertices,Matter.Vector),y=Matter.Body,c=Matter.Events;a.init=function(a,g,f,m){function u(e,a,i){var t=Object.create(n);t.loadImage(b(i));t.pos(e,a);_(t,h);return t}function v(a,o,g){var f=p.rectangle(a,o,r,l),m=d.sub(f.position,f.bounds.min);f._pos={x:f.position.x,y:f.position.y};f._type=g;f.render.sprite.xOffset=m.x;f.render.sprite.yOffset=m.y;f._display=Object.create(n);f._display.loadImage(b(g));f._display.zOrder=8;_(f._display,h);f.collisionFilter.category=t.COLLECTABLE;f.collisionFilter.mask=t.PLAYER;f.isSensor=!0;y.setStatic(f,!0);f.label="star";c.on(f,"collisionStart",function(a){var i,n={bronze:1,silver:3,gold:5};if(!e("8").game.isGameEnd&&!f._iscollision){if("player"==a.body.label){e("8").game.score+=n[f._type];f.render.visible=!1;i=e("9").init(a.body.position.x,a.body.position.y,n[f._type]);e("8").game.container.addChild(i)}f._iscollision=!0}});c.on(f,"collisionEnd",function(e){s.once(5e3,i,function(){f._iscollision&&(f._iscollision=!1)})});return f}function _(e,a){o.add("shineDown",0);o.to(e,{alpha:.5},a);o.add("shineUp",0);o.to(e,{alpha:1},a);o.play(0,!0)}function b(e){var a="TappyPlane/starBronze.png";"silver"==e?a="TappyPlane/starSilver.png":"gold"==e&&(a="TappyPlane/starGold.png");return a}var h=800+300*Math.random();return void 0==m||0==m?u(a,g,f):v(a,g,f)}});
define("9",[],function(e,n,a){var o=new laya.ui.Label,t=new laya.utils.Tween,l=laya.utils.Handler;n.init=function(e,n,a){var r,i=[];i[1]="#00FF00";i[3]="#0000FF";i[5]="#EEEE00";o.text="+"+String(a);o.font="黑体";o.bold=!0;o.fontSize=48;o.zOrder=100;o.color=i[a];o.pos(e,n);r=o.y-80;t.to(o,{y:r},2e3,null,l.create(this,function(){o.removeSelf()}));laya.media.SoundManager.playSound("res/sound/score.mp3",1);return o}});
define("6",["8"],function(e,a,n){function l(e,a,n){var l=Laya.loader.getRes("TappyPlane/planeBlue1.png").width,p=Laya.loader.getRes("TappyPlane/planeBlue1.png").height,r=Object.create(o),i=t(n);r.loadImages(i);r.width=l;r.height=p;r.pos(e,a);r.interval=200;r.loop=!0;r.play();return r}function p(a,l,p){var g=s.fromVertices(a,l,u),P=y.sub(g.position,g.bounds.min);g.render.sprite.xOffset=P.x;g.render.sprite.yOffset=P.y;g._display=Object.create(o);g._display.loadImages(t(p));g._display.zOrder=30;g._display.loop=!0;g._display.interval=300;g._display.play();g.collisionFilter.category=m.PLAYER;g.collisionFilter.mask=m.GROUND|m.ROCK|m.COLLECTABLE;i.loop(60,n,function(){d.rotate(g,Math.PI/90);g.angle>=Math.PI/2&&(g.angle=Math.PI/2)});g.label="player";c.on(g,"collisionStart",function(a){if(!e("8").game.isGameEnd&&"star"!=a.body.label&&"score"!=a.body.label){e("8").game.scrollSpeed=0;e("8").game.backgroundSpeed=0;navigator.vibrate?navigator.vibrate(300):navigator.webkitVibrate&&navigator.webkitVibrate(300);e("8").game.isGameEnd=!0;r.stop();laya.media.SoundManager.playSound("res/sound/boom.mp3",1);i.once(1e3,n,function(){e.async("g",function(e){e.clear()})})}});r=laya.media.SoundManager.playSound("res/sound/fly.mp3",0);return g}function t(e){var a=["TappyPlane/planeBlue1.png","TappyPlane/planeBlue2.png","TappyPlane/planeBlue3.png"];"green"==e?a=["TappyPlane/planeGreen1.png","TappyPlane/planeGreen2.png","TappyPlane/planeGreen3.png"]:"yellow"==e?a=["TappyPlane/planeYellow1.png","TappyPlane/planeYellow2.png","TappyPlane/planeYellow3.png"]:"red"==e&&(a=["TappyPlane/planeRed1.png","TappyPlane/planeRed2.png","TappyPlane/planeRed3.png"]);return a}var r,o=e("8").game.layaClass.Animation,i=Laya.timer,s=Matter.Bodies,g=Matter.Vertices,y=Matter.Vector,d=Matter.Body,c=Matter.Events,m=e("8").game.collisionCategory,u=g.fromPath("1 16 6 11 15 12 22 18 32 17 22 6     26 1 69 1 74 7 69 13 77 28 81 17 85 18 85 64 81 66 78 64 69 63     61 72 54 72 47 64 33 60 25 64 19 57 20 51 23 50 9 31 3 30");a.init=function(e,a,n,t){return void 0==t||0==t?l(e,a,n):p(e,a,n)}});
define("7",["8","d","e","9"],function(o,i,e){var a=o("8").game.layaClass.Sprite,t=Matter.Composite,s=Matter.Bodies,n=Matter.Events,r=o("d"),l=o("e"),c=o("8").game.collisionCategory,d=Laya.timer;i.createRocks=function(i,g){function m(){var i=s.rectangle(150,Laya.stage.height/2,1,Laya.stage.height);i._pos={x:i.position.x,y:i.position.y};i.collisionFilter.category=c.COLLECTABLE;i.collisionFilter.mask=c.PLAYER;Body.setStatic(i,!0);i.isSensor=!0;i.render.visible=!1;i._score=1;i.label="score";n.on(i,"collisionStart",function(e){if(!o("8").game.isGameEnd&&!i._isCollision){if("player"==e.body.label){o("8").game.score+=i._score;var a=o("9").init(e.body.position.x,e.body.position.y,i._score);o("8").game.container.addChild(a)}i._isCollision=!0}});n.on(i,"collisionEnd",function(o){d.once(5e3,e,function(){i._isCollision&&(i._isCollision=!1)})});t.add(y,i)}var y,f,C,j,p,h,_;if(void 0==g||0==g)y=Object.create(a);else{y=t.create();m()}j=Math.floor(3*Math.random());p=l[i][j]["rock"+String(j+1)];for(h=0,_=p.length;h<_;h++){f="up"==p[h].direction?i:i+"Down";C=r.init(p[h].x,p[h].y,f,g);void 0==g||0==g?y.addChild(C):t.add(y,C)}y._type=i;return y}});
define("d",["8"],function(e,o,r){var n=e("8").game.layaClass.Sprite,a=(laya.utils.Handler,Matter.Bodies),t=Matter.Vertices,s=Matter.Vector,c=Matter.Body,i=e("8").game.collisionCategory,p=t.fromPath("62 1 69 1 81 102 86 102 94 173     100 178 106 236 0 236 29 130 37 122"),l=t.fromPath("62 237 69 237 81 135 86 134 94 64     100 60 107 1 0 1 28 107 37 114");o.init=function(e,o,r,t){function y(e,o,r){var a=Object.create(n);a.loadImage(f(r));a.pos(e,o);return a}function d(e,o,r){var t,y;t=-1!=r.indexOf("Down")?a.fromVertices(0,0,l):a.fromVertices(0,0,p);y=s.sub(t.position,t.bounds.min);t._offset=y;t.render.sprite.xOffset=y.x;t.render.sprite.yOffset=y.y;y=s.add(y,s.create(e,o));c.translate(t,y);t._pos={x:t.position.x,y:t.position.y};t._display=Object.create(n);t._display.loadImage(f(r));t._display.zOrder=10;t.collisionFilter.category=i.ROCK;t.collisionFilter.mask=i.PLAYER;c.setStatic(t,!0);c.setDensity(t,9999);return t}function f(e){var o="TappyPlane/rock.png";"rockDown"==e?o="TappyPlane/rockDown.png":"rockGrass"==e?o="TappyPlane/rockGrass.png":"rockGrassDown"==e?o="TappyPlane/rockGrassDown.png":"rockIce"==e?o="TappyPlane/rockIce.png":"rockIceDown"==e?o="TappyPlane/rockIceDown.png":"rockSnow"==e?o="TappyPlane/rockSnow.png":"rockSnowDown"==e&&(o="TappyPlane/rockSnowDown.png");return o}return void 0==t||0==t?y(e,o,r):d(e,o,r)}});
define("e",[],function(y,d,r){r.exports={"rock":[{"rock1":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rock.png","direction":"up"},{"x":50,"y":350,"w":108,"h":239,"img":"rock.png","direction":"up"}]},{"rock2":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockDown.png","direction":"down"},{"x":60,"y":-90,"w":108,"h":239,"img":"rockDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rock.png","direction":"up"}]},{"rock3":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rock.png","direction":"up"}]}],"rockGrass":[{"rock1":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockGrassDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockGrass.png","direction":"up"},{"x":50,"y":350,"w":108,"h":239,"img":"rockGrass.png","direction":"up"}]},{"rock2":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockGrassDown.png","direction":"down"},{"x":60,"y":-90,"w":108,"h":239,"img":"rockGrassDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockGrass.png","direction":"up"}]},{"rock3":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockGrassDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockGrass.png","direction":"up"}]}],"rockIce":[{"rock1":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockIceDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockIce.png","direction":"up"},{"x":50,"y":350,"w":108,"h":239,"img":"rockIce.png","direction":"up"}]},{"rock2":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockIceDown.png","direction":"down"},{"x":60,"y":-90,"w":108,"h":239,"img":"rockIceDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockIce.png","direction":"up"}]},{"rock3":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockIceDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockIce.png","direction":"up"}]}],"rockSnow":[{"rock1":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockSnowDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockSnow.png","direction":"up"},{"x":50,"y":350,"w":108,"h":239,"img":"rockSnow.png","direction":"up"}]},{"rock2":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockSnowDown.png","direction":"down"},{"x":60,"y":-90,"w":108,"h":239,"img":"rockSnowDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockSnow.png","direction":"up"}]},{"rock3":[{"x":0,"y":-120,"w":108,"h":239,"img":"rockSnowDown.png","direction":"down"},{"x":0,"y":300,"w":108,"h":239,"img":"rockSnow.png","direction":"up"}]}]}});