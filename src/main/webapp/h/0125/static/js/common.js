$(function(){
	//二维码
    $(".wx_icon").hover(function(){
        var $this = $(this);
        t = setTimeout(function(){
            $this.css("overflow","visible").children('img').stop(false, true).animate({left:-70,opacity:1},500);
        },300);
    },function(){
        var $this = $(this);
        $this.children('img').stop(false, true).animate({left:-100,opacity:0},500,function(){
            $this.css("overflow","hidden");
        });
        clearTimeout(t);
    });

//进度条动画
    function loadAnimate(){
        //animate-icon
        var $module = $('.load');
        $module.each(function(){
            var $this = $(this),
                top = $this.offset().top,
                bottom = $this.offset().top+$this.outerHeight(true),
                srollPos = $(window).scrollTop(),
                windowHeight = $(window).height();

            if( (top >= srollPos && top < ( srollPos+windowHeight ) ) || bottom >= srollPos && bottom < ( srollPos+windowHeight ) ){
                //进度条
                var $current = $this.find(".loadBar");
                var $percent = $this.text();
                var $parseInt = parseInt($percent,10);
                $current.animate({"width":$parseInt + '%'},500);
            }
        });
    }

    //返回头部
    if($(window).scrollTop()>200){
        $(".returnTop").show();
    }
    $(window).scroll(function(){
        if ($(window).scrollTop()>200){
            $(".returnTop").fadeIn(500);
        }
        else
        {
            $(".returnTop").fadeOut(500);
        }
        loadAnimate();
    });



    $(".goTop").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });

    loadAnimate();

});
