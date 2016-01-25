<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.kkfinance.qjw.utils.FormatUtils"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
    <meta name="keywords" content="全金网，网络理财,个人理财,投资理财,P2P理财,互联网金融,投资理财,全金宝,票据理财、质押借款、融资租赁、投资理财"/>
    <meta name="description" content="全金网拥有行业领先的风险管控能力，通过科学严谨、安全高效的业务办理流程，以及高安全度、高收益率和高流动性的服务理念，在为金融投资者提供专业全面的票据理财、质押借款、融资租赁、理财投资等金融信息服务的同时最大限度的为投资者提供透明、高效的理财服务，帮助投资人实现财富更大限度的增长。"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <link type="image/x-icon" href="${ctx}/static/images/favicon.ico" rel="shortcut icon">
    <c:if test="${s:isDev()}">
    <link href="${ctx}/static/styles/normalize.css" type="text/css" rel="stylesheet" />
    <link href="${ctx}/static/styles/common.css" type="text/css" rel="stylesheet" />
    <link href="${ctx}/static/js/jquery-validation/1.11.1/validate.css" type="text/css" rel="stylesheet" />
    <link href="${ctx}/static/js/validation/css/validationEngine.jquery.css" type="text/css" rel="stylesheet">
    <link href="${ctx}/static/js/layer/skin/layer.css" type="text/css" rel="stylesheet"/>
    </c:if>
	<c:if test="${!s:isDev()}">
        <link href="${ctx}/static/styles/app.css?version=<%=System.currentTimeMillis()%>" type="text/css"
              rel="stylesheet"/>
	</c:if>
    <script type="text/javascript">
        window.qjw={ctx:"${ctx}"};
    </script>
    <c:if test="${s:isDev()}">
    <script src="${ctx}/static/js/jquery/modernizr-2.6.2.min.js" type="text/javascript"></script>
    <script src="${ctx}/static/js/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="${ctx}/static/js/validation/js/jquery.validationEngine.js"></script>
    <script src="${ctx}/static/js/validation/js/jquery.validationEngine-zh_CN.js"></script>
    <script src="${ctx}/static/js/jquery.cookie.js"></script>
    <script src="${ctx}/static/js/layer/layer.min.js"></script>
    <script src="${ctx}/static/js/math.min.js"></script>
    <script src="${ctx}/static/js/application.js"></script>
    <script src="${ctx}/static/js/common.js" type="text/javascript"></script>
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
    <div class="userCenter">
        <div class="clearfix w1200">
            <div class="userLeft">
                <h1>个人中心<br/><span>Personal Center</span></h1>
                <%--<div class="operateBtn round3">--%>
                    <%--<a href="${ctx}/center/recharge" class="rechargeBtn">充值</a>--%>
                    <%--<a href="${ctx}/center/withdraw" class="withdrawBtn">提现</a>--%>
                <%--</div>--%>
                <div class="c_menu">
                    <h2 class="i_03">我的账户</h2>
                    <ul>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/home')}">class="on" </c:if>><a href="${ctx}/center/home.html">账户总览</a></li>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/moneyRecord/rechargeAndWithdraw')}">class="on" </c:if>><a href="${ctx}/center/moneyRecord/rechargeAndWithdraw.html">充值提现</a></li>
                        <li <c:if test="${pageContext.request.servletPath=='/center/moneyRecord'}">class="on" </c:if>><a href="${ctx}/center/moneyRecord.html">资金明细</a></li>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/secure')}">class="on" </c:if>><a href="${ctx}/center/secure.html">安全认证</a></li>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/bank')}">class="on" </c:if>><a href="${ctx}/center/bank.html">我的银行卡</a></li>
                    </ul>
                    <h2 class="i_01">操盘信息</h2>
                    <ul>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/margin')}">class="on" </c:if>><a href="${ctx}/center/margin.html">我的操盘</a></li>
                        <li id="broker" <c:if test="${fn:contains(pageContext.request.requestURL,'center/middleman')}">class="on" </c:if>><a href="${ctx}/center/middleman.html">我是居间商</a></li>
                    </ul>
                    <h2 class="i_02">理财信息</h2>
                    <ul>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/finance/current')}">class="on" </c:if>><a href="${ctx}/center/finance/current.html">活期理财</a></li>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/finance/regularly')}">class="on" </c:if>><a href="${ctx}/center/finance/regularly.html">定期理财</a></li>
                    </ul>
                    <h2 class="i_05">我的优惠券</h2>
                    <ul>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/coupons')}">class="on" </c:if>><a href="${s:portalUrl()}/center/coupons.html">我的优惠券</a></li>
                    </ul>
                    <h2 class="i_06">我的推荐</h2>
                    <ul>
                        <li <c:if test="${fn:contains(pageContext.request.requestURL,'center/recommend/recommend')}">class="on" </c:if>><a href="${s:portalUrl()}/center/recommend/recommend.html">我的推荐</a></li>
                    </ul>
                </div>
            </div>
            <div class="userRight">
                <sitemesh:body/>
            </div>
        </div>
    </div>
</div>
    <div class="foot">
        <%@ include file="/WEB-INF/layouts/footer.jsp"%>
    </div><!-- //foot -->
</div><!-- //wrap -->
<!-- 右侧菜单//beign -->
<div class="rightNav">
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
        <li class="round3">
            <a href="javascript:void(0);" class="goTop">
                <img src="${ctx}/static/images/rightNav_img04.png" width="33" height="33" />
                <span>TOP</span>
            </a>
        </li>
    </ul>
</div>

<script>
    var type = "<shiro:principal property="type"/>";
    if(type!="broker"){
        $("#broker").remove();
    }
    $(function(){
        //获取用户中心左侧高度
        var h1 = $(".userLeft").parent().height();
        //$(".userLeft").height(h1-74);
    })
</script>
</body>
</html>