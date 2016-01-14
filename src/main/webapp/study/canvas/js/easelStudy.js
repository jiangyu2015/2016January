/**
 * jiangyukun on 2016/1/14.
 */
+function (window, createjs) {
    'use strict';

    //console.log(createjs);
    var Stage = createjs.Stage;
    var Ticker = createjs.Ticker;
    var Text = createjs.Text;

    var stage = new Stage('easelStudy');
    console.log(stage);
    var introduce = new Text('ii.a');
    stage.addChild(introduce);

    Ticker.framerate = 60;
    Ticker.addEventListener('tick', stage);
}(window, createjs);
