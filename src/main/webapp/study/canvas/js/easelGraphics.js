/**
 * jiangyukun on 2016/1/18.
 */
+function (window, undefined) {
    'use strict';

    var createjs = window.createjs;

    var Stage = createjs.Stage;
    var Shape = createjs.Shape;
    var Graphics = createjs.Graphics;
    var Ticker = createjs.Ticker;

    var stage = new Stage('easelGraphics');
    var graphics = new Graphics();
    graphics.setStrokeStyle(10, 'round', 'round');
    graphics.beginStroke('#aaa');
    graphics.drawCircle(0, 0, 100);

    var shape = new Shape(graphics);
    stage.addChild(shape);
    Ticker.addEventListener('tick', stage);
    Ticker.addEventListener('tick', function (event) {
        //graphics.beginStroke("#aaa").moveTo(100, 100).lineTo(10, 10);
    });

}(window);
