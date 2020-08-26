$(document).ready(() =>{ 
    if (!window.localStorage.getItem('email')){
        window.location.replace("/");
    }
    if (window.localStorage.getItem('isActive')==="false"){
        $("#mb1text").html("<h6>Your account isn't active, you are not authrized to see your balance</h6>");
    }else{
        $("#mb1text").text(window.localStorage.getItem('balance'));
    }
    $("#email").text(window.localStorage.getItem('email'));
    $("#first").text(window.localStorage.getItem('nameF'));
    $("#last").text(window.localStorage.getItem('nameL'));
    $("#age").text(window.localStorage.getItem('age'));
    $("#eye").text(window.localStorage.getItem('eyeColor'));
    $("#company").text(window.localStorage.getItem('company'));
    $("#phone").text(window.localStorage.getItem('phone'));
    $("#address").text(window.localStorage.getItem('address'));
    $("#ShowBalance").click(()=>{
        $("#modal1").modal('show');
    });
    $("#LogOut").click(()=>{
        $("#modal2").modal('show');
    });
    $("#logOutSuccess").click(()=>{
        localStorage.clear();
        window.location.replace("/");
    });
});