console.log('Loaded!');
var element = document.getElementById('main_div');
element.innerHTML = 'new value';

var img = document.getElementById('madi');
function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function() {
    var interval = setInterval(moveRight, 100);
};