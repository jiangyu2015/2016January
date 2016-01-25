<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="www.361money.com" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
 <footer class="footer">
    <ul class="qj_userLeft">
        <li><a href="${s:investUrl()}" class="nav_index">首页</a></li>
        <%--<li><a href="${s:marginUrl()}" class="nav_financing">操盘</a></li>--%>
        <li><a href="${s:investUrl()}/finance/financeMobile.html" class="nav_invest">理财</a></li>
        <li><a href="${s:centerUrl()}/home.html" class="nav_userCenter">账户</a></li>
		<li><a href="${s:portalUrl()}/about/more.html" class="nav_more">更多</a></li>
    </ul>
</footer>
<div style="display:none">
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1255649752'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1255649752' type='text/javascript'%3E%3C/script%3E"));</script>
</div>
<%-- <script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-46357914-11']);
	_gaq.push(['_trackPageview']);
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();



</script> --%>