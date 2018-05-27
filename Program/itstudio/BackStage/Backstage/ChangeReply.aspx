<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ChangeReply.aspx.cs" Inherits="BackStage_Backstage_ChangeReply" validateRequest="false" %>

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
     <script  src="../../ueditor/ueditor.config.js" type="text/javascript"></script>
     <script  src="../../ueditor/ueditor.all.min.js" type="text/javascript"></script>
    <script type="text/javascript" charset="utf-8" src="../../ueditor/lang/zh-cn/zh-cn.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
       <div>留言回复：<br />
           <asp:TextBox ID="txtReply" runat="server" MaxLength="90" TextMode="MultiLine" Height="86px" Width="329px" ></asp:TextBox>(最多回复90字)
           <%--<%-- <script id="myEditor" type="text/plain"></script>--%>
            <%--<textarea id="myEditor" name="myEditor" runat="server" onblur="setUeditor()" style="width: 1030px; height: 250px;"></textarea>--%>
            <%-- 上面这个style这里是实例化的时候给实例化的这个容器设置宽和高，不设置的话，或默认为auto可能会造成部分显示的情况--%>
            
           <%-- <script type="text/javascript">
                var editor = new baidu.editor.ui.Editor();
                
                editor.render("<%=myEditor.ClientID%>");
            </script>--%>
        </div>
<%--<script type="text/javascript">
        function setUeditor() {
            var myEditor = document.getElementById("myEditor");
            myEditor.value = editor.getContent();//把得到的值给textarea
        }
    </script--%>
        <br />
        <asp:Button ID="BtnReply" CssClass="btn btn-success radius" runat="server" OnClick="BtnReply_Click" Text="确定" />
    </div>
    </form>
</body>
</html>
