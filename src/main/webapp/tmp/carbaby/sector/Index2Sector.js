/**
 * jiangyukun on 15/12/27.
 */
define("Index2Sector", ["require", 'Index1Sector', 'zrender/tool/util'], function (require) {
    var Index1Sector = require('Index1Sector');
    var util = require('zrender/tool/util');

    var PI = Math.PI;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin;

    var Index2Sector = function (options) {
        this.currentIndex2Angle = 0;
        this.animation2 = true;
        this.before2Time = -1;
        Index1Sector.call(this, options);
    };
    Index2Sector.prototype = {
        type: 'index_sector',
        reset: function () {
            Index1Sector.prototype.reset.apply(this, arguments);
            this.animation2 = true;
            this.currentIndex2Angle = 0;
            this.before2Time = -1;
        },
        buildPath: function (ctx, style) {
            Index1Sector.prototype.buildPath.call(this, ctx, style);

            var i;
            var startAngle = 2 * PI - style.startAngle;
            var endAngle = 2 * PI - style.endAngle;
            var centerPosition = this.getCenterPosition(style, (style.startAngle + style.endAngle) / 2);
            var x = centerPosition.x;
            var y = centerPosition.y;
            var deltaAngle = startAngle - endAngle;
            var borderWidth = style.borderWidth;

            var index2Text = style.index2Text;
            var index2Color = style.index2Color;
            var radius = style.radius + borderWidth + 20;
            var exactMultiple = 1;
            if (this.before2Time != -1) {
                exactMultiple = (+new Date() - this.before2Time) / 100;
            }

            // 开始动画
            if (this.startAnimation) {
                if (!style.sectorText) {
                    this.animation2 = false;
                    return;
                }
                var xxx = style.my > style.average ? 4 : 6;
                var maxAngle = deltaAngle / xxx;
                var anglePer = maxAngle / 5;

                for (i = 0; i < 4; i += 1) {
                    ctx.beginPath();
                    ctx.arc(x, y, radius + i, startAngle, startAngle - this.currentIndex2Angle, true);
                    ctx.strokeStyle = index2Color;
                    ctx.stroke();
                }
                if (!this.animation1) {
                    if (this.currentIndex2Angle < maxAngle) {
                        this.currentIndex2Angle += anglePer * exactMultiple;
                        if (this.currentIndex2Angle > maxAngle) {
                            this.currentIndex2Angle = maxAngle;
                        }
                    } else {
                        this.animation2 = false;
                        this.showIndexText(ctx, x, y, radius, startAngle - maxAngle, index2Text, index2Color);
                    }
                }
                this.before2Time = +new Date();
            }
            // 结束动画
        }
    };
    util.inherits(Index2Sector, Index1Sector);
    return Index2Sector;
});
