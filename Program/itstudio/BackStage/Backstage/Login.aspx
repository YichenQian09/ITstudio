<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="BackStage_Backstage_Login" validateRequest="false" %>

<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link href="static/h-ui/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="static/h-ui.admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="static/h-ui.admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="lib/Hui-iconfont/1.0.8/iconfont.css" rel="stylesheet" type="text/css" />
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>爱特工作室后台登录</title>
<meta name="keywords" content="H-ui.admin 3.0,H-ui网站后台模版,后台模版下载,后台管理系统模版,HTML后台模版下载">
<meta name="description" content="H-ui.admin 3.0，是一款由国人开发的轻量级扁平化网站后台模板，完全免费开源的网站后台管理系统模版，适合中小型CMS后台系统。">
        <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js">
</script>
  <script type="text/javascript">

      document.ready=function () {
             //判断登录页面是否在iframe中
             if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                  parent.location.reload();//父页面重新加载
             }
             if ($("#passWord").val()!= "密码" &&$("#passWord").val()!= "")
             {
                 $("#passWord").attr("type", "password");
             }
      
         };
     </script>
   
</head>
<body>
<input type="hidden" id="TenantId" name="TenantId" value="" />
<div class="header"></div>
<div class="loginWraper">
  <div id="loginform" class="loginBox">
    <form class="form form-horizontal" defaultbutton="BtnLogin" method="post" runat="server" >
      <div class="row cl">
        <label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60d;</i></label>
        <div class="formControls col-xs-8">
          <%--<input id="" name="" type="text" placeholder="账户" class="input-text size-L">--%>
            <asp:TextBox id="publickey" runat="server" style="display:none;"></asp:TextBox>
              <asp:TextBox ID="userName" runat="server" CssClass="input-text size-L" Text="账号" onfocus="if(this.value=='账号'){this.value='';}" onblur="if(this.value==''){this.value='账号'}" ></asp:TextBox>
        </div>
      </div>
      <div class="row cl">
        <label class="form-label col-xs-3"><i class="Hui-iconfont">&#xe60e;</i></label>
        <div class="formControls col-xs-8">
          <%--<input id="" name="" type="password" placeholder="密码" class="input-text size-L">--%>
              <asp:TextBox ID="passWord" runat="server" CssClass="input-text size-L" Text="密码"></asp:TextBox>
        </div>
      </div>
      <div class="row cl">
        <div class="formControls col-xs-8 col-xs-offset-3">
             <asp:TextBox ID="TextBox1" runat="server" CssClass="input-text size-L" Text="验证码" onfocus="if(this.value=='验证码'){this.value='';}" onblur="if(this.value==''){this.value='验证码:'}" Width="150" onkeyup="this.value=this.value.replace(/\D/g,'')"></asp:TextBox>
          <%--<input class="input-text size-L" type="text" placeholder="验证码" onblur="if(this.value==''){this.value='验证码:'}" onclick="if(this.value=='验证码:'){this.value='';}" value="验证码:" style="width:150px;">--%>
           <img src="png.aspx" id="img" onclick="f_refreshtype()" width="120" height="40" /> <a id="kanbuq" onclick="f_refreshtype()" >看不清，换一张</a> </div>
      </div>
      <div class="row cl">
        <div class="formControls col-xs-8 col-xs-offset-3">
          <label for="online">
              <asp:CheckBox ID="checkRemember" runat="server" />记住用户密码
          <%--  <input type="checkbox" runat="server" name="online" id="online" value="">
            记住用户密码 --%>
              </label>
        </div>
      </div>
      <div class="row cl">
        <div class="formControls col-xs-8 col-xs-offset-3">

             <asp:Button ID="BtnLogin" runat="server" CssClass="btn btn-success radius size-L" OnClick="BtnLogin_Click" Text="登录" UseSubmitBehavior="False" />
            <asp:Button ID="BtnForget" runat="server" CssClass="btn btn-default radius size-L" PostBackUrl="~/BackStage/Backstage/FindPassword.aspx" Text="忘记密码" />
        </div>
      </div>
    </form>
  </div>
</div>
<div class="footer">爱特工作室 <a href="http://www.mycodes.net/" target="_blank"></a></div>
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script>
     <script type="text/javascript">
        //点击切换验证码
        function f_refreshtype() {
            var Image1 = document.getElementById("img");
            if (Image1 != null) {
                Image1.src = Image1.src + "?";
            }
        } 
    </script>
    <script type="text/javascript">
        $("#passWord").focus(function(){
            $("#passWord").attr("type","password");
            if(this.value=="密码")
                $(this).val("");
        })
        $("#passWord").focus(function () {
            $("#passWord").attr("type", "password");
            if (this.value != "密码"&&this.value !="")
                $(this).val("");
        })
        $("#passWord").blur(function(){
            if($(this).val()=="")
                $(this).val("密码").attr("type","text");})
    </script>
    
     <%--   <script type="text/javascript">
             document.ready= function () {
                 if ($("#passWord").val()!= "密码" &&$("#passWord").val()!= "")
                 { $("#passWord").attr("type", "password");
                 }}
    </script>--%>
</body>
</html>
