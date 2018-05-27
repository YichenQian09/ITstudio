<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EventEditor.aspx.cs" Inherits="EventEditor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
      编辑大事件
         
        <br />
        <br />
        大事件内容：
        <br />
        <asp:TextBox ID="txtContent" runat="server" MaxLength="45" Width="428px"></asp:TextBox>
        （限制字数45）
        <br />
        <br />
        大事件发生时间：
         <%--日期控件--%>
<script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script> 
        <input id="txtTime" runat="server" type="text" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM'})"/>
        <br />
        <br />
        照片：
       <asp:Button runat="server" ID="btnImage" Text="添加照片" OnClick="btnImage_Click"/>
        <br />
        <asp:Image runat="server" ID="img" Visible="false" />
        <br />
        <asp:Button runat="server" ID="dimg" Text="删除照片" Visible="false" OnClick="dimg_Click"/>
        <br />
        <br />
        <asp:Button runat="server" ID="btnEditor" OnClick="btnEditor_Click" Text="编辑" />
    </div>
    </form>
</body>
</html>
