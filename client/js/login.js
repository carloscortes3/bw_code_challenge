$(document).ready(() =>{ 
    if (window.localStorage.getItem('email')){
        window.location.replace("dashboard");
    }
    $( "#SignIn" ).click(() => {
        var email = $( "#inputEmail").val();
        var password = $( "#inputPassword").val();
        $.ajax({
            type: 'GET',
            url: `/api/users/${email}&${password}`,
            success: (succ) => {
                delete succ.data.password;
                window.localStorage.setItem("nameF", succ.data.name.first);
                window.localStorage.setItem("nameL", succ.data.name.last);
                for (let key in succ.data) {
                    if (key != 'name'){
                        window.localStorage.setItem(key, succ.data[key]);
                    }
                }
                window.location.replace("dashboard");
            },
            error: (err) => {
                $('#modalBody.modal-body').text(err.responseJSON.msg);
                $('#modal').modal('show');
            }
          });
    });
});
