<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="s" uri="www.361money.com" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="basePath" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctx}/"/>
<div class="top_bar">
            <div class="w1200">
                <div class="welcome">财富热线:400-1000-361 全金网欢迎您！</div>
                <div class="user_bar">
                    <ul>
						<shiro:user>
							<li class="login_after"><span><shiro:principal property="username"/></span><a href="${s:siteUrl()}/logout.html">退出</a></li>
							<li class="userName"><a href="${s:centerUrl()}/home.html">我的账户</a></li>
						</shiro:user>
						<shiro:guest>
						<c:choose>
                            <c:when test="${s:encode(qs)==''}">
								<%--<li><a href="${s:ssoUrl()}/login.do?service=${pageContext.request.requestURL}">登录</a></li>--%>
								<li><a href="${s:siteUrl()}/login.html?service=${pageContext.request.requestURL}">登录</a></li>
							</c:when>
							<c:otherwise>
							<li><a href="${s:siteUrl()}/login.html">登录</a></li>
							</c:otherwise>
						</c:choose>
							<li><a href="${s:portalUrl()}/register.html">注册</a></li>
						</shiro:guest>
                    </ul>
                </div>
            </div>
        </div>
        <div class="menu">
        	<div class="w1200">
            	<a href="${s:siteUrl()}" class="logo"></a>
                <ul class="nav">
                	<li id="home"><a href="${s:siteUrl()}">首页</a></li>
                	<%--<li id="margin"><a href="${s:marginUrl()}">操盘</a></li>--%>
					<li id="current"><a href="${s:investUrl()}/finance/current.html">活期理财</a></li>
					<li id="regularly"><a href="${s:investUrl()}/finance/regularly.html">定期理财</a></li>
                	<li id="userCenter" ${fn:contains(pageContext.request.requestURL,s:centerUrl()) ?'class="on"':''} ><a href="${s:centerUrl()}/home.html">用户中心</a></li>
                	<li id="about"  ${fn:contains(pageContext.request.requestURL,'/about') ?'class="on"':''} ><a href="${s:portalUrl()}/about.html">关于我们</a></li>
                </ul>
            </div>
        </div>

