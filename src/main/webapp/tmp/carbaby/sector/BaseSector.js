/**
 * jiangyukun on 15/12/27.
 */
define("BaseSector", ["require", 'zrender/tool/util'], function (require) {
    var Base = require('zrender/shape/Base');
    var util = require('zrender/tool/util');

    var PI = Math.PI, PI2 = PI * 2;
    var cos = Math.cos, sin = Math.sin, asin = Math.asin, sqrt = Math.sqrt, atan2 = Math.atan2;
    var BaseSector = function (options) {
        this.brushTypeOnly = 'stroke';
        this.startAnimation = false;
        this.currentMoveLength = 0;
        this.maxMoveLength = 10;
        this.sectorState = 'close';
        Base.call(this, options);
    };
    BaseSector.prototype = {
        type: 'base_sector',
        buildPath: function (ctx, style) {
            var i, j;
            var startAngle = 2 * PI - style.startAngle;
            var endAngle = 2 * PI - style.endAngle;
            var centerPosition = this.getCenterPosition(style, (style.startAngle + style.endAngle) / 2);
            var x = centerPosition.x;
            var y = centerPosition.y;
            var text = style.sectorText;
            var borderWidth = style.borderWidth;
            var colorStyle = style.colorStyle;
            if (this.startAnimation && style.sectorText) {
                // rgba(57, 79, 141, 0.22)
                for (i = colorStyle.length - 1; i > 0; i--) {
                    if (colorStyle[i] == ',') {
                        colorStyle = colorStyle.substring(0, i) + ', 1)';
                        break;
                    }
                }
            }
            var radius = style.radius;

            for (j = 0; j < borderWidth; j += 0.75) {
                ctx.beginPath();
                ctx.arc(x, y, radius + j, startAngle, endAngle, true);
                ctx.strokeStyle = colorStyle;
                ctx.stroke();
            }

            // 文字
            if (!text || text.length == 0) {
                return;
            }
            ctx.font = borderWidth / 2 + "px Verdana";
            var textCenterAngle = (startAngle + endAngle) / 2;

            var textWidth = ctx.measureText(text).width;
            var textStartAngle = textCenterAngle - asin((textWidth / 2) / radius);
            for (i = 0; i < text.length; i++) {
                ctx.save();
                var currentTextAngle = textStartAngle;
                var txt_i = text[i];
                var txt_i_width = ctx.measureText(txt_i).width;

                currentTextAngle += asin((txt_i_width / 2) / radius);
                var targetX = x + cos(currentTextAngle) * (radius + borderWidth / 4);
                var targetY = y + sin(currentTextAngle) * (radius + borderWidth / 4);
                ctx.translate(targetX, targetY);
                ctx.rotate(PI / 2 + currentTextAngle);
                ctx.fillStyle = "#fff";
                ctx.fillText(txt_i, -txt_i_width / 2, -borderWidth / 8);
                textStartAngle += asin(txt_i_width / radius);
                ctx.restore();
            }
        },
        isCover: function (x, y) {
            var style = this.style;
            var centerPosition = this.getCenterPosition(style, (style.startAngle + style.endAngle) / 2);
            var sectorX = centerPosition.x;
            var sectorY = centerPosition.y;
            var dx = x - sectorX;
            var dy = sectorY - y;
            var angle = atan2(dy, dx);
            if (angle < 0) {
                angle += PI2;
            }
            if (angle < style.startAngle || angle > style.endAngle) {
                return false;
            }
            var distance = sqrt(dx * dx + dy * dy);
            return !(distance < style.radius || distance > style.radius + style.borderWidth);
        },
        open: function (zr) {
            if (this.sectorState == 'open') {
                return;
            }
            this.dispatch('open', this);
            this.processing = true;
            var self = this;
            var id = setInterval(function () {
                if (self.currentMoveLength < self.maxMoveLength) {
                    self.currentMoveLength += 2;
                    self.modSelf();
                    zr.refresh();
                } else {
                    self.processing = false;
                    self.sectorState = 'open';
                    self.dispatch('opened', self);
                    clearInterval(id);
                }
            }, 100);
        },
        close: function (zr) {
            if (this.sectorState == 'close') {
                return;
            }
            this.processing = true;
            var self = this;
            var id = setInterval(function () {
                if (self.currentMoveLength > 0) {
                    self.currentMoveLength -= 2;
                    self.modSelf();
                    zr.refresh();
                } else {
                    self.processing = false;
                    self.sectorState = 'close';
                    self.dispatch('close', self);
                    clearInterval(id);
                }
            }, 100);
        },
        changeState: function (zr) {
            if (!this.style.sectorText || this.processing) {
                return;
            }
            if (this.sectorState == 'close') {
                this.open(zr);
                this.sectorState = 'open';
            } else {
                this.close(zr);
                this.sectorState = 'close';
            }
        },
        getCenterPosition: function (style, angle) {
            return {
                x: style.x + this.currentMoveLength * cos(angle),
                y: style.y - this.currentMoveLength * sin(angle)
            };
        }
    };
    util.inherits(BaseSector, Base);
    return BaseSector;
});
