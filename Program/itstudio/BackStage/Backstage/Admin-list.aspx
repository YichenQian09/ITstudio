<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Admin-list.aspx.cs" Inherits="BackStage_Backstage_Admin_list" %>

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
<title>管理员列表</title>
</head>
<body>
    <form id="form1" runat="server" >
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 管理员管理 <span class="c-gray en">&gt;</span> 管理员列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="text-c"> 
        <asp:TextBox ID="txtAdmin" runat="server" CssClass="input-text" Width="250px" placeholder="输入管理员名称"></asp:TextBox>
        <asp:LinkButton ID="lkSelect" runat="server" CssClass="btn btn-success" Text="搜用户" OnClick="lkSelect_Click"></asp:LinkButton><i class="Hui-iconfont">&#xe665;</i>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20"> 
        <span class="l">
<%--                    <asp:Button CssClass="btn btn-danger radius" runat="server" ID="Button1" Text="批量删除" />--%>
                    <div class="666 btn btn-danger radius"  >
                        批量删除
                    </div>
            <a href="javascript:;" onclick="admin_add('添加管理员','Admin-role-add.aspx','800','500')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 添加管理员</a></span> <span class="r">共有数据：<strong><%=AdminCount %></strong> 条</span> </div>
	<table class="table table-border table-bordered table-bg">
		<thead>
			<tr>
				<th scope="col" colspan="9">管理员列表</th>
			</tr>
			<tr class="text-c">
				<th width="25"><input type="checkbox" name="" value=""></th>
				<th width="40">ID</th>
				<th width="150">登录名</th>				
				<th width="150">邮箱</th>	
				<th width="130">加入时间</th>
				
				<th width="100">操作</th>
			</tr>
		</thead>
		<tbody>
            <asp:Repeater ID="rptAdmin" runat="server" OnItemCommand="rptAdmin_ItemCommand">
                <ItemTemplate>
			<tr class="text-c">
				<td><input type="checkbox" id='<%# Eval("AdminId") %>' value="1" name=""></td>
				<td><%#Eval("AdminId") %></td>
				<td><%#Eval("AdminName") %></td>			
				<td><%#Eval("AdminEmail") %></td>
				<td>2014-6-11 11:11:42</td>
				
				<td class="td-manage">
                   
                        <a title="编辑" href="javascript:;" onclick="admin_edit('管理员编辑','ManagerAdmin.aspx?id=<%#Eval("AdminId") %>','1','800','500')" class="ml-5" style="text-decoration:none">
                            <i class="Hui-iconfont">&#xe6df;</i></a> 
                    <asp:LinkButton ID="lkDelete" runat="server" OnClientClick="return confirm('确定要删除此管理员？')" CommandArgument='<%#Eval("AdminId") %>' CommandName="Delete" CssClass="ml-5" >
                        <i class="Hui-iconfont">&#xe6e2;</i></asp:LinkButton></td>
			</tr>
                    </ItemTemplate>
		</asp:Repeater>
		</tbody>
	</table>
   <div class="box">
        <asp:Button CssClass="font-page" ID="btnFirst" runat="server" Text="首页" OnClick="btnFirst_Click" />
        <asp:Button CssClass="next-page" ID="btnLast" runat="server" Text="尾页"  OnClick="btnLast_Click" />
        <asp:Button CssClass="font-page" ID="btnUp" runat="server" Text="上一页" OnClick="btnUp_Click"/>
        <asp:Button CssClass="next-page" ID="btnDown" runat="server" Text="下一页"  OnClick="btnDown_Click"/>
        页次：<asp:Label CssClass="page" ID="lbNow" runat="server" Text="1"></asp:Label>
        /<asp:Label CssClass="page" ID="lbTotal" runat="server" Text="1"></asp:Label>
        转<asp:TextBox CssClass="page" ID="txtJump" Text="1" runat="server" Width="16px" onkeyup="this.value=this.value.replace(/\D/g,'')"></asp:TextBox>
         <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat ="server" ControlToValidate ="txtJump" ></asp:RequiredFieldValidator> 
        <asp:Button CssClass="next-page" ID="btnJump" runat="server" Text="Go"  OnClick="btnJump_Click"/>
       </div> 
</div>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script> 
<script type="text/javascript" src="lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="lib/laypage/1.2/laypage.js"></script>
<script type="text/javascript">
/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
*/
/*管理员-增加*/
function admin_add(title,url,w,h){
	layer_show(title,url,w,h);
}

$(".666").on("click", function () {
    member_del();
})
/*用户-删除*/
function member_del() {

    layer.confirm('确认要删除吗？', function () {

        var infonumber = $("tbody").find("tr").length;

        var jsonstr = "[]";

        var idList = eval('(' + jsonstr + ')');

        for (var i = 0; i < infonumber; i++) {
            var jsonTemp
            if ($("tbody tr:eq(" + i + ") input").is(":checked")) {
                jsonTemp = { "id": $("tbody tr:eq(" + i + ") input").attr("id") };
                idList.push(jsonTemp);
            }
        }
        $.ajax({
            type: 'get',
            url: 'Ajax/DeleteHandler.ashx',
            async: 'true',
            data: {
                type: 3,
                idInfor: JSON.stringify(idList)
            },
            traditional: true,
            success: function (data) {
                //$(obj).parents("tr").remove();
                layer.msg('已删除!', { icon: 1, time: 1000 });
                window.location.href = 'Admin-list.aspx';
            },
            error: function (data) {
            },
        });
    });
}
///*管理员-删除*/
//function admin_del(obj,id){
//	layer.confirm('确认要删除吗？',function(index){
//		$.ajax({
//			type: 'POST',
//			url: '',
//			dataType: 'json',
//			success: function(data){
//				$(obj).parents("tr").remove();
//				layer.msg('已删除!',{icon:1,time:1000});
//			},
//			error:function(data) {
//				console.log(data.msg);
//			},
//		});		
//	});
//}

/*管理员-编辑*/
function admin_edit(title,url,id,w,h){
	layer_show(title,url,w,h);
}
/*管理员-停用*/
function admin_stop(obj,id){
	layer.confirm('确认要停用吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		
		$(obj).parents("tr").find(".td-manage").prepend('<a onClick="admin_start(this,id)" href="javascript:;" title="启用" style="text-decoration:none"><i class="Hui-iconfont">&#xe615;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">已禁用</span>');
		$(obj).remove();
		layer.msg('已停用!',{icon: 5,time:1000});
	});
}

/*管理员-启用*/
function admin_start(obj,id){
	layer.confirm('确认要启用吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		
		
		$(obj).parents("tr").find(".td-manage").prepend('<a onClick="admin_stop(this,id)" href="javascript:;" title="停用" style="text-decoration:none"><i class="Hui-iconfont">&#xe631;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
		$(obj).remove();
		layer.msg('已启用!', {icon: 6,time:1000});
	});
}
</script>
    </form>
</body>
</html>
