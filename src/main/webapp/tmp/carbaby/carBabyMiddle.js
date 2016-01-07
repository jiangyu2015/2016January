/**
 * jiangyukun on 2015/12/30.
 */
define('carBabyMiddle', ['zepto', 'zrender', 'zrender/loadingEffect/Whirling', 'carBabyView', 'utils'], function ($, zrender, Whirling, carBabyView, utils) {
    return function (carBabyModel) {
        var zr = zrender.init(document.getElementById('carInfoCanvas'));
        zr.showLoading(new Whirling());

        var width = Math.ceil(zr.getWidth());
        var height = Math.ceil(zr.getHeight());
        var centerX = width / 2;

        var imageBasePath = '../img/carbaby/';
        var carImage = utils.loadImage(imageBasePath + 'car/c5-black.png');
        var radarImage = utils.loadImage(imageBasePath + 'radar.png');
        var radarTenImage = utils.loadImage(imageBasePath + 'radar-ten.png');
        var dot1Image = utils.loadImage(imageBasePath + 'dot-1.png');
        var dot2Image = utils.loadImage(imageBasePath + 'dot-2.png');
        var dot3Image = utils.loadImage(imageBasePath + 'dot-3.png');
        $(window).on('load', function () {
            zr.hideLoading();
            carBabyView({
                zr: zr,
                width: width,
                height: height,
                centerX: centerX,
                centerY: centerX,
                shapeContainer: {},
                color: {
                    baseColor1: 'rgba(0, 190, 113, 1)',
                    baseColor2: 'rgba(236, 105, 65, 1)',
                    baseColor3: 'rgba(57, 79, 141, 1)'
                },
                images: {
                    carImage: carImage,
                    radarTenImage: radarTenImage,
                    radarImage: radarImage,
                    dot1Image: dot1Image,
                    dot2Image: dot2Image,
                    dot3Image: dot3Image
                },
                carBabyModel: carBabyModel
            });
        });
    };
});
