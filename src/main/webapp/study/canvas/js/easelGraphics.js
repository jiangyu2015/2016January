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
    graphics.setStrokeStyle(4, 'round', 'round');
    graphics.beginStroke('#aaa');
    graphics.drawCircle(0, 0, 30);
    graphics.beginStroke("#aaa").moveTo(10, 10).lineTo(-10, -10);

    var shape = new Shape(graphics);
    shape.x = 50;
    shape.y = 50;
    shape.cache(-50, -50, 50, 50);
    stage.addChild(shape);
    Ticker.addEventListener('tick', stage);
    Ticker.addEventListener('tick', function (event) {
        shape.rotation += 1;
    });

}(window);
