<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Comment-list.aspx.cs" Inherits="BackStage_Backstage_Comment_list" %>

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
<link rel="stylesheet" type="text/css" href="static/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="static/h-ui.admin/css/style.css" />
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->

<title>意见反馈</title>
</head>
<body>
    <form id="form1" runat="server" >
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 评论管理 <span class="c-gray en">&gt;</span> 意见反馈 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="text-c"> 日期范围：
		<input runat="server" type="text" onfocus="WdatePicker({ maxDate:'#F{$dp.$D(\'datemax\')||\'%y-%M-%d\'}' })" id="datemin" class="input-text Wdate" style="width:120px;">
		-
		<input runat="server" type="text" onfocus="WdatePicker({ minDate:'#F{$dp.$D(\'datemin\')}',maxDate:'%y-%M-%d' })" id="datemax" class="input-text Wdate" style="width:120px;">
        <asp:TextBox ID="txtKeyComment" runat="server" CssClass="input-text" Width="250px" placeholder="输入关键字"></asp:TextBox>
            <asp:Button ID="btnSelect" runat="server" CssClass="btn btn-success radius" Text="搜意见" OnClick="btnSelect_Click"/><i class="Hui-iconfont">&#xe665;</i>    
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l">
        <%--<a href="javascript:;" onclick="member_del()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>--%> 
        <div class="666 btn btn-danger radius"  >
                        批量删除
                    </div>
</span> <span class="r">共有数据：<strong><%=CommentCount %></strong> 条</span> </div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-hover table-bg table-sort">
			<thead>
				<tr class="text-c">
					<th width="25"><input type="checkbox" name="" value=""></th>
					<th>留言内容</th>
					<th width="100">回复者</th>
					<th width="450">回复内容</th>
					<th width="100">操作</th>
				</tr>
			</thead>
			<tbody>
                <asp:Repeater ID="rptComment" runat="server" OnItemCommand="rptComment_ItemCommand">
                    <ItemTemplate>
				<tr class="text-c">
					<td><input type="checkbox" id=<%# Eval("MessageId") %> value="1" name=""></td>
					<td class="text-l">
                        <div class="c-999 f-12">
					<asp:Label ID="lbComment" runat="server" Text='<%#Eval("MessageContent") %>'></asp:Label></div>
                        <div class="c-999 f-12">
						  <%#Eval("MessageTime") %> </div>
					</td>
					<td><%#Eval("MessageAdminName") %></td>
					<td><a href="javascript:;" onclick="member_show('回复','ChangeReply.aspx?id=<%#Eval("MessageId") %>','1100','','500')"><%#Eval("MessageComment") %></a></td>
					<td class="td-manage">
                        <a title="编辑" href="javascript:;" onclick="member_edit('编辑','ChangeReply.aspx?id=<%#Eval("MessageId") %>','1100','1050')" style="text-decoration:none">
                            <i class="Hui-iconfont">&#xe6df;</i></a>
                         <asp:LinkButton ID="lkDelete" runat="server" CssClass="ml-5"  OnClientClick="return confirm('确定删除？')" CommandArgument='<%#Eval("MessageId") %>' CommandName="Delete">
                             <i class="Hui-iconfont">&#xe6e2;</i></asp:LinkButton></td>
				</tr>
                        </ItemTemplate>
				</asp:Repeater>
				
			</tbody>
		</table>
       <div class="box">
        <asp:Button CssClass="font-page" ID="btnUp" runat="server" Text="上一页" OnClick="btnUp_Click"/>
        <asp:Button CssClass="next-page" ID="btnDown" runat="server" Text="下一页"  OnClick="btnDown_Click"/>
        <asp:Button CssClass="font-page" ID="btnFirst" runat="server" Text="首页" OnClick="btnFirst_Click" />
        <asp:Button CssClass="next-page" ID="btnLast" runat="server" Text="尾页"  OnClick="btnLast_Click" />
        页次：<asp:Label CssClass="page" ID="lbNow" runat="server" Text="1"></asp:Label>
        /<asp:Label CssClass="page" ID="lbTotal" runat="server" Text="1"></asp:Label>
        转<asp:TextBox CssClass="page" ID="txtJump" Text="1" runat="server" Width="16px" onkeyup="this.value=this.value.replace(/\D/g,'')"></asp:TextBox>
         <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat ="server" ControlToValidate ="txtJump" ></asp:RequiredFieldValidator> 
        <asp:Button CssClass="next-page" ID="btnJump" runat="server" Text="Go"  OnClick="btnJump_Click"/>
       </div> 
       
	</div>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="lib/layer/2.4/layer.js"></script>  
<script type="text/javascript" src="static/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="static/h-ui.admin/js/H-ui.admin.js"></script> 
<!--/_footer /作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script> 
<script type="text/javascript" src="lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="lib/laypage/1.2/laypage.js"></script>
<script type="text/javascript">
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
                    type: 2,
                    idInfor: JSON.stringify(idList)
                },
                traditional: true,
                success: function (data) {
                    //$(obj).parents("tr").remove();
                    layer.msg('已删除!', { icon: 1, time: 1000 });
                    window.location.href = 'Comment-list.aspx';
                },
                error: function (data) {
                },
            });
        });
    }
/*用户-添加*/
function member_add(title,url,w,h){
    layer_show(title, url, w, h);
}
/*用户-查看*/
function member_show(title,url,w,h){
	layer_show(title,url,w,h);
}
/*用户-停用*/
function member_stop(obj,id){
	layer.confirm('确认要停用吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="member_start(this,id)" href="javascript:;" title="启用"><i class="Hui-iconfont">&#xe6e1;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
		$(obj).remove();
		layer.msg('已停用!',{icon: 5,time:1000});
	});
}

/*用户-启用*/
function member_start(obj,id){
	layer.confirm('确认要启用吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="member_stop(this,id)" href="javascript:;" title="停用"><i class="Hui-iconfont">&#xe631;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
		$(obj).remove();
		layer.msg('已启用!',{icon: 6,time:1000});
	});
}
/*用户-编辑*/
function member_edit(title,url,w,h){
	layer_show1(title,url,w,h);
}
/*密码-修改*/
function change_password(title,url,id,w,h){
	layer_show(title,url,w,h);	
}
/*用户-删除*/
//function member_del(obj,id){
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

</script>
        </form>
</body>
</html>
