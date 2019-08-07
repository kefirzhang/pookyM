var Global = Global || {};
Global.pageFunc = function(){
    // 在每个页面里面复写登陆后执行
}
Global.apiUrl = "http://mmapi.pooky.cc/";
document.domain = "pooky.cc";
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
