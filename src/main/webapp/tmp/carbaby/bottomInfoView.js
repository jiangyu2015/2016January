/**
 * jiangyukun on 2015/12/28.
 */
define("bottomInfoView", ['require', 'zrender/tool/area', 'zrender/shape/Rectangle', 'zrender/shape/Text', 'utils'], function (require) {
    var area = require('zrender/tool/area');
    var RectShape = require('zrender/shape/Rectangle');
    var LineShape = require('zrender/shape/Line');
    var TextShape = require('zrender/shape/Text');
    var utils = require('utils');

    var panelDetailInfo;
    var averageCost;
    var myCost;
    var averageLine;
    var myLine;

    return {
        show: function (context, tipText, averageCostText, myCostText, average, my) {
            var zr = context.zr;
            var centerX = context.centerX;
            var centerY = context.centerY;
            var width = context.width;
            var baseHeight = centerX * 2 - 25;
            var shapeContainer = context.shapeContainer;
            var baseColor1 = context.color.baseColor1;
            var baseColor2 = context.color.baseColor2;
            var baseColor3 = context.color.baseColor3;

            // 左
            var leftStartX = 10;
            var rectWidth = 100, rectHeight = 35;
            // 右
            var costTextFontSize = 16;
            var averageCostTextWidth = area.getTextWidth(averageCostText, costTextFontSize);
            var myCostTextWidth = area.getTextWidth(myCostText, costTextFontSize);
            var textWidth = averageCostTextWidth > myCostTextWidth ? averageCostTextWidth : myCostTextWidth;

            var costTextStartX = width - textWidth - 40;
            var lineStartX = costTextStartX - 70;
            // 第一条线
            var firstLineBaseHeight = baseHeight + 7;
            // 第二条线
            var secondLineBaseHeight = firstLineBaseHeight + 20;

            panelDetailInfo = utils.getRectShape(RectShape, leftStartX, baseHeight, rectWidth, rectHeight, [0, 0], baseColor3, '#000', 1, tipText);

            averageCost = utils.getTextShape(TextShape, costTextStartX, firstLineBaseHeight, averageCostText, '#000', costTextFontSize);
            averageLine = utils.getLineShape(LineShape, lineStartX, firstLineBaseHeight, costTextStartX - (average > my ? 10 : 25), firstLineBaseHeight, baseColor1, 4, 1);

            myCost = utils.getTextShape(TextShape, costTextStartX, secondLineBaseHeight, myCostText, '#000', costTextFontSize);
            myLine = utils.getLineShape(LineShape, lineStartX, secondLineBaseHeight, costTextStartX - (my > average ? 10 : 25), secondLineBaseHeight, baseColor2, 4, 1);

            zr.addElement(panelDetailInfo);
            zr.addElement(averageCost);
            zr.addElement(myCost);
            zr.addElement(averageLine);
            zr.addElement(myLine);
            zr.refresh();
        },
        remove: function (context) {
            var zr = context.zr;

            zr.delElement(panelDetailInfo);
            zr.delElement(averageCost);
            zr.delElement(myCost);
            zr.delElement(averageLine);
            zr.delElement(myLine);
            zr.refresh();
        }
    };
});
