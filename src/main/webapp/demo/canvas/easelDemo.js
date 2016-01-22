/**
 * jiangyukun on 2016/1/22.
 */
+function (window, undefined) {
    var createjs = window.createjs;

    var Stage = createjs.Stage;
    var Shape = createjs.Shape;
    var Container = createjs.Container;
    var Ticker = createjs.Ticker;

    var Math = window.Math;
    var PI = Math.PI, PI2 = PI * 2;
    var sin = Math.sin, cos = Math.cos;

    var stage = new Stage('demo');
    var container = new Container();
    container.x = 100;
    container.y = 100;

    var bigRadius = 50, smallRadius = 10;
    for (var i = 0; i < 8; i++) {
        var circle = new Shape();
        var x = bigRadius * cos(PI2 * i / 8);
        var y = bigRadius * sin(PI2 * i / 8);
        circle.graphics.setStrokeStyle(1, 'round', 'round').beginStroke('#aaa').drawCircle(x, y, smallRadius);
        container.addChild(circle);
    }
    stage.addChild(container);

    Ticker.addEventListener('tick', function (event) {
        container.rotation++;
        stage.update();
    });
}(window);
