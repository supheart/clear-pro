# 认证流程

## 注册流程
1. 前端提交用户和salt经过md5加密后的密码：如password = md5(password + '-' + salt);
2. 后端接收前端的注册信息：先判断是否有重名用户, 然后通过bcrypt加密密码，并且为每个用户生成一个secret存入用户表.

## 登录流程
1. 前端请求登录页，获取登录界面和加密salt;
2. 前端将密码和salt连接然后md5：password = md5(password + '-' + salt);
3. 提交登录请求体 {username: username, passowrd: password, vcode: vcode};
4. 后台获取信息，通过用户名查询用户，然后通过bcrypt对比密码;
5. 根据用户id和用户secret生成登录token，这里会通过jwt中间件自动校验每次请求的token，可配置白名单;
6. 前端获取到返回token，存储在sessionStorage： sessionStorage.setItem('token', data.token);
7. 以后的接口请求，在头部添加:
    ```
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer '+sessionStorage.getItem('token')
    }
    ```
