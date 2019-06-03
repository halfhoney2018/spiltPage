<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    System.out.println("当前页：" + request.getParameter("cp"));
    System.out.println("每页显示数据量：" + request.getParameter("ls"));
%>
{"allRecorders" : 327}