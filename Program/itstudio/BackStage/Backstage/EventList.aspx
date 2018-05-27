<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EventList.aspx.cs" Inherits="EventList" %>

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
    <title>大事件列表</title>
    <link href="css/popimage.css" rel="stylesheet" />
    <script src="js/jquery.min.js"></script>
    <script src="js/addmemberPhoto.js"></script>
</head>
<body>
    <div class="cover"></div>
    <div class="popimagediv">
        <img />
    </div>
    <form id="form1" runat="server">
        <nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 大事件管理 <span class="c-gray en">&gt;</span> 大事件列表 <a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a></nav>
        <div class="page-container">
            <div class="cl pd-5 bg-1 bk-gray mt-20">
                <span class="l">
                    <a class="btn btn-primary radius" data-title="添加大事件" data-href="EventAdd.aspx" onclick="member_add('添加大事件','EventAdd.aspx','','510')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加大事件</a></span> <span class="r">大事件数量<strong>
                    <asp:Label ID="lbcount" runat="server"></asp:Label></strong> 件</span>
                <%--            <div class="cl pd-5 bg-1 bk-gray mt-20">
                <span class="l"><a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a> <a href="javascript:;" onclick="member_add('添加大事件','MemberAdd.aspx','','510')" class="btn btn-primary radius"></span> <span class="r">大事件数量<strong>
                    <asp:Label ID="lbcount" runat="server"></asp:Label></strong> 件</span>--%>
            </div>
            <div class="mt-20">
                <table class="table table-border table-bordered table-bg table-hover table-sort">
                    <thead>
                        <tr class="text-c">
                            <th>大事件内容</th>
                            <th>发生时间</th>
                            <th>编辑</th>
                            <th>删除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <asp:Repeater ID="rpt" runat="server" OnItemCommand="rpt_ItemCommand">
                            <ItemTemplate>
                                <tr class="text-c">
                                    <td>
                                        <div id='<%# Eval("EventId") %>'>
                                            <%# Eval("EventContent") %>
                                        </div>
                                    </td>
                                    <td><%# Eval("EventTime") %></td>
                                    <td>
                                        <asp:LinkButton ID="editor" CssClass="ml-5" runat="server" Text="编辑" PostBackUrl='<%# "EventEditor.aspx?id="+ Eval("EventId") %>'><i class="Hui-iconfont">&#xe6df;</i></asp:LinkButton></td>
                                    <td>
                                        <asp:LinkButton ID="delete" CssClass="ml-5" Text="删除" runat="server" CommandName="delete" CommandArgument='<%# Eval("EventId") %>'><i class="Hui-iconfont">&#xe6e2;</i></asp:LinkButton></td>
                                </tr>

                            </ItemTemplate>
                        </asp:Repeater>
                    </tbody>
                </table>
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
            //$('.table-sort').dataTable({
            //    "aaSorting": [[1, "desc"]],//默认第几个排序
            //    "bStateSave": true,//状态保存
            //    "aoColumnDefs": [
            //      //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
            //      { "orderable": false, "aTargets": [0, 8] }// 不参与排序的列
            //    ]
            //});
            function member_add(title, url, w, h) {
                layer_show(title, url, w, h);
            }
            /*资讯-添加*/
            function article_add(title, url, w, h) {
                var index = layer.open({
                    type: 2,
                    title: title,
                    content: url
                });
                layer.full(index);
            }
            /*资讯-编辑*/
            function article_edit(title, url, id, w, h) {
                var index = layer.open({
                    type: 2,
                    title: title,
                    content: url
                });
                layer.full(index);
            }
            /*资讯-删除*/
            function article_del(obj, id) {
                layer.confirm('确认要删除吗？', function (index) {
                    $.ajax({
                        type: 'POST',
                        url: '',
                        dataType: 'json',
                        success: function (data) {
                            $(obj).parents("tr").remove();
                            layer.msg('已删除!', { icon: 1, time: 1000 });
                        },
                        error: function (data) {
                            console.log(data.msg);
                        },
                    });
                });
            }

            /*资讯-审核*/
            function article_shenhe(obj, id) {
                layer.confirm('审核文章？', {
                    btn: ['通过', '不通过', '取消'],
                    shade: false,
                    closeBtn: 0
                },
                function () {
                    $(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_start(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
                    $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
                    $(obj).remove();
                    layer.msg('已发布', { icon: 6, time: 1000 });
                },
                function () {
                    $(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_shenqing(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
                    $(obj).parents("tr").find(".td-status").html('<span class="label label-danger radius">未通过</span>');
                    $(obj).remove();
                    layer.msg('未通过', { icon: 5, time: 1000 });
                });
            }
            /*资讯-下架*/
            function article_stop(obj, id) {
                layer.confirm('确认要下架吗？', function (index) {
                    $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_start(this,id)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
                    $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
                    $(obj).remove();
                    layer.msg('已下架!', { icon: 5, time: 1000 });
                });
            }

            /*资讯-发布*/
            function article_start(obj, id) {
                layer.confirm('确认要发布吗？', function (index) {
                    $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_stop(this,id)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
                    $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
                    $(obj).remove();
                    layer.msg('已发布!', { icon: 6, time: 1000 });
                });
            }
            /*资讯-申请上线*/
            function article_shenqing(obj, id) {
                $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">待审核</span>');
                $(obj).parents("tr").find(".td-manage").html("");
                layer.msg('已提交申请，耐心等待审核!', { icon: 1, time: 2000 });
            }

        </script>
    </form>
</body>
</html>
