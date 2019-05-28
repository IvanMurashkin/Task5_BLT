
$(".login-form").submit((e) => {
    e.preventDefault();
    $.post('/login', $(".login-form").serialize(), (data) => {
        let result = JSON.parse(data);
        if(!result.exists) {
            alert(result.message);
        } else {
            alert(result.message);
            window.location.pathname = '/';
        }
    });
});

$(".registration-form").submit((e) => {
    e.preventDefault();
    $.post('/registration', $(".registration-form").serialize(), (data) => {
        let result = JSON.parse(data);
        if(result.exists) {
            alert(result.message);
        } else {
            window.location.pathname = '/';
        }
    });
});
