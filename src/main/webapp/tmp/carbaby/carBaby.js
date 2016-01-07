/**
 * jiangyukun on 2015/12/26.
 */
+function () {
    var basePath = '../js/carbaby/';
    var zrenderPath = basePath + 'lib/zrender';
    var carBabyView = basePath + 'carBabyView';
    var beginAnimationView = basePath + 'beginAnimationView';
    var topTipView = basePath + 'topTipView';
    var bottomInfoView = basePath + 'bottomInfoView';
    var instrumentPanelView = basePath + 'instrumentPanelView';

    var sectorBaseDir = basePath + 'sector/';
    var BaseSector = sectorBaseDir + 'BaseSector';
    var Index1Sector = sectorBaseDir + 'Index1Sector';
    var Index2Sector = sectorBaseDir + 'Index2Sector';
    var utils = basePath + 'utils';

    var libBasePath = '../js/lib/';
    var underscore = libBasePath + 'underscore/underscore';
    var backbone = libBasePath + 'backbone/backbone';
    //var jquery = '../js/jquery-2.1.4.min';
    var zeptoPath = '../js/lib/cmd/zepto';
    var mobiscroll = '../js/lib/cmd/mobiscroll';
    var fastclickPath = '../js/lib/cmd/fastclick';

    //model
    var CarBabyModel = basePath + 'model/CarBabyModel';

    var carBabyMiddle = basePath + 'carBabyMiddle';
    var CarBabyTopView = basePath + 'view/CarBabyTopView';
    var EditCarInfoView = basePath + 'view/EditCarInfoView';
    require.config({
        paths: {
            'zrender': zrenderPath,
            'zrender/tool/util': zrenderPath,
            'zrender/tool/area': zrenderPath,
            'zrender/shape/Base': zrenderPath,
            'zrender/shape/Circle': zrenderPath,
            'zrender/shape/Text': zrenderPath,
            'zrender/shape/Line': zrenderPath,
            'zrender/shape/Image': zrenderPath,
            'zrender/shape/Rectangle': zrenderPath,
            'zrender/Group': zrenderPath,
            'zrender/loadingEffect/Whirling': zrenderPath,

            'beginAnimationView': beginAnimationView,
            'topTipView': topTipView,
            'bottomInfoView': bottomInfoView,
            'instrumentPanelView': instrumentPanelView,
            'carBabyView': carBabyView,
            'BaseSector': BaseSector,
            'Index1Sector': Index1Sector,
            'Index2Sector': Index2Sector,
            'utils': utils,

            //lib
            //'jquery': jquery,
            'zepto': zeptoPath,
            'mobiscroll': mobiscroll,
            'fastclick': fastclickPath,
            'underscore': underscore,
            'backbone': backbone,

            //model
            'CarBabyModel': CarBabyModel,
            'CarBabyTopView': CarBabyTopView,
            'carBabyMiddle': carBabyMiddle,
            'EditCarInfoView': EditCarInfoView
        }
    });

    require(['require', 'zepto', 'mobiscroll', 'fastclick', 'backbone', 'CarBabyModel', 'CarBabyTopView', 'carBabyMiddle', 'EditCarInfoView'], function (require) {
        var $ = require('zepto');
        var mobiscroll = require('mobiscroll');
        var fastclick = require('fastclick');
        var Backbone = require('backbone');
        var CarBabyModel = require('CarBabyModel');
        var CarBabyTopView = require('CarBabyTopView');
        var carBabyMiddle = require('carBabyMiddle');
        var EditCarInfoView = require('EditCarInfoView');

        var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > 0;

        var $carInfoCanvas = $('#carInfoCanvas');
        adaptHeight();
        fastclick.attach(document.body);

        var editCarInfoView;
        var carBabyModel = new CarBabyModel();
        var $pageContainer = $('#pageContainer'), $page1 = $('#page1');

        var PageRoute = Backbone.Router.extend({
            routes: {
                '': 'index',
                'edit': 'edit'
            },
            index: function () {
                if (editCarInfoView) {
                    $pageContainer.removeClass('page-container');
                    $page1.removeClass('page');
                    if (isAndroid) {
                        $page1.removeClass('hidden');
                    }
                    editCarInfoView.destroy(function () {
                        carBabyModel.fetch();
                    });
                }
            },
            edit: function () {
                function showEdit() {
                    editCarInfoView = new EditCarInfoView({model: carBabyModel});
                    $pageContainer.append(editCarInfoView.el);
                }

                $pageContainer.addClass('page-container');
                $page1.addClass('page');
                if (isAndroid) {
                    setTimeout(function () {
                        $page1.addClass('hidden');
                        showEdit();
                        /*setTimeout(function () {
                         }, 200);*/
                    }, 0);
                } else {
                    showEdit();
                }
            }
        });
        var pageRoute = new PageRoute();

        Backbone.history.start();

        var carBabyTopView = new CarBabyTopView({model: carBabyModel});
        carBabyTopView.on('toPage', function () {
            pageRoute.navigate('edit', true);
        });
        carBabyModel.fetch();

        carBabyMiddle(carBabyModel);

        function adaptHeight() {
            var width = $carInfoCanvas.width();
            var height = width + 30;
            $carInfoCanvas.css('height', height);
        }
    });
}();
