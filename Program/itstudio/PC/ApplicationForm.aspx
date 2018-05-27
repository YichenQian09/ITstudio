<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ApplicationForm.aspx.cs" Inherits="ApplicationForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>纳新报名表</title>
    <link rel="shortcut icon" href="images/icon2.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/send.css">
	<script type="text/javascript" charset="utf-8" src="js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/send.js"></script>
</head>
<body>
<%--<form id="form1" runat="server">--%>
<div class="container">
<form runat="server" id="theForm">
	<div class="formHeader">2017秋季招新报名表</div>
	<div><input runat="server" id="txtName" type="text" class="name" value="姓名" /></div>
	<div><input runat="server" id="txtGradeMajor" type="text" class="grade" value="年级/专业（例：2017药学）" /></div>
	<div><input runat="server" id="txtQQ" type="text" class="QQ" value="QQ " /></div>
	<div class="clearfix">
    <input id="txtDepart" runat="server" type="text" class="hide" hidden="hidden" />
	<div runat="server" class="department font-end">前端开发</div>
	<div runat="server" class="department departmentRight VS">程序开发</div>
	<div runat="server" class="department UI">UI设计</div>
	<div runat="server" class="department departmentRight APP">APP开发</div>
	</div>
	<div><input type="text" runat="server" id="txtTel" class="telephone" value="电话"  /></div>
	<div ><textarea name="txtIntroduction" type="text" class="introduction"  value="">个人简介(200字以内)</textarea></div>
	<div>
        <asp:Button runat="server" ID="btnSubmit" CssClass="submit"  OnClick="btnSubmit_Click"  Text="提交"/>
        <%--<a class="submit" >提交</a>--%>
       
	</div>
	
</form>
    <a class="logo" style="background-image:url(images/logo-blue.png);background-size:auto 100% ;background-repeat:no-repeat;" href="Index.aspx"></a>

</div>
<%--    </form>--%>
</body>
</html>
