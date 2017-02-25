


var submitcomment = document.getElementById('submit-comment');
submitcomment.onclick = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var comments = request.responseText;  
                comments = JSON.parse(comments);
                var list = '';
                for (var i = 0; i < comments.length; i++) {
                    list += '<li>' + comments[i] + '</li>';
                }
                var ulcomment = document.getElementById('commentlist');
                ulcomment.innerHTML = list;
            }
        }
    };
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET', 'http://kjjiffy.imad.hasura-app.io/submit-comments?comment=' + comment, true);
    request.send(null);
};