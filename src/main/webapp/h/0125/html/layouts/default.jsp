<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="www.361money.com" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><sitemesh:title/>-全金网：高收益、定活两便、安全稳健的投资理财平台，网络投资、正规互联网金融平台.</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="keywords" content="全金网，网络理财,个人理财,投资理财,P2P理财,互联网金融,投资理财,全金宝,票据理财、质押借款、融资租赁、投资理财"/>
<meta name="description" content="全金网拥有行业领先的风险管控能力，通过科学严谨、安全高效的业务办理流程，以及高安全度、高收益率和高流动性的服务理念，在为金融投资者提供专业全面的票据理财、质押借款、融资租赁、理财投资等金融信息服务的同时最大限度的为投资者提供透明、高效的理财服务，帮助投资人实现财富更大限度的增长。"/>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<c:if test="${s:isDev()}">
<link type="image/x-icon" href="${ctx}/static/images/favicon.ico" rel="shortcut icon">
<link href="${ctx}/static/styles/normalize.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/static/styles/common.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/static/js/jquery-validation/1.11.1/validate.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/static/js/validation/css/validationEngine.jquery.css" type="text/css" rel="stylesheet">
<link href="${ctx}/static/js/layer/skin/layer.css" type="text/css" rel="stylesheet"/>
</c:if>
<c:if test="${!s:isDev()}">
	<link href="${ctx}/static/styles/app.css?version=<%=System.currentTimeMillis()%>" type="text/css" rel="stylesheet"/>
</c:if>
<script type="text/javascript">
	window.qjw={ctx:"${ctx}"};
</script>
<c:if test="${s:isDev()}">
<script src="${ctx}/static/js/jquery/modernizr-2.6.2.min.js" type="text/javascript"></script>
<script src="${ctx}/static/js/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="${ctx}/static/js/layer/layer.min.js"></script>
<script src="${ctx}/static/js/validation/js/jquery.validationEngine.js"></script>
<script src="${ctx}/static/js/validation/js/jquery.validationEngine-zh_CN.js"></script>
<script src="${ctx}/static/js/jquery.cookie.js"></script>
<script src="${ctx}/static/js/math.min.js"></script>
<script src="${ctx}/static/js/application.js"></script>
<script src="${ctx}/static/js/common.js" type="text/javascript"></script>
<script src="${ctx}/static/js/jquery.slides.min.js"></script>
<script src="${ctx}/static/js/jq.Slide.js"></script>
</c:if>
<c:if test="${!s:isDev()}">
	<script src="${ctx}/static/js/app.js?version=<%=System.currentTimeMillis()%>" type="text/javascript"></script>
</c:if>
<!--[if IE 8]>
<script type="text/javascript" src="${ctx}/static/js/es5-shim.min.js"></script>
<script type="text/javascript" src="${ctx}/static/js/es5-sham.min.js"></script>
	<script type="text/javascript">
		window.ie=8;
	</script>
<![endif]-->
	<!--[if lt IE 10]>
	<script src="${ctx}/static/js/placeholder/jquery.placeholder.min.js"></script>
	<![endif]-->
	<script>


		var obj = parseQueryString(window.location.search);
		var cookietime = new Date();
		cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000 * 24));
		if(obj.channel){
			$.cookie("channel",obj.channel,{expires:cookietime,path:'/',domain:"361money.com"})
		}
		if(obj.invite){
			$.cookie("invite",obj.invite,{expires:cookietime,path:'/',domain:"361money.com"})
		}

		var domain = document.domain.split(".");
		var broker = domain[0];
		if(domain.length==3&&broker!="www"&&broker.length>3){
			$.cookie("broker", broker, {expires: cookietime, path: '/',domain:"361money.com"});
		}

	</script>
<sitemesh:head/>
	<script>
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?920fe70dec90901a1a59f27ef727b319";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	</script>

</head>

<body>

<div class="wrap">
	<div class="head">
		<%@ include file="/WEB-INF/layouts/header.jsp"%>
	</div><!-- //head -->
	<div class="main">
		<sitemesh:body/>
	</div><!-- //main -->
	<div class="foot">
		<%@ include file="/WEB-INF/layouts/footer.jsp"%>
	</div><!-- //foot -->
</div><!-- //wrap -->
<!-- 右侧菜单//beign -->
<div class="rightNav">
	<ul>
		<li>
			<a href="javascript:void(0);" class="right_wx">
				<img src="${ctx}/static/images/rightNav_wx.png" width="50" height="50" />
				<div class="hidden-show"><img src="${ctx}/static/images/wx.png" width="104" height="105" /></div>
			</a>
		</li>
		<li>
			<a href="javascript:void(0);" class="right_tel">
				<img src="${ctx}/static/images/rightNav_tel.png" width="50" height="50" />
				<span></span>
				<div class="hidden-show">400-1000-361</div>
			</a>
		</li>
		<li>
			<a href="javascript:void(0);" class="right_qq" onclick="return openChat(this) " lim_company="520196">
				<img src="${ctx}/static/images/rightNav_qq.png" width="50" height="50" />
				<div class="hidden-show">在线客服</div>
			</a>
		</li>
		<li class="returnTop">
			<a href="javascript:void(0);" class="goTop">
				<img src="${ctx}/static/images/rightNav_top.png" width="50" height="50" />
			</a>
		</li>
	</ul>
</div>
<%--<div class="rightNav">
	<ul>
		<li class="round3">
			<a href="javascript:void(0);" onclick="return openChat(this) " lim_company="520196">
				<img src="${ctx}/static/images/rightNav_img01.png" width="33" height="33" />
				<span>在线客服</span>
			</a>
		</li>
		<li class="round3">
			<a href="javascript:void(0);" class="right_navCard">
				<img src="${ctx}/static/images/rightNav_img02.png" width="33" height="33" />
				<span>关注我们</span>
				<img class="rightCode" src="${ctx}/static/images/code.png" width="132" height="120" />
			</a>
		</li>
		<li class="round3">
			<a href="javascript:void(0);" class="right_navPhone">
				<img src="${ctx}/static/images/rightNav_img03.png" width="33" height="33" />
				<span>服务热线</span>
				<img class="rightPhone" src="${ctx}/static/images/telPhone.png" width="132" height="35"/>
			</a>
		</li>
		<li class="round3 returnTop">
			<a href="javascript:void(0);" class="goTop">
				<img src="${ctx}/static/images/rightNav_img04.png" width="33" height="33" />
				<span>TOP</span>
			</a>
		</li>
	</ul>
</div>--%>

</body>
</html>