


var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var names = request.responseText;  
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i < names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                var ulcomment = document.getElementById('namelist');
                ulcomment.innerHTML = list;
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(username);
    request.open('POST', 'http://kjjiffy.imad.hasura-app.io/submit-comments?name=' + name, true);
    request.send(JSON.stringify({username: username, password: password}));
};