window.onload = function() {
    initLogin();
}

function initLogin() {
    let userinfo = getCookie('userinfo');
    if(!userinfo || userinfo == 'undefined') {
        return;
    }
    userInfo = JSON.parse(userinfo);
    console.log(userinfo.length, 'length');
    
    document.querySelector('#username').value = userInfo.username;
    document.querySelector('#pdhide').value = userInfo.password;
    document.querySelector('#password').value = '******';
    document.querySelector('#checkPwd').checked = true;
}

function submitCheck() {
    if(!checkInput()) return false;
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let vcode = document.querySelector('#vcode').value;
    let salt = document.querySelector('#salt').value;
    let checkPwd = document.querySelector('#checkPwd').checked;
    let passwordCtrl = document.querySelector('#pdhide');
    let md5Password = md5(password + '-' + salt);
    if(password === '******') {
        md5Password = passwordCtrl.value;
    }
    if(checkPwd) {
        remeberPwd(username, md5Password);
    } else {
        remeberPwd();
    }

    passwordCtrl.value = md5Password;
    ajaxPost('/api/login', {username: username, password: md5Password, vcode: vcode}, (res) => {
        console.log(res);
        if(res.code !== 200) {
            document.querySelector('#errText').innerHTML = res.message;
        }
    });
    // let formCtrl = document.querySelector('#form');
    // formCtrl.submit();
    return false;
}

// 记住密码操作
function remeberPwd(username, password) {
    if(!username || !password) {
        setCookie('userinfo', '', 0);
        return;
    }
    let obj = {
        username: username,
        password: password
    };
    setCookie('userinfo', JSON.stringify(obj), 15);
}

function selectCode() {
    let imgCtrl = document.querySelector('#codeImg');
    imgCtrl.src = '/sys/code?rand=' + Math.random();
}

function checkInput() {
    document.querySelector('#errText').innerHTML = '';
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let vcode = document.querySelector('#vcode').value;
    let errText = '';
    if(!username) {
        errText = '请填写用户名';
        document.querySelector('#errText').innerHTML = errText;
        return false;
    }
    if(!password) {
        errText = '请填写密码';
        document.querySelector('#errText').innerHTML = errText;
        return false;
    }
    if(!vcode) {
        errText = '请填写验证码';
        document.querySelector('#errText').innerHTML = errText;
        return false;
    }
    return true;
}

// 输入验证
function onUserNameInput(event) {
    event.target.value = event.target.value.replace(/[^@_0-9a-zA-Z\u4e00-\u9fa5]/g, '');
}

function onPasswordInput(event) {
    event.target.value = event.target.value.replace(/[^@_0-9a-zA-Z]/g,'')
}

function onCodeInput(event) {
    event.target.value = event.target.value.replace(/[^_0-9a-zA-Z]/g,'')
}