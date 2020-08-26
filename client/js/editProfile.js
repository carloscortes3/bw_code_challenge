$(document).ready(() =>{ 
    $("#email").text(window.localStorage.getItem('email'));
    $("#firstName").val(window.localStorage.getItem('nameF'));
    $("#lastName").val(window.localStorage.getItem('nameL'));
    $("#age").val(window.localStorage.getItem('age'));
    $("#eyeColor").val(window.localStorage.getItem('eyeColor'));
    $("#company").val(window.localStorage.getItem('company'));
    $("#phone").val(window.localStorage.getItem('phone'));
    $("#address").val(window.localStorage.getItem('address'));
    if (window.localStorage.getItem('isActive') == "true"){
        $( "#isActive" ).prop( "checked", true );
    }
    $( "#pswdBtn" ).click(() => {
        var pswd1 = $("#newPassword").val();
        var pswd2 = $("#reNewPassword").val();
        if (pswd1 === pswd2){
            $.ajax({
                type: 'PUT',
                url: `/api/users/password/${window.localStorage.getItem('email')}`,
                data: {
                    current_password: $("#currentPassword").val(),
                    new_password: pswd1,
                },
                success: (succ) => {
                    $('#modalBody3.modal-body').text("You have successfully changed your password!");
                    $("#reNewPassword").val("");
                    $("#newPassword").val("");
                    $("#currentPassword").val("")
                    $('#modal3').modal('show');
                },
                error: (err) => {
                    $('#modalBody1.modal-body').text(err.responseJSON.msg);
                    $('#modal1').modal('show');
                }
            });

        }else{

            $('#modalBody1.modal-body').text("Passwords don't match. Please check and try again!");
            $('#modal1').modal('show');
        }
    });
    $( "#saveChanges" ).click(() => {
        var checked = "false";
        if($("#isActive").is(':checked'))
            checked = "true";
        $.ajax({
            type: 'PUT',
            url: `/api/users/${window.localStorage.getItem('email')}`,
            data: {
                isActive: checked,
                balance: window.localStorage.getItem('balance'),
                age: $( "#age").val(),
                eyeC: $( "#eyeColor").val(),
                firstN: $( "#firstName").val(),
                lastN: $( "#lastName").val(),
                company: $( "#company").val(),
                phone: $( "#phone").val(),
                address: $( "#address").val()
            },
            success: (succ) => {
                $('#modalBody3.modal-body').text("You have successfully changed your user info!");
                $('#modal3').modal('show');
                window.localStorage.setItem("age", $( "#age").val());
                window.localStorage.setItem("eyeColor", $( "#eyeColor").val());
                window.localStorage.setItem("nameF", $( "#firstName").val());
                window.localStorage.setItem("nameL", $( "#lastName").val());
                window.localStorage.setItem("isActive", checked);
                window.localStorage.setItem("company", $( "#company").val());
                window.localStorage.setItem("phone", $( "#phone").val());
                window.localStorage.setItem("address", $( "#address").val());
            },
            error: (err) => {
                $('#modalBody2.modal-body').text(err.responseJSON.msg);
                $('#modal2').modal('show');
            }
        });

    });
});