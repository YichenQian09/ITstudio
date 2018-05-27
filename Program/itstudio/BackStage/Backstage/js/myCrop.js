window.onload = function () {

  'use strict';
  
  var screenWidth = $(window).width();
  var screenHeight =  $(window).height();
   
  var Cropper = window.Cropper;
  var console = window.console || { log: function () {} };
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var actions = document.getElementById('actions');
  var isUndefined = function (obj) {
    return typeof obj === 'undefined';
  };
 
  var options = {
      minContainerHeight :  screenHeight,
      minContainerWidth : screenWidth,
        aspectRatio: 1/1,//裁剪框比例 1：1
        viewMode : 1,//显示
        guides :false,//裁剪框虚线 默认true有
        dragMode : "move",
        build: function (e) { //加载开始
        	//可以放你的过渡 效果
        },
        built: function (e) { //加载完成
        	$("#containerDiv").show();
            $("#imgEdit").show();
        },
        zoom: function (e) {
          //console.log(e.type, e.detail.ratio);
        },
        background : false,// 容器是否显示网格背景
		movable : true,//是否能移动图片
		cropBoxMovable :true,//是否允许拖动裁剪框
		cropBoxResizable :true,//是否允许拖动 改变裁剪框大小
  };
  $(function(){
      var aaa;
      var type = GetQueryString("type");//type为1--Member type为2--Works type为3--Event type为4--管理员
      //通过标识不同的type来制定不同裁剪框的比例
      if (type == 2)
      {
          aaa = 666 / 527;//（宽比高）
          options.aspectRatio = aaa;
      }
      else if (type == 1) {
          aaa = 1 / 1;
          options.aspectRatio = aaa;
      }
      else {
          aaa = 666 / 527;
          options.aspectRatio = aaa;
      }
     
  })
  //console.log(aaa);
  var cropper = new Cropper(image, options);

  function preventDefault(e) {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }

  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option'),
      secondOption: target.getAttribute('data-second-option')
    };

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            //console.log(e.message);
          }
        }
      }

      if (data.method === 'getCroppedCanvas') {
        data.option = JSON.parse(data.option);
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
        	  
            fileImg = result.toDataURL('image/jpg');
            $("#showImg").attr("src",fileImg).show();
            $("#photoBtn").val("重新选择");
            $("#btnUpload").css({
                "display": "block",
                "margin":"10px auto"
            })
          }

          break;

        case 'destroy':
        	$("#inputImage").val("");
        	$("#containerDiv").hide();
        	$("#imgEdit").hide();
          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          //console.log(e.message);
        }
      }

    }
  };

  // Import image
  var inputImage = document.getElementById('inputImage');
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          cropper.reset().replace(blobURL);
        } else {
          window.alert('Please choose an image file.');
        }
      }
      $(inputImage).find("img").hide();
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }

};
