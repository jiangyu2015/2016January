<%@tag pageEncoding="UTF-8"%>
<%@ attribute name="page" type="org.springframework.data.domain.Page" required="true"%>
<%@ attribute name="paginationSize" type="java.lang.Integer" required="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	int current =  page.getNumber() + 1;
	int begin = Math.max(1, current - paginationSize/2);
	int end = Math.min(begin + (paginationSize - 1), page.getTotalPages());
	
	request.setAttribute("current", current);
	request.setAttribute("begin", begin);
	request.setAttribute("end", end);
%>
<%if(page.getTotalPages() > 1){%>
<div class="page clearfix">
	<% if (page.hasPreviousPage()){%>
           	<a href="?page=${current-1}&page.size=${paginationSize}&sortType=${sortType}&${searchParams}" class="prev fl on">上一页</a>
     <%}else{%>
           <a href="#" class="prev fl off">上一页</a>
     <%} %>
	
	<div class="select">
		<select class="z_displayselect" onChange=javascript:window.location.href=this.options[this.selectedIndex].value>
			<c:forEach var="i" begin="${begin}" end="${end}">
				<option value="?page=${i}&page.size=${paginationSize}&sortType=${sortType}&${searchParams}" <c:if test="${current==i}">selected="selected"</c:if>>
					第${i}页
				</option>
			</c:forEach>
		</select>
	</div>
	
	<% if (page.hasNextPage()){%>
           	<a href="?page=${current+1}&page.size=${paginationSize}&sortType=${sortType}&${searchParams}" class="next fr on">下一页</a>
     <%}else{%>
           <a href="#" class="next fr off">下一页</a>
     <%} %>
</div>
<% }%>
