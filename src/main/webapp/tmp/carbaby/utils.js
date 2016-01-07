/**
 * jiangyukun on 2015/12/29.
 */
define("utils", [], function () {
    return {
        loadImage: function (imgUrl, callback) {
            var img = new Image();
            if (typeof callback === 'function') {
                img.onload = callback;
            }
            img.onerror = function () {
                console.log('onerror');
            };
            img.src = imgUrl;
            return img;
        },
        getImageShape: function (ImageShape, CircleShape, x, y, rX, rY, imgUrl, zlevel) {
            if (typeof rY === 'string' || rY instanceof Image) {
                zlevel = imgUrl;
                imgUrl = rY;
                rY = rX;
            }
            return new ImageShape({
                zlevel: zlevel || 0,
                style: {
                    x: x - rX,
                    y: y - rY,
                    width: 2 * rX,
                    height: 2 * rY,
                    image: imgUrl
                },
                clipShape: new CircleShape({
                    style: {
                        x: x,
                        y: y,
                        r: rX
                    }
                })
            });
        },
        getTextShape: function (TextShape, x, y, text, color, fontSize) {
            return new TextShape({
                style: {
                    x: x,
                    y: y,
                    text: text,
                    color: color,
                    textFont: 'normal ' + fontSize + 'px verdana',
                    textBaseline: 'middle'
                },
                hoverable: false
            });
        },
        getLineShape: function (LineShape, x, y, xEnd, yEnd, color, lineWidth, zlevel) {
            return new LineShape({
                zlevel: zlevel || 0,
                style: {
                    xStart: x,
                    yStart: y,
                    xEnd: xEnd,
                    yEnd: yEnd,
                    strokeColor: color,
                    lineWidth: lineWidth || 1
                },
                hoverable: false
            });
        },
        getRectShape: function (RectShape, x, y, width, height, radius, color, strokeColor, lineWidth, text) {
            return new RectShape({
                style: {
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    radius: radius,
                    brushType: 'both',
                    color: color,
                    strokeColor: strokeColor,
                    lineWidth: lineWidth,
                    lineJoin: 'round',
                    text: text,
                    textColor: '#fff',
                    textPosition: 'inside',
                    textFont: 'normal 20px verdana'
                }
            });
        },
        toastr: function () {
            if (!toastr) {
                alert('toastr is not defined');
            }
            toastr.apply(null, arguments);
        }
    };
});
