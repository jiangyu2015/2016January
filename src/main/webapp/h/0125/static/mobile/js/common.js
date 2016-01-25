$(function(){
	//显示导航
	$(".icon-hamburger").click(function(){
		$('.shadeBg').show();
		$('.menu').animate({width:"50%",opacity:1},500)
	});
	//隐藏导航
	$(".shadeBg").click(function(){
		$(this).hide();
		$('.menu').animate({width:0,opacity:0},500)
	});
	
	//下拉取值
	$(".selected,.select").each(function(){
		var _this = $(this);
		_this.change(function(){
			_this.children('span').text(_this.find('option:selected').text());
		});
		//默认选中第一个option值
		_this.children('span').text(_this.find('option').eq(0).text())
	});
	
})
