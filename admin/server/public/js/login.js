window.onload = function() {
}

function selectCode() {
    let imgCtrl = document.querySelector('#codeImg');
    imgCtrl.src = '/sys/code?rand=' + Math.random();
}