/**
 * jiangyukun on 2015/12/26.
 */
define('carBabyView', ['zepto', 'beginAnimationView', 'instrumentPanelView', 'topTipView', 'bottomInfoView'], function ($) {
    var beginAnimationView = require('beginAnimationView');
    var instrumentPanelView = require('instrumentPanelView');
    var topTipView = require('topTipView');
    var bottomInfoView = require('bottomInfoView');

    var $carInfoCanvas = $('#carInfoCanvas');
    return function (context) {
        var zr = context.zr;

        beginAnimationView(context, function () {
            instrumentPanelView(context, panelChange);
            topTipView(context);
        });

        function panelChange(type, panel) {
            var panelText = panel.style.sectorText;
            var tipText = panelText + '详情';
            var averageCostText = panel.style.index1Text;
            var myCostText = panel.style.index2Text;
            var average = panel.style.average;
            var my = panel.style.my;
            if (type == 'close') {
                bottomInfoView.remove(context);
            } else if (type == 'opened') {
                bottomInfoView.show(context, tipText, averageCostText, myCostText, average, my);
            }
            $carInfoCanvas.trigger('panelStateChanged', [type, panelText]);
        }

        zr.render();
    };
});
