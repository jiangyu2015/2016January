<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="www.361money.com" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />


<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<title><sitemesh:title/>-全金网：高收益、定活两便、安全稳健的投资理财平台，网络投资、正规互联网金融平台.</title>
	<meta name="keywords" content="全金网，网络理财,个人理财,投资理财,P2P理财,互联网金融,投资理财,全金宝,票据理财、质押借款、融资租赁、投资理财"/>
	<meta name="description" content="全金网拥有行业领先的风险管控能力，通过科学严谨、安全高效的业务办理流程，以及高安全度、高收益率和高流动性的服务理念，在为金融投资者提供专业全面的票据理财、质押借款、融资租赁、理财投资等金融信息服务的同时最大限度的为投资者提供透明、高效的理财服务，帮助投资人实现财富更大限度的增长。"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<meta http-equiv="Cache-Control" content="no-store" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<script type="text/javascript">window.qjw={ctx:"${ctx}"};</script>
	<link type="image/x-icon" href="${ctx}/static/images/favicon.ico" rel="shortcut icon">
	<c:if test="${s:isDev()}">
	<link rel="stylesheet" href="${ctx}/static/mobile/css/normalize.css">
	<link rel="stylesheet" href="${ctx}/static/mobile/css/common.css">
	<link href="${ctx}/static/mobile/js/layer/skin/layer.css" type="text/css" rel="stylesheet"/>
	<%--<link href="${ctx}/static/mobile/js/validation/css/validationEngine.jquery.css" type="text/css" rel="stylesheet">--%>
	</c:if>
	<c:if test="${!s:isDev()}">
		<link href="${ctx}/static/mobile/css/app.css?version=<%=System.currentTimeMillis()%>" type="text/css" rel="stylesheet" />
	</c:if>
	<script type="text/javascript">
		window.qjw={ctx:"${ctx}"};
	</script>
	<c:if test="${s:isDev()}">
	<script type="text/javascript" src="${ctx}/static/mobile/js/jquery-2.1.4.min.js"></script>
	<script src="${ctx}/static/mobile/js/modernizr-2.6.2.min.js"></script>
	<script src="${ctx}/static/mobile/js/layer/layer.min.js"></script>
	<script src="${ctx}/static/mobile/js/application.js"></script>
	<script type="text/javascript" src="${ctx}/static/mobile/js/common.js"></script>
	<script src="${ctx}/static/mobile/js/validation/js/jquery.validationEngine.js"></script>
	<script src="${ctx}/static/mobile/js/validation/js/jquery.validationEngine-zh_CN.js"></script>
	<script src="${ctx}/static/mobile/js/jquery.cookie.js"></script>
	<script src="${ctx}/static/mobile/js/swipe.js"></script>
	<script src="${ctx}/static/mobile/js/jq.Slide.js"></script>
	<script src="${ctx}/static/mobile/js/math.min.js"></script>
	</c:if>
	<c:if test="${!s:isDev()}">
		<script src="${ctx}/static/mobile/js/app.js?version=<%=System.currentTimeMillis()%>" type="text/javascript"></script>
	</c:if>
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
</head>

<body>
<%@ include file="/WEB-INF/layouts/mobile/_mobile_head.jsp"%>
<sitemesh:body/>
<%@ include file="/WEB-INF/layouts/mobile/_mobile_footer.jsp"%>

<script type="text/javascript">
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "//hm.baidu.com/hm.js?920fe70dec90901a1a59f27ef727b319";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();

	if(window.menuSelect){
		$(".qj_userLeft ." + window.menuSelect).parent().addClass("on");
	} else{
		$(".qj_userLeft li:eq(0)").addClass("on");
	}
</script>
</body>
</html>