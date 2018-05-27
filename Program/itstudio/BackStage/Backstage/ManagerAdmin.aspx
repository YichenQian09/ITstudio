<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ManagerAdmin.aspx.cs" Inherits="BackStage_Backstage_ManagerAdmin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
     <link rel="stylesheet" type="text/css" href="static/h-ui/css/H-ui.min.css" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="email1" runat="server" visible="false" >
            <asp:TextBox ID="txtemail" runat="server"  onblur="check()" ></asp:TextBox>
            <asp:Button ID="btnemail" CssClass="font-page" runat="server" Text="确定" OnClick="btnemail_Click" />
        </div>
        <div id="password1" runat="server" visible="false" >
             
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>密码：</label>
			 <asp:TextBox ID="txtPwd" runat="server" CssClass="input-text" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>       
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat ="server" ErrorMessage ="密码不能为空！" ControlToValidate ="txtPwd" ForeColor ="Red"></asp:RequiredFieldValidator>  
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>密码确认：</label>
			  <asp:TextBox ID="txtPasswordConfirm" CssClass="input-text" runat ="server" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>  
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat ="server" ErrorMessage ="密码确认不能为空！" ControlToValidate ="txtPasswordConfirm" ForeColor ="Red"></asp:RequiredFieldValidator> <br />  
             <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage ="前后密码不一致！" ControlToCompare="txtPwd" ControlToValidate="txtPasswordConfirm" ForeColor ="Red"></asp:CompareValidator> <br />
                 <asp:Button ID="btnpassword" CssClass="font-page" runat="server" Text="确定" OnClick="btnpassword_Click" />
        </div>
        <div id="photo1" runat="server" visible="false" >
           <asp:ImageButton ID="btnImage" runat="server" OnClick="btnImage_Click" />
            <asp:Button ID="editorImage" runat="server" OnClick="editorImage_Click" />
        </div>
        <asp:Button ID="email" CssClass="font-page" runat="server" Text="修改邮箱" OnClick="email_Click" />&nbsp;&nbsp;&nbsp;&nbsp;
          <asp:Button ID="password" CssClass="font-page" runat="server" Text="修改密码" OnClick="password_Click"/>&nbsp;&nbsp;&nbsp;&nbsp;
          <asp:Button ID="changePhoto" CssClass="font-page" runat="server" Text="修改头像" OnClick="changePhoto_Click"/>
    </div>
    </form>
    <script type="text/javascript">
    function check() {
        var temp = document.getElementById("txtmailbox").value;
        var aaa = document.getElementById("txtmailbox");
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(temp)) {
            alert('提示\n\n请输入有效的E_mail！');
            aaa.value = "";
            myreg.focus();
        }
    }
</script>
</body>
</html>
