<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="www.361money.com"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="basePath" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctx}/"/>
<header>
	<a href="javascript:history.go(-1);"
		class="icon-caretLeft"></a>
	<sitemesh:title />
	<!-- <a href="javascript:void(0);" class="icon-hamburger"></a> -->
	<section class="shadeBg"></section>
	<section class="menu">
		<dl>
			<dt>
				<img src="${ctx}/static/mobile/images/userImg.png" width="30" height="30" />
			</dt>
			<dd>
				<shiro:user>
					<span><shiro:principal property="username" /></span>
				</shiro:user>
				<shiro:guest>
					<c:choose>
                            <c:when test="${s:encode(qs)==''}">
							<a href="${s:siteUrl()}/login.html?service=${pageContext.request.requestURL}">请先登录</a>
							</c:when>
							<c:otherwise>
							<a href="${s:siteUrl()}/login.html?service=${pageContext.request.requestURL}?${s:encode(qs)}">请先登录</a>
							</c:otherwise>
						</c:choose>
				</shiro:guest>
			</dd>
		</dl>
		<ul>
			<li><a href="${s:portalUrl()}/center/home.html">账户资产</a></li>
			<%-- <li><a href="${s:siteUrl()}/center/margin">我的操盘</a></li> --%>
			<!-- <li><a href="">账户充值</a></li> -->
			<li><a href="${s:portalUrl()}/center/withdraw.html">我要提现</a></li>
			<li><a href="${s:portalUrl()}/center/bank.html">我的银行卡</a></li>
			<li><a href="${s:portalUrl()}/center/secure.html">账户设置</a></li>
			<shiro:user>
				<li><a href="${ctx}/logout.html">安全退出</a></li>
			</shiro:user>			
		</ul>
	</section>
</header>