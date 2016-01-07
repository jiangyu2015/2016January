/**
 * jiangyukun on 15/12/27.
 */
define("Index1Sector", ["require", 'BaseSector', 'zrender/tool/util'], function (require) {
    var BaseSector = require('BaseSector');
    var util = require('zrender/tool/util');

    var PI = Math.PI;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin;

    var IndexSector = function (options) {
        this.brushTypeOnly = 'stroke';
        this.currentIndexAngle = 0;
        this.animation1 = true;
        this.beforeTime = -1;
        BaseSector.call(this, options);
    };
    IndexSector.prototype = {
        type: 'index_sector',
        reset: function () {
            this.startAnimation = true;
            this.animation1 = true;
            this.currentIndexAngle = 0;
            this.beforeTime = -1;
        },
        buildPath: function (ctx, style) {
            BaseSector.prototype.buildPath.call(this, ctx, style);

            var i;
            var startAngle = 2 * PI - style.startAngle;
            var endAngle = 2 * PI - style.endAngle;
            var centerPosition = this.getCenterPosition(style, (style.startAngle + style.endAngle) / 2);
            var x = centerPosition.x;
            var y = centerPosition.y;
            var deltaAngle = startAngle - endAngle;
            var borderWidth = style.borderWidth;

            var index1Color = style.index1Color;
            var index1Text = style.index1Text;
            var radius = style.radius + borderWidth + 8;
            var exactMultiple = 1;
            if (this.beforeTime != -1) {
                exactMultiple = (+new Date() - this.beforeTime) / 100;
            }

            // 开始动画
            if (this.startAnimation) {
                if (!style.sectorText) {
                    this.animation1 = false;
                    return;
                }
                var maxAngle = deltaAngle / (style.average > style.my ? 4 : 6);
                var anglePer = maxAngle / 5;

                for (i = 0; i < 4; i += 1) {
                    ctx.beginPath();
                    ctx.arc(x, y, radius + i, startAngle, startAngle - this.currentIndexAngle, true);
                    ctx.strokeStyle = index1Color;
                    ctx.stroke();
                }
                if (this.currentIndexAngle < maxAngle) {
                    this.currentIndexAngle += anglePer * exactMultiple;
                    if (this.currentIndexAngle > maxAngle) {
                        this.currentIndexAngle = maxAngle;
                    }
                } else {
                    this.animation1 = false;
                    this.showIndexText(ctx, x, y, radius, startAngle - maxAngle, index1Text, index1Color);
                }
                this.beforeTime = +new Date();
            }
            // 结束动画
        },
        showIndexText: function (ctx, x, y, textRadius, endAngle, text, color) {
            ctx.save();
            ctx.font = "12px Verdana";
            var textWidth = ctx.measureText(text).width;
            var textMiddleAngle = endAngle - asin((textWidth / 4) / textRadius);
            var textCenterX = x + cos(textMiddleAngle) * textRadius;
            var textCenterY = y + sin(textMiddleAngle) * textRadius;

            ctx.translate(textCenterX, textCenterY);
            ctx.rotate(PI / 2 + textMiddleAngle);
            ctx.fillStyle = color;
            ctx.fillText(text, -textWidth * 3 / 4 - 3, 0);

            ctx.restore();
        }
    };
    util.inherits(IndexSector, BaseSector);
    return IndexSector;
});
