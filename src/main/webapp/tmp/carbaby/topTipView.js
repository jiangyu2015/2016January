/**
 * jiangyukun on 2015/12/28.
 */
define("topTipView", ['require', 'zrender/shape/Circle', 'zrender/shape/Text'], function (require) {
    var CircleShape = require('zrender/shape/Circle');
    var TextShape = require('zrender/shape/Text');
    return function (context) {
        var zr = context.zr;
        var shapeContainer = context.shapeContainer;
        var baseColor1 = context.color.baseColor1;
        var baseColor2 = context.color.baseColor2;

        var averageValueCircle = new CircleShape({
            zlevel: 0,
            style: {
                x: 10,
                y: 10,
                r: 5,
                brushType: 'fill',
                color: baseColor1
            },
            hoverable: false
        });

        var averageValueText = new TextShape({
            style: {
                x: 20,
                y: 2,
                text: '均值',
                color: '#000',
                textFont: 'normal 12px verdana',
                textBaseline: 'top'
            },
            hoverable: false
        });

        var myValueCircle = new CircleShape({
            zlevel: 0,
            style: {
                x: 55,
                y: 10,
                r: 5,
                brushType: 'fill',
                color: baseColor2
            },
            hoverable: false
        });

        var myValueText = new TextShape({
            style: {
                x: 64,
                y: 2,
                text: '我的',
                color: '#000',
                textFont: 'normal 12px verdana',
                textBaseline: 'top'
            },
            hoverable: false
        });

        zr.addShape(averageValueCircle);
        zr.addShape(averageValueText);
        zr.addShape(myValueCircle);
        zr.addShape(myValueText);

        shapeContainer.averageValueCircle = averageValueCircle;
        shapeContainer.averageValueText = averageValueText;
        shapeContainer.myValueCircle = myValueCircle;
        shapeContainer.myValueText = myValueText;
    };
});
