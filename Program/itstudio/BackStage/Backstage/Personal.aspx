<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Personal.aspx.cs" Inherits="BackStage_Backstage_Personal" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="stylesheet" type="text/css" href="static/h-ui/css/H-ui.min.css" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="div1" runat="server" >
    <!--头像写在这里-->

                   <asp:ImageButton ID="btnImage" runat="server" OnClick="btnImage_Click" />


         <asp:TextBox ID="txtemail" runat="server"  onblur="check()" ></asp:TextBox><br />
           <asp:Button ID="btnsure" CssClass="font-page" runat="server" Text="确定" OnClick="btnsure_Click"/>&nbsp;&nbsp;&nbsp;&nbsp;
           <asp:Button ID="btnchangepassword" CssClass="font-page" runat="server" Text="修改密码" OnClick="btnchangepassword_Click"/>
    </div>
          <div id="passvword1" runat="server" visible="false" >
             
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>密码：</label>
			 <asp:TextBox ID="txtPwd" runat="server" CssClass="input-text" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>       
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat ="server" ErrorMessage ="密码不能为空！" ControlToValidate ="txtPwd" ForeColor ="Red"></asp:RequiredFieldValidator>  
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>密码确认：</label>
			  <asp:TextBox ID="txtPasswordConfirm" CssClass="input-text" runat ="server" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>  
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat ="server" ErrorMessage ="密码确认不能为空！" ControlToValidate ="txtPasswordConfirm" ForeColor ="Red"></asp:RequiredFieldValidator> <br />  
             <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage ="前后密码不一致！" ControlToCompare="txtPwd" ControlToValidate="txtPasswordConfirm" ForeColor ="Red"></asp:CompareValidator> <br />
                 <asp:Button ID="btnpassword" CssClass="font-page" runat="server" Text="确定" OnClick="btnpassword_Click"/> &nbsp;&nbsp;&nbsp;&nbsp; 
               <asp:Button ID="Button1" CssClass="font-page" runat="server" Text="取消" OnClick="Button1_Click"/>
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
