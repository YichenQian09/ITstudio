$(function () {
    var infonumber = $("tbody").find("tr").length;
    var jsonobj;
    //var dataArray= new Array();
    var i;
    //var idList = [];
    //for (i = 1; i < infonumber; i++)
    //{
    //    idList.push($("tbody tr:eq(" + i + ") div").attr("id"));
    //}
    var jsonstr = "[]";

    var idList = eval('(' + jsonstr + ')');
    //console.log("idList"+idList);

    for (var i = 0; i < infonumber; i++) {

        var jsonTemp = { "id": $("tbody tr:eq(" + i + ") div").attr("id") };
        //console.log(jsonTemp);

        idList.push(jsonTemp);

    }
    //console.log(idList);
    //console.log("str  " + JSON.stringify(idList));
    var cover = $(".cover")
        .css({
            "width": $(window).width(),
            "height": $(window).height(),
            "background": "rgba(255,255,255,0.8)",
            "zIndex": 5,
            "position": "absolute",
            "top": 0,
            "left": 0,
            "display": "none"
        });
    var popImagediv = $(".popimagediv")
        .css({
            "left": ($(window).width() - $(".popimagediv").width()) / 2
        });
    // $(".popimagediv img").css({
    //  "height":"400px",
    // "width":"auto",
    //  "marginTop":"100px",
    // "display":"block"
    //})
    var urls = window.location.pathname;
   
    var type;
    if (urls == "/ITShow2017/BackStage/Backstage/MemberList.aspx")
        type = 1;
    else if (urls == "/ITShow2017//BackStage/Backstage/WorksList.aspx")
        type = 2;
    else
        type = 3;

    $.ajax({

        type: 'get',
        url: 'Ajax/BindHandler.ashx',
        async: 'true',
        data: {
            type: type,
            idInfor: JSON.stringify(idList)
        },
        traditional: true,
        success: function (data) {
            // obj = eval("(" + data + ")");
            jsonobj = JSON.parse(data);
            //字符串转换为json对象，有这句话就不能在设置 datatype=json 
           // console.log(jsonobj);

        },
        error: function () {
            //window.location.reload();
        }
    });
    $("tbody div").click(function () {
        var number = $(this).parents("tr").index();

        if (jsonobj[number].url != "" && jsonobj[number].url != null) {
            $(".cover").css({
                "display": "block"
            });
            $(".popimagediv").css({
                "display": "block"
            });

            $(".popimagediv img").attr("src", jsonobj[number].url);
        }
    })
    $(".cover").click(function () {
        $(".cover").css({
            "display": "none"
        });
        $(".popimagediv").css({
            "display": "none"
        });
    })
})