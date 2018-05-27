<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FindPassword.aspx.cs" Inherits="BackStage_Backstage_FindPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="static/h-ui/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="static/h-ui.admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="static/h-ui.admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="lib/Hui-iconfont/1.0.8/iconfont.css" rel="stylesheet" type="text/css" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
     <div id="divfoundback1" runat="server" visible="true">
    <br />
    <table>
        <tr>
            <td>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 忘记密码页面</td>
        </tr>
        <tr>
            <td>
    
    <table>
    <tr>
        <td>
            用户名：</td>
        <td>
            <asp:TextBox ID="txtName" Width="200" CssClass="input-text size-L" runat="server"></asp:TextBox>
        </td>
    </tr>
    <tr>
        <td>
            邮箱：</td>
        <td>
            <asp:TextBox ID="txtPho" Width="200" CssClass="input-text size-L" runat="server"></asp:TextBox>                           
        </td>
        </tr>
    <tr>
        <td>
            &nbsp;</td>
        <td>
            <asp:Button ID="foundback" runat="server"  CssClass="btn btn-success radius size-L"   OnClick="BtnFound_Click" Text=" 修改密码 " />
             <asp:Button ID ="button1" runat ="server" CssClass="btn btn-default radius size-L" PostBackUrl="~/BackStage/Backstage/Login.aspx" Text="返回" />
            <asp:Button ID="question" runat="server"  CssClass="btn btn-success radius size-L"  OnClick ="Question" Text="密保问题" />
        </td>
        
           
        
    </tr>
    </table>
                </td>
            </tr>
            </table>
    
    </div>
        <div id="divfoundback2" runat="server" visible="false" >
            用户名：
            <asp:TextBox ID="username"  Width="200" CssClass="input-text size-L" runat="server" ></asp:TextBox><br />

            <asp:Button ID="step" runat="server"  CssClass="btn btn-success radius size-L"  Text="下一步"  OnClick="BtnFound_Click2" />
             <asp:Button ID ="button2" runat ="server" CssClass="btn btn-default radius size-L" PostBackUrl="~/BackStage/Backstage/Login.aspx" Text="返回" />
        </div>
        <div id="divfoundback3" runat="server" visible="false" >
            密保问题：
            <asp:Label ID="question1" CssClass="input-text size-L" runat="server" ></asp:Label><br />
            答案：
            <asp:TextBox ID="answer"  Width="200" CssClass="input-text size-L" runat="server" ></asp:TextBox><br />
            <asp:Button ID="back" runat ="server"  CssClass="btn btn-success radius size-L"  Text="确认" OnClick="BtnFound_Click3"  />
             <asp:Button ID ="button3" runat ="server" CssClass="btn btn-default radius size-L" PostBackUrl="~/BackStage/Backstage/Login.aspx" Text="返回" />
        </div>
        <div id="divfoundback4" runat="server" visible="false" >
            新密码：
               <asp:TextBox ID="txtPwd" CssClass="input-text size-L" Width="200" runat="server" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>       
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat ="server" ErrorMessage ="密码不能为空！" ControlToValidate ="txtPwd" ForeColor ="Red"></asp:RequiredFieldValidator> <br />   
            密码确认：
                <asp:TextBox ID="txtPasswordConfirm"  Width="200" CssClass="input-text size-L" runat ="server" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>  
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat ="server" ErrorMessage ="密码确认不能为空！" ControlToValidate ="txtPasswordConfirm" ForeColor ="Red"></asp:RequiredFieldValidator> <br />  
             <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage ="前后密码不一致！" ControlToCompare="txtPwd" ControlToValidate="txtPasswordConfirm" ForeColor ="Red"></asp:CompareValidator> <br />        
            <asp:Button ID="btnnewpwd" runat="server"  CssClass="btn btn-success radius size-L"  Text="点击修改" OnClick="btnnewpwd_Click" />    
    </div>
         <div id="divfoundback5" runat="server" visible="false" >
             验证码：<asp:TextBox ID="txtNumber"  Width="200" CssClass="input-text size-L" runat="server" ></asp:TextBox>
             <asp:Button ID="btnGetNumber" runat="server" OnClick="btnGetNumber_Click" Text="获取验证码" /><br />
             <asp:Button ID="btnSure"  CssClass="btn btn-success radius size-L"  runat="server" OnClick="btnSure_Click" Text="确定" />
         </div>
    </form>
</body>
</html>