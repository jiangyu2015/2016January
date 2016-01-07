/**
 * jiangyukun on 2015/12/29.
 */
define("beginAnimationView", ['require', 'zrender/shape/Image', 'zrender/shape/Circle', 'zrender/shape/Line', 'zrender/shape/Text', 'zrender/Group', 'utils'], function (require) {
    var ImageShape = require('zrender/shape/Image');
    var CircleShape = require('zrender/shape/Circle');
    var LineShape = require('zrender/shape/Line');
    var TextShape = require('zrender/shape/Text');
    var Group = require('zrender/Group');
    var utils = require('utils');

    var PI = Math.PI, PI2 = PI * 2;
    return function (context, callback) {
        var zr = context.zr;
        var width = context.width;
        var centerX = context.centerX;
        var centerY = context.centerY;
        var images = context.images;
        var shapeContainer = context.shapeContainer;

        // 车
        var carWidth = width * 1.1 / 4, carHeight = carWidth / 2.376;
        var car = utils.getImageShape(ImageShape, CircleShape, 0, 0, carWidth, carHeight, images.carImage);
        var carGroup = new Group({position: [centerX, centerY]});
        carGroup.addChild(car);
        zr.addElement(carGroup);

        // 车的独白
        var line1StartX = centerX;
        var line1StartY = centerY - carHeight / 2;
        var line1EndX = line1StartX + 20;
        var line1EndY = line1StartY - 50;

        var line2EndX = line1EndX + 25;
        var line2EndY = line1EndY;

        var carLine1 = utils.getLineShape(LineShape, line1StartX, line1StartY, line1EndX, line1EndY, '#999', 1, 1);
        var carLine2 = utils.getLineShape(LineShape, line1EndX, line1EndY, line2EndX, line2EndY, '#999', 1, 1);
        var carSay1 = utils.getTextShape(TextShape, line2EndX, line2EndY - 20, 'hi~主人', '#999', 12);
        var carSay2 = utils.getTextShape(TextShape, line2EndX, line2EndY, '想我了是不是?!', '#999', 12);
        var carSay3 = utils.getTextShape(TextShape, line2EndX, line2EndY + 20, '我要开始自我检测喽!', '#999', 12);
        zr.addElement(carLine1);
        zr.addElement(carLine2);
        zr.addElement(carSay1);
        zr.addElement(carSay2);
        zr.addElement(carSay3);

        setTimeout(function () {
            zr.animate(car).when(500, {
                scale: [1 / 1.2, 1 / 1.2, 0, 0]
            }).done(function () {
                zr.delElement(carLine1);
                zr.delElement(carLine2);
                zr.delElement(carSay1);
                zr.delElement(carSay2);
                zr.delElement(carSay3);
                showRadar();
            }).start();
        }, 1000);

        // 雷达
        function showRadar() {
            var radarRadius = width / 4;
            var radarTen = utils.getImageShape(ImageShape, CircleShape, centerX, centerY, radarRadius, images.radarTenImage);
            var radar = utils.getImageShape(ImageShape, CircleShape, 0, 0, radarRadius, images.radarImage);

            var radarGroup = new Group({position: [centerX, centerY]});
            radarGroup.addChild(radar);
            zr.addElement(radarTen);
            zr.addElement(radarGroup);

            var roundCount = 5;
            newRound(1);

            function newRound(currentRound) {
                zr.animate(radarGroup).when(700, {
                    rotation: [-1.2 * PI * currentRound, 0, 0]
                }).done(function () {
                    if (currentRound <= roundCount) {
                        switch (currentRound) {
                            case 1:
                                radarDots.dot1();
                                break;
                            case 3:
                                radarDots.dot2();
                                break;
                            case 5:
                                radarDots.dot3();
                                break;
                            default:
                                break;
                        }
                        newRound(currentRound + 1);
                    } else {
                        zr.delElement(radarTen);
                        zr.delElement(radarGroup);
                        radarDots.remove();
                        callback();
                    }
                }).start();
            }
        }

        var radarDots = function () {
            var dotRadius = 7;
            var dot1PositionX = centerX - 35;
            var dot1PositionY = centerY - 40;
            var dot2PositionX = centerX + 30;
            var dot2PositionY = centerY - 40;
            var dot3PositionX = centerX + 30;
            var dot3PositionY = centerY - 15;
            var radarDot1, radarDot2, radarDot3;

            return {
                dot1: function () {
                    radarDot1 = utils.getImageShape(ImageShape, CircleShape, dot1PositionX, dot1PositionY, dotRadius, images.dot1Image, 3);
                    zr.addElement(radarDot1);
                },
                dot2: function () {
                    radarDot2 = utils.getImageShape(ImageShape, CircleShape, dot2PositionX, dot2PositionY, dotRadius, images.dot2Image, 3);
                    zr.addElement(radarDot2);
                },
                dot3: function () {
                    radarDot3 = utils.getImageShape(ImageShape, CircleShape, dot3PositionX, dot3PositionY, dotRadius, images.dot3Image, 3);
                    zr.addElement(radarDot3);
                },
                remove: function () {
                    zr.delElement(radarDot1);
                    zr.delElement(radarDot2);
                    zr.delElement(radarDot3);
                }
            }
        }();

        // 雷达
    }
});
