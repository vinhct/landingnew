var urlApi = "http://apiportal.zumclub.org/api";
$(document).ready(function(){
    getCapchaZum();
    zumgetParaMKT();


    $('#checkboxdk').on('change', function () {
        this.value = this.checked ? 1 : 0;
        $("#checkboxdk").val(this.value);
    }).change();
});
$("#refesh").click(function(){
    getCapchaZum();
});

//validate form
$("#btn_reg").click(function(){
 var regex = /^[A-Za-z0-9_.]+$/;
    var checkSpecial = /[A-Za-z0-9_.][*@!#%&()^~{}]+/;

   if($("#username").val()==""){
       $("#error").html("Tên tài khoản không được để trống");
       $("#username").focus();
   }
   else if($("#username").val().length < 6 || $("#username").val().length > 12 ){
        $("#error").html("Tên tài khoản chứa từ 6 - 12 kí tự");
        $("#username").focus();
    }
   else if(!regex.test($("#username").val())){
       $("#error").html("Tên tài khoản chỉ gồm chữ cái hoặc số");
       $("#username").focus();
   }
   else if($("#password").val()==""){
       $("#error").html("Mật khẩu không được để trống");
       $("#password").focus();
   }
    else if($("#password").val()== $("#username").val()){
        $("#error").html("Mật khẩu không được giống với tên tài khoản");
        $("#password").focus();
    }
   else if($("#password").val().length < 6 || $("#password").val().length > 12 ){
       $("#error").html("Mật khẩu chứa từ 6 - 12 kí tự");
       $("#password").focus();
   }
   else if($("#confirmpass").val()==""){
        $("#error").html("Xác nhận mật khẩu không được để trống");
        $("#confirmpass").focus();
    }
   else if($("#password").val()!=$("#confirmpass").val()){
       $("#error").html("Không giống với mật khẩu");
       $("#confirmpass").focus();
   }
   else if($("#txtcapcha").val()==""){
        $("#error").html("Mã xác nhận không được để trống");
        $("#txtcapcha").focus();
    }
   else if($("#txtcapcha").val()==""){
       $("#error").html("Mã xác nhận không được để trống");
       $("#txtcapcha").focus();
   }
   else if($("#checkboxdk").val()== 0){
       $("#error").html("Chưa đọc kỹ điều khoản sử dụng");
       $("#checkboxdk").focus();
   }
    else{
        $("#error").html("");
       registerZum();
    }
});



function getCapchaZum(){
    $.ajax({
        type: "POST",
        url: "http://apiportal.zumclub.org/api?cd=124",
        success: function (result) {
            var data = $.parseJSON(result);
            $("#idcapcha").val(data.id);
            var linkimg="data:image/png;base64,"+data.img;
            $("#capcha").attr("src",linkimg);
        }
    });
}

function zumgetParaMKT(){
    $("#utmcampain").val(getParameterByName("utm_campaign"));
    $("#utmmedium").val(getParameterByName("utm_medium"));
    $("#utmsource").val(getParameterByName("utm_source"));
}
function registerZum()
{
    $.ajax({
        type: "POST",
        url: "http://apiportal.zumclub.org/api",
        data: {
            cd:"901",
            un:$("#username").val(),
            pw:md5($("#password").val()),
            cp:$("#txtcapcha").val(),
            cid:$("#idcapcha").val(),
            utm_campaign:$("#utmcampain").val(),
            utm_medium:$("#utmmedium").val(),
            utm_source:$("#utmsource").val()
        },
        success: function (result) {
            var data = $.parseJSON(result);
            if(data.errorCode=="1001"){
                $("#error").html("Lỗi hệ thống");
            }
            if(data.errorCode=="101"){
                $("#error").html("Tên tài khoản không hợp lệ");
                getCapchaZum();
            }
            if(data.errorCode=="1006"){
                $("#error").html("Tên tài khoản đã tồn tại");
                getCapchaZum();
            }
            if(data.errorCode=="115"){
                $("#error").html("Mã xác nhận không đúng");
                getCapchaZum();
            }
            if(data.errorCode=="1114"){
                $("#error").html("Hệ thống bảo trì");
                getCapchaZum();
            }
            if(data.errorCode=="0"){
                zumcheckmobile();
            }
        }
    });
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function zumcheckmobile(){

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        Windows_Phone: function() {
            return navigator.userAgent.match(/Windows Phone/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if(isMobile.iOS() ){
        setTimeout(function(){location.href="https://zum.club/download"} , 1);
    }
    else if(isMobile.Android() ){
        setTimeout(function(){location.href="http://android.zumclub.net"} , 1);
    }
    else{
        setTimeout(function(){location.href="http://zum.club?a="+Base64.encode($("#username").val())+"&b="+Base64.encode(md5($("#password").val()))} , 1);
    }
}