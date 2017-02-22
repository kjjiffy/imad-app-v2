console.log('Loaded!');
var element = document.getElementById('main_div');
element.innerHTML = 'new value';

var img = document.getElementById('madi');
img.onclick = function() {
    img.style.marginLeft = '100px';
};