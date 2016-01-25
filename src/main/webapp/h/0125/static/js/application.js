String.prototype.len = function() {
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
};
    /**
     * 在资源加载完毕之后，初始化封装方法
     */
        /** jquery插件 ************************************/
        /**
         * ajax提交验证表单
         * @param success = 提交完毕回调事件function(状态true:没有错误，false:有错误，form, json:后台返回的数据, option)
         * @param optionsTemp = 可空，参数
         */
        $.fn.ajaxForm = function(success, optionsTemp){
            var options = {
                promptPosition:"centerRight:3,1",
                addPromptClass:'formError-white',
                ajaxFormValidation: true,
                maxErrorsPerField: 1,
                onAjaxFormComplete: success,
                //只在提交的时候检查为空的输入项（不是框架原有的属性）
                onlySubmitValidRequired: true,
                ajaxFormValidationMethod: $(this).attr("method") || 'post'
            };
            var valid = this.validationEngine($.extend(options, optionsTemp));
        };
        /**
         * 发送验证码 有输入交易密码（#outPassword）的时候会自动检测交易密码是否输入
         * @param url = 请求发送交易密码的地址，可以使String也可以是返回String的function
         */
        $.fn.sendCode = function(url, dataTemp,callBack){
            var waitSec = 99;//等待时间
            var _this = this;
            this.click(function(){
                if($(this).hasClass("disable")){
                    return;
                }
                ajaxUrl = (typeof(url) == 'function') ? url() : url;
                if(ajaxUrl === false){
                    return;
                }
                if($(this).parents("form").find('#outPassword').size() && ($('#outPassword').validationEngine('validate') || !$('#outPassword').val())){
                    layer.hAlert("请输入交易密码再发送验证码", 2);
                    return;
                }
                var sendNode = $(this);
                var data = $(this).hasClass("sendVoice") ? {voice: true} : {};

                var temp = (typeof(dataTemp) == 'function') ? dataTemp(_this) : dataTemp;
                if(temp === false){
                    return;
                }
                data = $.extend(data, temp);
                $.ajax({
                    url: ajaxUrl,
                    loading: true,
                    data: data,
                    loadingText: '验证码发送中',
                    dataType: 'json',
                    type: 'POST',
                    error: function(data, transport) {
                        if(data.responseJSON){
                            this.success(data.responseJSON);
                        }else{
                            this.success(data);
                        }
                    },
                    success: validMethods.createAjaxCallback(function(status,json,form){
                        if(status){
                            _this.addClass("disable").css({"background-color": "#535553", "color": "white"});
                            countdown(waitSec, function(sec){
                                if(sendNode.get(0).nodeName == 'INPUT'){
                                    sendNode.val(sec+"秒后可重发");
                                }else{
                                    sendNode.text(sec+"秒后可重发");
                                }
                                if(!sec){
                                    _this.removeClass("disable").removeAttr("style");
                                    sendNode[sendNode.get(0).nodeName == 'INPUT'?'val':'text'](sendNode.hasClass("sendVoice") ? "语音验证码" : "发送验证码");
                                }
                            });
                            if(callBack){
                                callBack(json);
                            }
                        }else{
                            $("#codeImgShow").click();
                            //_this.parents("form").find('#outPassword').
                        }
                    }, sendNode.parents("form"))
                });
            });
        };

        /**
         * 发出ajax请求，可以解析后台返回的错误信息
         * @param url = 请求地址
         * @param callback = 回调函数function(status, data)status：boolean型，代表成功或失败，data：后台返回的数据
         * @param tempOptions = jquery ajax的设置参数，可空
         */
        $.ajaxValid = function(url, callback, tempOptions){
            var fun = validMethods.createAjaxCallback(callback);
            var options= {
                url: (typeof(url) == 'function') ? url() : url ,
                loading: true,
                dataType: 'json',
                success: fun,
                error: fun,
                type: 'POST'
            };
            $.ajax($.extend(options, tempOptions));
        };

        if(window.layer){
            /**
             * 弹出框
             * @param tit = 提示内容
             * @param ico = 图标样式 1.正确 2.错误 3.警告 4.询问
             * @param callback = 回调函数 function(true:点击了确定， false:点击了取消或关闭按钮)
             * @param isShowCancel = 是否显示取消按钮
             * @param options = 其他参数{ok: '确定按钮文字', cancel: '取消按钮文字', align: '文字对其方式center', showIco:'是否需要图标true'}
             */
            layer.hAlert = function(tit, ico, callback, isShowCancel, options){
                options = $.extend({ok:'确&nbsp;&nbsp;&nbsp;&nbsp;定', cancel:'取&nbsp;&nbsp;&nbsp;&nbsp;消', align: 'center', showIco: true}, options);
                var width = tit.length * 17 + 150;
                width = width > 600 ? 600 : width;
                if(isShowCancel){width = width < 320 ? 320 : width;}
                ico = ico ? ico : 1;
                var cancelHtml = isShowCancel ? '<a class="hxb-cancel transition" href="javascript:void(0)">' + options.cancel +'</a>' : '';
                var icoHtml = options.showIco ? '<td><div class="bkImg bkImg-' + ico + '"></div></td>' : '';
                var isError = (ico === 2 || ico === 3?'error-text':'');
                //自定义弹出框
                $.layer({
                    type: 1,
                    title: false,
                    border: [0],
                    closeBtn: false,
                    area: ['auto', 'auto'],
                    page: {html: '<div class="hxbAlert"  style="width:' + width + 'px"><div class="hxbtitlediv"><span class="tit">提示</span><span class="close-zz transition"><a class="hxb-close transition" href="javascript:void(0)">×</a></span></div><div class="context"><table><tr>' + icoHtml + '<td><p class="'+isError+'" style="text-align: ' + options.align + ';">'+ tit +'</p></td></tr></table><div class="hxbBtns"><a href="javascript:void(0)" class="hxb-ok transition">' + options.ok + '</a>' + cancelHtml + '</div></div></div>'},
                    success:function(layero){
                        var index = layero.attr("times");
                        $(".hxb-ok").focus();
                        layero.find(".hxb-close,.hxb-ok,.hxb-cancel").click(function(){
                            if(callback){
                                if(callback($(this).hasClass('hxb-ok')) === false){
                                    return;
                                }
                            }
                            layer.close(index);
                        });
                    }
                });
            };

            /**
             * 关闭弹出框，仅限弹出div框
             * @param node = 弹出框内的一个jquery元素
             */
            layer.closeWin = function(node){
                layer.close(node.parents(".xubox_layer").attr("times"));
            };

            /**
             * 询问框
             * @param tit = 提示内容
             * @param callback = function(true:点击了确定，false:点击了取消)
             */
            layer.hConfirm = function(tit, callback, options){
                layer.hAlert(tit, 4, callback, true, options);
            };

            /**
             * 在弹出框中加载一个url内容
             * @param url = 要显示内容的地址
             * @param tit = 标题提示
             */
            layer.alertUrl = function(url, tit, options){
                var optionsTemp = {
                    type:1,
                    title: tit,
                    area: ['700px', '320px'],
                    page:{url: url},
                    border: [0],
                    bgcolor: '#f1f1f1'
                };
                $.extend(optionsTemp, options);
                $.layer(optionsTemp);
            };





        }


    // ajax全局设置
    $.ajaxSetup({
        beforeSend: function () {
            //检测到loading参数则使用遮罩
            if (this.loading) {
                this.loadingIndex = layer.load(this.loadingText, 0);
            }
        },
        complete: function () {
            //如果有遮罩则关闭遮罩
            if(this.loadingIndex){
                layer.close(this.loadingIndex);
            }
        },
        cache: false
    });


//倒计时修改开始
    var map = {day:'天', hours:'时', minutes:'分', seconds:'秒'};
    $(".timer").each(function(){
        var sum;
        if($(this).attr("sum")){
            sum = parseInt($(this).attr("sum"));
        }else{
            var starDate = new Date($(this).attr("date"));
            var endDate = new Date($(this).attr("endDate"));
            sum = endDate.getTime() - starDate.getTime();
        }
        $(this).attr("sum", sum);
        changeTimeShow();
    });
    setInterval(function(){
        changeTimeShow();
    },1000);

    function changeTimeShow(){
        $(".timer").each(function(){
            var sum = parseInt($(this).attr("sum"));
            sum-=1000;
            if(sum<0){
                $(this).removeClass('timer').text("");
                return;
            }
            $(this).text(toText(getX(sum)))
                .attr("sum", sum);
        });
    }

    function toText(datex){
        var text = "";
        //$('.timer').css('color','#F90');
        for(var item in datex){
            if(datex[item] != 0 || item=='seconds' || item=='minutes'){
                if(datex[item]<10){ text += '0'+datex[item] + map[item];}
                else{text += datex[item] + map[item];}
            }
        }
        return text;
    }
    var daySum = 24/60/60/1000;
    function getX(sum){
        return {
            day: parseInt(sum/86400000),
            hours: parseInt((sum%86400000)/3600000),
            minutes: parseInt(((sum%86400000)%3600000)/60000),
            seconds: parseInt((((sum%86400000)%3600000)%60000)/1000)
        };
    }
    //倒计时修改结束


    /**
     * 倒计时函数
     * @param secs = 总倒计时时间（单位秒）
     * @param callback = 每秒回调的函数function(当前的秒数，总秒数)
     */
    window.countdown = function countdown(secs, callback){
        var countSecs = secs;
        var recursive = function(){
            callback(secs, countSecs);
            if(secs == 0){
                return;
            }
            secs --;
            setTimeout(recursive, 1000);
        };
        recursive();
    };

    function rememberMe(){
        if($.cookie("username")){
            $("#username").val($.cookie("username"));
        }
        $("#username").blur(function(){
            rememberCall();
        });
        $("#remember").click(function(){
            rememberCall();
        });
        function rememberCall(){
            var hasSeleted = $("#remember").prop("checked");
            if(hasSeleted){
                $.cookie("username",$("#username").val(),{ expires:1 });
            }else{
                $.cookie('username', '', { expires: -1 });
            }
        }
    }

function updateDiscount(num){
    var ele = $("#discount");
    if(ele.validationEngine('validate') || !ele.val()){
        ele.val("0.0");
    }
    num += parseFloat(ele.val());
    if(num < 0){
        num = 0.0;
    }else if(num > 7.5){
        num = 7.5;
    }
    ele.val(formatNum(num)).keyup();
}
function formatThousands  (num) {
    return num.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
function usernameValid(field, rules, i, options){
    var val = field.val();
    var reg = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5\da-zA-Z_]+$/;
    if(!reg.test(val)){
        return "用户名由4-15位字母，数字，汉字，下划线组成，不能以下划线和数字开头";
    }
    var len = val.len();
    if(len < 4 || len > 15){
        return "用户名由4-15位字母，数字，汉字，下划线组成，不能以下划线和数字开头";
    }
}

function validIdcard(field, rules, i, options){
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    var sId = $(field).val();
    var iSum = 0;
    var sBirthday,bool=true;
    if(!/^\d{17}(\d|x)$/i.test(sId))bool = false;
    sId=sId.replace(/x$/i,"a");
    if(aCity[parseInt(sId.substr(0,2))]==null)bool = false;
    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
    var d=new Date(sBirthday.replace(/-/g,"/"));
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))bool = false;
    for(var i = 17;i>=0;i --){
        iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
    }
    if(iSum%11!=1) bool = false;
    return bool ? true : "身份证格式不正确";
}
function formatNum(num, d){
    d = d || 1;
    num = num.toFixed(d);
    var regx = [/(?:\d|-)+(\.\d{0,1}){0,1}/, /(?:\d|-)+(\.\d{0,2}){0,1}/];
    var numText = num.toString().match(regx[d - 1]);
    if(numText){
        return formatThousands(numText[0]);
    }else{
        return '0';
    }
}
/**
 * 修复IE8下mathjs
 * @param dom
 * @param e
 */
function fixIE8Num(dom,e){
   if(window.ie==8){
        var sp = e.toString().split(".");
        if(sp.length==2&&sp[1].length>2){
            if($(dom).is("input")){
                $(dom).val(formatNum(e, 2));
            }else{
                $(dom).html(formatNum(e, 2));
            }
        }
    }
}
function parseQueryString(url){
    var obj = {};
    var start = url.indexOf("?")+1;
    var str = url.substr(start);
    var arr = str.split("&");
    for(var i = 0 ;i < arr.length;i++){
        var arr2 = arr[i].split("=");
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}
    // 页面加载完毕需要进行的操作
    $(function(){
        // 验证码图片显示和增加事件
        $("#captcha-img").click(function(){
            $(this).attr("src", window.hxb.ctx + "router/common/captcha?v=" + Math.random() + "&w=" + $(this).attr("width") + "&h=" + $(this).attr("height"));
        }).click();

        // 将类名为submit的元素单击事件为触发表单提交事件
        $(document).on("click", ".submit", function(){
            $(this).parents("form").submit();
        });
        // 输入框回车提交
        $(document).on("keyup", ".input-submit input", function(even){
            if($(this).parents("form").size()){
                if(even.keyCode == 13){
                    $(this).blur().parents("form").submit();
                }
            }
        });

        /**
         * 有ajaxAlert类的元素设置单击事件为弹出ajax加载出来的对话框
         */
        $(".ajaxAlert").click(function(){
            layer.alertUrl($(this).attr("href"), $(this).attr("title"));
            return false;
        });

        /**
         * class为hxb-tip的元素悬浮事件为弹出提示框
         */
        $("[data-tip]").hover(function(){
            var tipId = layer.tips($(this).data("tip"), $(this), {guide: 0});
            $(this).data("tipId", tipId);
        }, function(){
            layer.closeTips($(this).data("tipId"));
        });

        $(".focus").focus();

        /**
         * 给需要的a链接增加过渡效果
         */
        $(".transition").addClass("transition5").each(function(){
            $(this).find("a").addClass("transition5");
        });

        /**
         * tab页切换
         */
        $("[data-tab-head]").each(function(){
            var data = $(this).data();
            data.tabEvent = data.tabEvent ? data.tabEvent : "mousemove";
            $(data.tabHead).data(data).on(data.tabEvent, function(){
                var index = $(data.tabHead).removeClass(data.tabSelect).index(this);
                $(this).addClass(data.tabSelect);
                $(data.tabShow).hide().eq(index).show();
            });
        });
    });
