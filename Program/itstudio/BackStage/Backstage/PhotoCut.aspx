<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PhotoCut.aspx.cs" Inherits="BackStage_Backstage_PhotoCut" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
 	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
  	<meta http-equiv="description" content="this is my page">
  	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
  	<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<link rel="stylesheet" href="css/bootstrap.min.css">
  	<link rel="stylesheet" href="css/cropper.css">
  	<link rel="stylesheet" href="css/myCrop.css">
</head>
   	
<body style="margin: auto;text-align: center;">
	<section style="margin-top: 50px;">
		<input id="photoBtn" type="button" onclick="document.getElementById('inputImage').click()" value="选择照片"><!-- 可以增加自己的样式 -->
		<input  id="inputImage"  type="file" accept="image/*" style="display: none;"/>
		<br/>
  		<img  id="showImg" />
        <input type="button" id="btnUpload" onclick="btnUploader()" style="display:none;" value="提交" />
        <!--表单-->
        <input type="file" hidden="hidden" id="face_upload" name="temp_img" style="display:none">
        <form method="post" encType="multipart/form-data"></form>
        <!--表单-->
	</section>

	<div class="container" style="padding: 0;margin: 0;position:fixed;display: none;top: 0;left: 0;z-index: 200;" id="containerDiv">
	    <div class="row" style="display: none;" id="imgEdit">
	      <div class="col-md-9">
	        <div class="img-container">
	          <img src="" alt="Picture" />
	        </div>
	      </div>
	    </div>
	    <div class="row" id="actions" style="padding: 0;margin: 0;width: 100%;position: fixed;bottom: 5px;">
	      <div class="col-md-9 docs-buttons">
	        <div class="btn-group" >
	          <button type="button" class="btn btn-primary" data-method="destroy" title="Destroy" style="height: auto;">
	            <span class="docs-tooltip" data-toggle="tooltip" >
	              <span class="fa fa-power-off" >取消</span>
	            </span>
	          </button>
	        </div>
	
	        <div class="btn-group btn-group-crop " style="float: right;">
	          <button type="button" class="btn btn-primary" id="imgCutConfirm" data-method="getCroppedCanvas" data-option="{ &quot;width&quot;: 320, &quot;height&quot;: 180 }" style="height: auto;margin-right: 17px;">
	            <span class="docs-tooltip" data-toggle="tooltip" title="">确认</span> <!--cropper.getCroppedCanvas({ width: 320, height: 180 }) -->
	          </button>
	        </div>
	
	      </div><!-- /.docs-buttons -->
	    </div>
  	</div>
  
   <!-- 预览 -->
   <div class="modal fade docs-cropped" id="getCroppedCanvasModal" style="display: none" 
   		 role="dialog" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" tabindex="-1">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
           <h4 class="modal-title" id="getCroppedCanvasTitle" >预览</h4>
         </div>
         <div class="modal-body"></div>
         <div class="modal-footer">
           <button type="button" class="btn btn-default" data-dismiss="modal" style="height: auto;">取消</button>
           <a class="btn btn-primary" id="imgCutConfirm" href="javascript:void(0);" style="height: auto;">确认</a>
         </div>
       </div>
     </div>
   	</div><!-- /.预览 -->
   
</body>
<script type="text/javascript" src="js/jquery.min.js" ></script>
<script type="text/javascript" src="js/exif.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/cropper.js"></script>
<script type="text/javascript" src="js/myCrop.js?v=1.0.4"></script>
<script type="text/javascript">
	var fileImg = "";
	
	$(function(){
	
		$("#imgCutConfirm").bind("click",function(){
			 $("#containerDiv").hide();
         	 $("#imgEdit").hide();
         	 $("#getCroppedCanvasModal").modal("hide");
		})
	})

	function btnUploader() {
	    var base64 = document.getElementById('showImg').src;
	    sendimg(base64);
	}
    //获取地址栏参数
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}

	function sendimg(b64img) {
	    var xhr = new XMLHttpRequest();
	    var type = GetQueryString("type");//type为1--Member type为2--Works type为3--Event type为4--管理员
	    var type1 = GetQueryString("type1");
	    var id=GetQueryString("id");
	    var username = GetQueryString("username");

	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	                if(type==1)
	                {
	                    if (type1 == 0)
	                        window.location.href = 'MemberAdd.aspx';
	                    else
	                        window.location.href = 'MemberEditor.aspx?id='+id;
	                }
	                else if(type==2)
	                {
	                    if (type1 == 0)
	                        window.location.href = 'WorksAdd.aspx';
	                    else
	                        window.location.href = 'WorksEditor.aspx?id=' + id;
	                }
	                else if (type == 3)
	                {
	                    if (type1 == 0)
	                        window.location.href = 'EventAdd.aspx';
	                    else
	                        window.location.href = 'EventEditor.aspx?id=' + id;
	                }
	                else
	                {
	                    if (type1 == 0)
	                        window.location.href = 'Personal.aspx?username=' + username;
	                    else
	                        window.location.href = 'ManagerAdmin.aspx?id='+id;
	                }
	            }
	           
	       
	        }
	    };
	    xhr.open("post", "Ajax/PhotoCutHandler.ashx", true);
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded ");
	    xhr.send("img=" + encodeURIComponent(b64img) + "&type=" + type);

	}

	function convertToFile(base64Codes) {//将base64转化blob，并放到form中 
	    var form = document.getElementById("form1");
	    var formData = new FormData(form);
	    var img_name = $("#face_upload").val();
	    formData.append("img", convertBase64UrlToBlob(base64Codes), img_name);//img是input的name属性，与后台的对应即可  
	    $.ajax({//提交表单，异步上传图片  
	        url: "Ajax/PhotoCutHandler.ashx",
	        type: "POST",
	        data: formData,
	        dataType: "json",
	        processData: false,         // 告诉jQuery不要去处理发送的数据  
	        contentType: false,        // 告诉jQuery不要去设置Content-Type请求头  
	        success: function (data) {
	            alert('提交成功');
	        }
	    });
	}

	function convertBase64UrlToBlob(urlData) {
	    var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
	    //处理异常,将ascii码小于0的转换为大于0  
	    var ab = new ArrayBuffer(bytes.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < bytes.length; i++) {
	        ia[i] = bytes.charCodeAt(i);
	    }
	    return new Blob([ab], { type: 'image/png' });
	}

	//提交表达
	function submitForm(){
		$("#registerForm").attr("enctype","multipart/form-data");
		
		var formData = new FormData($("#registerForm")[0]);
		formData.append("imgBase64",encodeURIComponent(fileImg));//
		formData.append("fileFileName","photo.jpg");
		
		
		$.ajax({  
	        url: "",
	        type: 'POST',  
	        data: formData,  
	        timeout : 10000, //超时时间设置，单位毫秒
	        async: true,  
	        cache: false,  
	        contentType: false,  
	        processData: false, 
	        success: function (result) { 
	       	},  
	        error: function (returndata) {
        		Alert.closedLoading();  
	        }
 		});
	}
</script>

</html>
