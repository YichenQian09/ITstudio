<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Admin-role-add.aspx.cs" Inherits="BackStage_Backstage_Admin_role_add" %>

<!--_meta 作为公共模版分离出去-->
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="Bookmark" href="/favicon.ico" >
<link rel="Shortcut Icon" href="/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="static/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->

<title>新建网站角色 - 管理员管理 - H-ui.admin 3.0</title>
<meta name="keywords" content="H-ui.admin 3.0,H-ui网站后台模版,后台模版下载,后台管理系统模版,HTML后台模版下载">
<meta name="description" content="H-ui.admin 3.0，是一款由国人开发的轻量级扁平化网站后台模板，完全免费开源的网站后台管理系统模版，适合中小型CMS后台系统。">
</head>
<body>
<article class="page-container">
	<form action="" method="post" class="form form-horizontal" id="form_admin_role_add" runat="server" >
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>用户名：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<asp:TextBox ID="txtusername" runat="server" CssClass="input-text" ></asp:TextBox>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat ="server" ErrorMessage ="用户名不能为空！" ControlToValidate ="txtusername" ForeColor ="Red"></asp:RequiredFieldValidator>
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>密码：</label>
			<div class="formControls col-xs-8 col-sm-9">
			 <asp:TextBox ID="txtPwd" runat="server" CssClass="input-text" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>       
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat ="server" ErrorMessage ="密码不能为空！" ControlToValidate ="txtPwd" ForeColor ="Red"></asp:RequiredFieldValidator>           
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>密码确认：</label>
			<div class="formControls col-xs-8 col-sm-9">
			  <asp:TextBox ID="txtPasswordConfirm" CssClass="input-text" runat ="server" TextMode="Password"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></asp:TextBox>  
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat ="server" ErrorMessage ="密码确认不能为空！" ControlToValidate ="txtPasswordConfirm" ForeColor ="Red"></asp:RequiredFieldValidator> <br />  
             <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage ="前后密码不一致！" ControlToCompare="txtPwd" ControlToValidate="txtPasswordConfirm" ForeColor ="Red"></asp:CompareValidator> <br />            
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>邮箱：</label>
			<div class="formControls col-xs-8 col-sm-9">
				   <asp:TextBox ID ="txtmailbox" CssClass="input-text" TextMode="Email" runat ="server" onblur="check()"  ></asp:TextBox>
                 <asp:RequiredFieldValidator ID="RequiredFieldValidator9" runat ="server" ErrorMessage ="邮箱不能为空！一些操作会发邮件确认！" ControlToValidate ="txtmailbox" ForeColor ="Red"></asp:RequiredFieldValidator>
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>问题一：</label>
			<div class="formControls col-xs-8 col-sm-9">
				 <asp:DropDownList ID="DropDownList" CssClass="input-text" runat="server" Width="147px">
            <asp:ListItem> 你父亲的名字</asp:ListItem>
            <asp:ListItem Selected="True">你的学号</asp:ListItem>
            <asp:ListItem>你母亲的名字</asp:ListItem>
            <asp:ListItem>你的故乡</asp:ListItem>
            <asp:ListItem>你就读的高中</asp:ListItem>  
            <asp:ListItem>你的梦想</asp:ListItem>     
        </asp:DropDownList>
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>答案一：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<asp:TextBox ID="txtanswer" CssClass="input-text" runat="server" ></asp:TextBox>
                 <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat ="server" ErrorMessage ="答案不能为空！" ControlToValidate ="txtanswer" ForeColor ="Red"></asp:RequiredFieldValidator>
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>问题二：</label>
			<div class="formControls col-xs-8 col-sm-9">
				 <asp:DropDownList ID="DropDownList1" CssClass="input-text" runat="server" Width="147px">
            <asp:ListItem> 你父亲的名字</asp:ListItem>
            <asp:ListItem Selected="True">你的学号</asp:ListItem>
            <asp:ListItem>你母亲的名字</asp:ListItem>
            <asp:ListItem>你的故乡</asp:ListItem>
            <asp:ListItem>你就读的高中</asp:ListItem>  
            <asp:ListItem>你的梦想</asp:ListItem>     
        </asp:DropDownList>
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>答案二：</label>
			<div class="formControls col-xs-8 col-sm-9">
			<asp:TextBox ID="txtanswer1" CssClass="input-text" runat="server" ></asp:TextBox>
                 <asp:RequiredFieldValidator ID="RequiredFieldValidator6" CssClass="input-text" runat ="server" ErrorMessage ="答案不能为空！" ControlToValidate ="txtanswer" ForeColor ="Red"></asp:RequiredFieldValidator>
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>问题三：</label>
			<div class="formControls col-xs-8 col-sm-9">
				<asp:DropDownList ID="DropDownList2" CssClass="input-text" runat="server" Width="147px">
            <asp:ListItem> 你父亲的名字</asp:ListItem>
            <asp:ListItem Selected="True">你的学号</asp:ListItem>
            <asp:ListItem>你母亲的名字</asp:ListItem>
            <asp:ListItem>你的故乡</asp:ListItem>
            <asp:ListItem>你就读的高中</asp:ListItem>  
            <asp:ListItem>你的梦想</asp:ListItem>     
        </asp:DropDownList>
			</div>
		</div>
        <div class="row cl">
			<label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>答案三：</label>
			<div class="formControls col-xs-8 col-sm-9">
                <asp:TextBox ID="txtanswer2" CssClass="input-text" runat="server" ></asp:TextBox>
                 <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat ="server" ErrorMessage ="答案不能为空！" ControlToValidate ="txtanswer" ForeColor ="Red"></asp:RequiredFieldValidator>
				
			</div>
		</div>
		<div class="row cl">
			<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-3">
			<%--	<button type="submit" class="btn btn-success radius" id="admin-role-save" name="admin-role-save"><i class="icon-ok"></i> 确定</button>--%>
                 <asp:Button ID="BtnRegister" CssClass="btn btn-success radius" runat="server"  OnClick="BtnRegister_Click" Text="确定" />
			</div>
		</div>
	</form>
</article>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="lib/jquery.validation/1.14.0/jquery.validate.js"></script>
<script type="text/javascript" src="lib/jquery.validation/1.14.0/validate-methods.js"></script>
<script type="text/javascript" src="lib/jquery.validation/1.14.0/messages_zh.js"></script>
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
<script type="text/javascript">
$(function(){
	$(".permission-list dt input:checkbox").click(function(){
		$(this).closest("dl").find("dd input:checkbox").prop("checked",$(this).prop("checked"));
	});
	$(".permission-list2 dd input:checkbox").click(function(){
		var l =$(this).parent().parent().find("input:checked").length;
		var l2=$(this).parents(".permission-list").find(".permission-list2 dd").find("input:checked").length;
		if($(this).prop("checked")){
			$(this).closest("dl").find("dt input:checkbox").prop("checked",true);
			$(this).parents(".permission-list").find("dt").first().find("input:checkbox").prop("checked",true);
		}
		else{
			if(l==0){
				$(this).closest("dl").find("dt input:checkbox").prop("checked",false);
			}
			if(l2==0){
				$(this).parents(".permission-list").find("dt").first().find("input:checkbox").prop("checked",false);
			}
		}
	});
	
	$("#form-admin-role-add").validate({
		rules:{
			roleName:{
				required:true,
			},
		},
		onkeyup:false,
		focusCleanup:true,
		success:"valid",
		submitHandler:function(form){
			$(form).ajaxSubmit();
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		}
	});
});
</script>
<!--/请在上方写此页面业务相关的脚本-->

</body>
</html>