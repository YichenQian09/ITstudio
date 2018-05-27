<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ApplicationList.aspx.cs" Inherits="ApplicationList" %>

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
    <title>报名信息管理</title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 用户中心 <span class="c-gray en">&gt;</span> 报名信息管理 <a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a></nav>
        <div class="page-container">

            <div class="text-c">
                日期范围：
		<input runat="server" type="text" onfocus="WdatePicker({ maxDate:'#F{$dp.$D(\'datemax\')||\'%y-%M-%d\'}' })" id="datemin" class="input-text Wdate" style="width: 120px;">
                -
		<input runat="server" type="text" onfocus="WdatePicker({ minDate:'#F{$dp.$D(\'datemin\')}',maxDate:'%y-%M-%d' })" id="datemax" class="input-text Wdate" style="width: 120px;">
                <asp:TextBox ID="txtKeyName" runat="server" CssClass="input-text" Width="250px" placeholder="输入关键字"></asp:TextBox>
                <asp:Button ID="btnSelect" runat="server" CssClass="btn btn-success radius" Text="搜名字" OnClick="btnSelect_Click" /><i class="Hui-iconfont">&#xe665;</i>
            </div>

            <div class="cl pd-5 bg-1 bk-gray mt-20">
                <span class="l">
<%--                    <asp:Button CssClass="btn btn-danger radius" runat="server" ID="Button1" Text="批量删除" />--%>
                    <div class="666 btn btn-danger radius"  >
                        批量删除
                    </div>
                    <i class="Hui-iconfont">&#xe6e2;</i></span> <span class="r">报名总数量:<strong>
                        <asp:Label ID="lbcount" runat="server"></asp:Label></strong> 人</span>
            </div>
            部门：
        <asp:DropDownList ID="dropDepartment" runat="server" AutoPostBack="true" OnSelectedIndexChanged="dropDepartment_SelectedIndexChanged">
            <asp:ListItem Selected="True">全部</asp:ListItem>
            <asp:ListItem>程序开发</asp:ListItem>
            <asp:ListItem>前端开发</asp:ListItem>
            <asp:ListItem>UI设计</asp:ListItem>
            <asp:ListItem>App开发</asp:ListItem>
        </asp:DropDownList>
            <br />
            各部门报名数量：
            <asp:Label ID="lbdptCount" runat="server"></asp:Label>
            <br />

<%--            
            <script type="text/javascript" src="lib/My97DatePicker/4.8/WdatePicker.js"></script>
            &nbsp;&nbsp;&nbsp;
        <input runat="server" visible="false" id="txtTime1" type="text" class="text" onclick="WdatePicker({ skin: 'whyGreen', dateFmt: 'yyyy-MM-dd' })" />
            <asp:Button runat="server" Visible="false" ID="lbDelete" Text="删除该日期之前的记录" OnClick="lbDelete_Click"></asp:Button>--%>
            <div class="mt-20">
                <table class="table table-border table-bordered table-hover table-bg table-sort">
                    <thead>
                        <tr class="text-c">
                            <th width="25">
                                <input type="checkbox" name="" value=""></th>
                            <th>姓名</th>
                            <th>年级专业</th>
                            <th>意向部门</th>
                            <th>电话</th>
                            <th>QQ</th>
                            <th>个人简述</th>
                            <th>报名时间</th>
                            <th>删除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <asp:Repeater ID="rpt" runat="server" OnItemCommand="rpt_ItemCommand">
                            <ItemTemplate>
                                <tr class="text-c">
                                    <td>
                                        <input type="checkbox" id='<%# Eval("ApplicationId") %>' value="1" name=""></td>
                                    <td><%# Eval("Name") %></td>
                                    <td><%# Eval("GradeMajor") %></td>
                                    <td><%# Eval("Department") %></td>
                                    <td><%# Eval("Telephone") %></td>
                                    <td><%# Eval("QQ") %></td>
                                    <td><%# Eval("Introdution") %></td>
                                    <td><%# Eval("Time") %></td>
                                    <td>
                                        <asp:LinkButton ID="delete" Text="删除" runat="server" CommandName="delete" CssClass="ml-5" CommandArgument='<%# Eval("ApplicationId") %>'><i class="Hui-iconfont">&#xe6e2;</i></asp:LinkButton></td>
                                </tr>

                            </ItemTemplate>
                        </asp:Repeater>

                    </tbody>
                </table>
                <asp:DropDownList ID="DdlSelect" runat="server" Height="36px" Width="99px" CssClass="site-title" Font-Size="Large">
                    <asp:ListItem Selected="True" Value="0">全部</asp:ListItem>
                    <asp:ListItem Value="1">前端开发</asp:ListItem>
                    <asp:ListItem Value="2">程序开发</asp:ListItem>
                    <asp:ListItem Value="3">APP开发</asp:ListItem>
                    <asp:ListItem Value="4">UI设计</asp:ListItem>
                </asp:DropDownList>
                <asp:Button ID="BtnImport" runat="server" CssClass="font-page" OnClick="BtnImport_Click" Text="导出申请" />
                <div class="box">
                    <asp:Button CssClass="font-page" ID="btnUp" runat="server" Text="上一页" OnClick="btnUp_Click" />
                    <asp:Button CssClass="next-page" ID="btnDown" runat="server" Text="下一页" OnClick="btnDown_Click" />
                    <asp:Button CssClass="font-page" ID="btnFirst" runat="server" Text="首页" OnClick="btnFirst_Click" />
                    <asp:Button CssClass="next-page" ID="btnLast" runat="server" Text="尾页" OnClick="btnLast_Click" />
                    页次：<asp:Label CssClass="page" ID="lbNow" runat="server" Text="1"></asp:Label>
                    /<asp:Label CssClass="page" ID="lbTotal" runat="server" Text="1"></asp:Label>
                    转<asp:TextBox CssClass="page" ID="txtJump" Text="1" runat="server" Width="16px" onkeyup="this.value=this.value.replace(/\D/g,'')"></asp:TextBox>
                    <asp:Button CssClass="next-page" ID="btnJump" runat="server" Text="Go" OnClick="btnJump_Click" />
                </div>
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
                            type:1,
                            idInfor: JSON.stringify(idList)
                        },
                        traditional: true,
                        success: function (data) {
                            //$(obj).parents("tr").remove();
                            layer.msg('已删除!', { icon: 1, time: 1000 });
                            window.location.href = 'ApplicationList.aspx';
                        },
                        error: function (data) {
                        },
                    });
                });
            }
            /*用户-添加*/
            function member_add(title, url, w, h) {
                layer_show(title, url, w, h);
            }
            /*用户-查看*/
            function member_show(title, url, id, w, h) {
                layer_show(title, url, w, h);
            }
            /*用户-停用*/
            function member_stop(obj, id) {
                layer.confirm('确认要停用吗？', function (index) {
                    $.ajax({
                        type: 'POST',
                        url: '',
                        dataType: 'json',
                        success: function (data) {
                            $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="member_start(this,id)" href="javascript:;" title="启用"><i class="Hui-iconfont">&#xe6e1;</i></a>');
                            $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
                            $(obj).remove();
                            layer.msg('已停用!', { icon: 5, time: 1000 });
                        },
                        error: function (data) {
                            console.log(data.msg);
                        },
                    });
                });
            }

            /*用户-启用*/
            function member_start(obj, id) {
                layer.confirm('确认要启用吗？', function (index) {
                    $.ajax({
                        type: 'POST',
                        url: '',
                        dataType: 'json',
                        success: function (data) {
                            $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="member_stop(this,id)" href="javascript:;" title="停用"><i class="Hui-iconfont">&#xe631;</i></a>');
                            $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
                            $(obj).remove();
                            layer.msg('已启用!', { icon: 6, time: 1000 });
                        },
                        error: function (data) {
                            console.log(data.msg);
                        },
                    });
                });
            }
            /*用户-编辑*/
            function member_edit(title, url, id, w, h) {
                layer_show(title, url, w, h);
            }
            /*密码-修改*/
            function change_password(title, url, id, w, h) {
                layer_show(title, url, w, h);
            }
            
        </script>
    </form>
</body>
</html>
