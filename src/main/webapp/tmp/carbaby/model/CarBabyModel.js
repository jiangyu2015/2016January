/**
 * jiangyukun on 2015/12/30.
 */
define('CarBabyModel', ['backbone'], function (Backbone) {
    var openid = $.sas.util.getUrlParam("openid");
//	alert("转发后的openid00:"+openid);
    function getSex(sex) {
        return sex === '1' ? '王子' : '公主';
    }

    function getOilWear(value) {
        if (!value) {
            return '暂无数据';
        }
        return getFloat(value) + 'KM/L';
    }

    function getMileage(value) {
        if (!value) {
            return '暂无数据';
        }
        return getFloat(value / 10000) + '万公里';
    }

    function getCost(value) {
        if (!value) {
            return '暂无数据';
        }
        return getFloat(value) + '元';
    }

    function getColor(value) {
        return value;
    }

    function getTitles(title) {
        var titles = [];
        if (!title) {
            return;
        }
        if (title.mapDistance && title.mapDistance.titleDistance) {
            titles.push(title.mapDistance.titleDistance);
        }
        if (title.mapMoney && title.mapMoney.titleMoney) {
            titles.push(title.mapMoney.titleMoney);
        }
        if (title.mapTitle && title.mapTitle.titleFule) {
            titles.push(title.mapTitle.titleFule);
        }
        return titles;
    }

    function getShareContent(title) {
        var titles = [];
        if (!title) {
            return;
        }
        if (title.mapDistance && title.mapDistance.shareContent) {
            titles.push(title.mapDistance.shareContent);
        }
        if (title.mapMoney && title.mapMoney.shareContent) {
            titles.push(title.mapMoney.shareContent);
        }
        if (title.mapTitle && title.mapTitle.shareContent) {
            titles.push(title.mapTitle.shareContent);
        }
        return titles;
    }


    function getFloat(str) {
        try {
            var value_t = parseFloat(str);
            if (value_t >= 1000) {
                return parseInt(value_t);
            }
            return parseInt(value_t * 100) / 100;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    return Backbone.Model.extend({
        idAttribute: 'vinCode',
        url: '../../carbaby/initCarBabyInfo.do?openid=' + openid,
        defaults: {
            headImgUrl: '',
            nickName: '',
            sex: '',
            birthday: '',
            age: '',
            color: '',
            description: '',
            vinCode: ''
        },
        validate: function () {
        },
        parse: function (result) {
            if (!result.baseInfo) { // 保存以后返回值
                return result;
            }
            console.log(result);
            try {
                carMain.initPage(result);
                console.log(result);
                weixin.config({
                    debug: false,
                    jsApiList: ['onMenuShareTimeline', 'hideOptionMenu', 'hideMenuItems', 'showOptionMenu', 'closeWindow', 'onMenuShareAppMessage', 'getNetworkType']
                });
                weixin.ready(function () {
                    var openid = $.cookie('openid');
                    var vinCode = $.cookie('vinCode');
//                alert(vinCode);

                    wx.onMenuShareTimeline({
                        title: getShareContent(result.title).length == 0 ? "我家" + result.baseInfo.nikeName + "有专属档案了，你家车宝呢？" : getShareContent(result.title)[0], // 分享描述
                        link: 'http://test.ttsales.cn/ttsales-wechat-car/car/html/carBabyShared.html?openid=' + openid + "&vinCode=" + vinCode, // 分享链接
                        imgUrl: result.baseInfo.headPicUrl, // 分享图标
                        success: function () {
                            alert("确认分享");
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            alert("取消分享");
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    /*分享给朋友*/
                    weixin.onShareAppMessage({
                        title: result.baseInfo.userNickName + '的车宝宝', // 分享标题
                        desc: getShareContent(result.title).length == 0 ? "我家" + result.baseInfo.nikeName + "有专属档案了，你家车宝呢？" : getShareContent(result.title)[0], // 分享描述
                        link: 'http://test.ttsales.cn/ttsales-wechat-car/car/html/carBabyShared.html?openid=' + openid + "&vinCode=" + vinCode, // 分享链接
                        imgUrl: result.baseInfo.headPicUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            alert("确认分享");
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            alert("取消分享");
                            // 用户取消分享后执行的回调函数
                        }
                    });
//                
//                wx.onMenuShareQQ({
//                    title: result.baseInfo.nikeName+'的车宝宝', // 分享标题
//                    desc: getShareContent(result.title).length==0?"我的车宝宝":getShareContent(result.title)[0], // 分享描述
//                    link: 'http://test.ttsales.cn/ttsales-wechat-car/car/html/carBabyShared.html?openid=' + openid, // 分享链接
//                    imgUrl: result.baseInfo.headPicUrl, // 分享图标
//                    success: function () {
//                    	 alert("确认分享");
//                       // 用户确认分享后执行的回调函数
//                    },
//                    cancel: function () { 
//                    	 alert("取消分享");
//                       // 用户取消分享后执行的回调函数
//                    }
//                });


                });
            } catch (e) {
                console.log(e);
            }
            // 转换车的信息
            //console.log(result);
            var baseInfo = result.baseInfo;
            var compareFlue = result.compareFlue;
            var compareDistancd = result.compareDistancd;
            var compareMoney = result.compareMoney;

            var carInfo = {};
            carInfo.age = baseInfo.carAge + '岁';
            carInfo.birthday = baseInfo.buyDate;
            carInfo.headImgUrl = baseInfo.headPicUrl;
            carInfo.nickName = baseInfo.nikeName;
            carInfo.description = baseInfo.personality;
            carInfo.sex = getSex(baseInfo.sex);
            carInfo.color = getColor(baseInfo.carColor);
            carInfo.vinCode = baseInfo.vinCode;
            carInfo.titles = getTitles(result.title);

            //油耗
            carInfo.oilWear = {
                averageValue: getOilWear(compareFlue.avgFlue),
                myValue: getOilWear(compareFlue.myFlue),
                average: getFloat(compareFlue.avgFlue),
                my: getFloat(compareFlue.myFlue)
            };

            // 里程
            carInfo.mileage = {
                averageValue: getMileage(compareDistancd.avgDistance),
                myValue: getMileage(compareDistancd.myDistance),
                average: getFloat(compareDistancd.avgDistance),
                my: getFloat(compareDistancd.myDistance)
            };

            // 费用
            carInfo.cost = {
                averageValue: getCost(compareMoney.avgMoney),
                myValue: getCost(compareMoney.myMoney),
                average: getFloat(compareMoney.avgMoney),
                my: getFloat(compareMoney.myMoney)
            };
            return carInfo;
        }
    });
});
