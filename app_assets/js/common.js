var Global = Global || {};
Global.pageFunc = function(){
    // 在每个页面里面复写登陆后执行
}
(function (doc, win) {
    $('#list td,#list li').click(function () {
        location.href = $(this).data('href');
    });

    $('.ui-header .ui-btn').click(function () {
        location.href = 'index.html';
    });

    $("#btn1").click(function () {
        $('.ui-actionsheet').addClass('show');
    });

    $("#cancel").click(function () {
        $(".ui-actionsheet").removeClass("show");
    });
    if ($("body").data("module") != "login") {
        $.ajax({
            type: 'GET',
            url: Global.apiUrl + "IsLogin",
            dataType: 'json',
            timeout: 300,
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                if (response.data != "1") {
                    location.href = '/module/login/login.html';
                } else {
                    Global.pageFunc();//执行每个页面的具体函数
                }
                console.log(response)
            },
            error: function (xhr, type) {
                alert('Ajax error!')
            }
        })
    }
})(document, window);

function LoginOut() {
    $.ajax({
        type: 'GET',
        url: Global.apiUrl + "LoginOut",
        dataType: 'json',
        timeout: 300,
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            if (response.iRet == "0") {
                location.href = '/module/login/login.html';
            } else {
                alert(response.sMsg)
            }
            console.log(response)
        },
        error: function (xhr, type) {
            alert('Ajax error!')
        }
    })
}

function getUrlVal(para){
    var search=location.search; //页面URL的查询部分字符串
    var arrPara=new Array(); //参数数组。数组单项为包含参数名和参数值的字符串，如“para=value”
    var arrVal=new Array(); //参数值数组。用于存储查找到的参数值

    if(search!=""){
        var index=0;
        search=search.substr(1); //去除开头的“?”
        arrPara=search.split("&");

        for(i in arrPara){
            var paraPre=para+"="; //参数前缀。即参数名+“=”，如“para=”
            if(arrPara[i].indexOf(paraPre)==0&& paraPre.length<arrPara[i].length){
                arrVal[index]=decodeURI(arrPara[i].substr(paraPre.length)); //顺带URI解码避免出现乱码
                index++;
            }
        }
    }

    if(arrVal.length==1){
        return arrVal[0];
    }else if(arrVal.length==0){
        return null;
    }else{
        return arrVal;
    }
}
