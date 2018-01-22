// 获取cookie
function getCookie(key) {
    // 如果没有cookie，返回空
    if (document.cookie.length <= 0) return '';

    // 如果不存在cookie，返回空
    let keyStart = document.cookie.indexOf(key + '=');
    if (keyStart < 0) return '';

    keyStart = keyStart + key.length + 1; 
    let keyEnd = document.cookie.indexOf(';', keyStart);
    if (keyEnd == -1) {
        keyEnd = document.cookie.length;
    }
    return unescape(document.cookie.substring(keyStart, keyEnd));
}

// 设置cookie
function setCookie(key, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = key + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
}

function ajaxGet(url, fn) {
    var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
    obj.open('GET', url, true);
    obj.onreadystatechange = function() {
        if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
            fn.call(this, JSON.parse(obj.responseText));  //从服务器获得数据,这里强制为json格式
        }
    };
    obj.send();
}

function ajaxPost(url, data, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    let dataStr = '';
    let split = '';
    for(var i in data) {
        dataStr += split;
        dataStr += i + '=' + data[i];
        split = '&';
    }
    var obj = new XMLHttpRequest();
    obj.open("POST", url, true);
    obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // 添加http头，发送信息至服务器时内容编码类型
    obj.onreadystatechange = function() {
        if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
            fn.call(this, JSON.parse(obj.responseText));    // 这里强制为json格式
        }
    };
    obj.send(dataStr);
}