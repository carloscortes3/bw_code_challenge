$(document).ready(() =>{ 
    $( "#SignUp" ).click(() => {
        $('#modal2').modal('show');
    });
    $( "#signUpConfirm" ).click(() => {
        var password = $( "#inputPassword").val();
        var Repassword = $( "#inputRePassword").val();
        var checked = "false";
        if($("#isActive").is(':checked'))
            checked = "true";
        if (password !== Repassword){
            $('#modalBody1.modal-body').text("Passwords do not match! Please check and try again!");
            $('#modal1').modal('show');
        }else{
            $.ajax({
                type: 'POST',
                url: `/api/users/`,
                data: {
                    isActive: checked,
                    balance: $( "#balance").val(),
                    age: $( "#age").val(),
                    eyeC: $( "#eyeColor").val(),
                    firstN: $( "#firstName").val(),
                    lastN: $( "#lastName").val(),
                    company: $( "#company").val(),
                    email: $( "#inputEmail").val(),
                    password: password,
                    phone: $( "#phone").val(),
                    address: $( "#address").val()
                },
                success: (succ) => {
                    $('#modal3').modal('show');
                },
                error: (err) => {
                    $('#modalBody1.modal-body').text(err.responseJSON.msg);
                    $('#modal1').modal('show');
                }
              });
        }
    });
    $( "#signUpRedirect" ).click(() => {
        window.location.replace("/");
    });
});