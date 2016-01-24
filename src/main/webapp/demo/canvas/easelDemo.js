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
    container.x = 200;
    container.y = 200;

    //var border = new Shape();
    //border.graphics.setStrokeStyle(1, 'round','round').beginStroke('#aaa').drawRect(0, 0, 100, 100);
    //container.addChild(border);

    var eightCircles = [];
    var bigRadius = 100, smallRadius = 20;
    for (var i = 0; i < 8; i++) {
        var circle = new Shape();
        eightCircles.push(circle);
        container.addChild(circle);
    }
    stage.addChild(container);


    var currentBigRadius = 0;
    Ticker.addEventListener('tick', function (event) {
        currentBigRadius += 1;
        if (currentBigRadius > bigRadius) {
            return;
        }
        var rate = currentBigRadius / bigRadius;

        for (var i = 0; i < 8; i++) {
            var circle = eightCircles[i];
            var x = currentBigRadius * cos(PI2 * i / 8);
            var y = currentBigRadius * sin(PI2 * i / 8);
            circle.graphics.clear();
            circle.graphics.setStrokeStyle(1, 'round', 'round').beginStroke('#aaa').drawCircle(x, y, rate * smallRadius);
        }
        container.rotation = rate * 360;
        stage.update();
    });
}(window);
