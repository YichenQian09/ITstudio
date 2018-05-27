<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EventAdd.aspx.cs" Inherits="EventAdd" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script type="text/javascript">
function layer_close(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}
</script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    添加大事件
         
        <br />
        <br />
        大事件内容：
        <br />
        <asp:TextBox ID="txtContent" runat="server" MaxLength="45" Width="567px"></asp:TextBox>
        （限制字数45）
        <br />
        <br />
        大事件发生时间：
         <%--日期控件--%>
<script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script> 
        <input runat="server" id="txtTime" type="text" class="text" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM'})"  />
        
        <br />
        <br />
        照片：
        <asp:Button runat="server" ID="Button1" Text="添加照片" OnClick="btnImage_Click" />
        <br />
        <asp:Image runat="server" ID="img" Visible="false" />
        <br />
        <asp:Button runat="server" ID="dimg" Text="删除照片" OnClick="dimg_Click" Visible="false" />
        <br />

        <br />
        <asp:Button runat="server" ID="btnAdd" OnClick="btnAdd_Click" Text="添加" />
    </div>
    </form>
</body>
</html>
