## Laravel 适配 vue-admin-template

### 这是什么
每次写前端或后端的时候，都需要重头开始写，或者从老项目中`ctrl+c`或者`ctrl+v`进行项目初始化的登录模块或者前端的打包配置，使用laravel的同学一般是前后端一起写的，假如前后端分离的话，还要重新开个前端目录，很难受
查阅了相关资料，把[Laravel Passwort](https://learnku.com/docs/laravel/5.8/passport/3907)和[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)结合在一起，可以使用laravel-mix 进行前后端分离,提高生产效率。

### 资料

[手摸手系列](https://juejin.im/post/59097cd7a22b9d0065fb61d2)

[Vue 工程化最佳实践](https://learnku.com/articles/21099)
 
[Laravel Passport 应用一刻社区前端](https://github.com/overtrue/yike.io)

### 体验地址

[地址](http://laravel-vue-template-admin.jc91715.top)

### 开始使用

#### 下载安装
```
git clone https://github.com/jc91715/laravel-vue-template-admin project
cd project
composer install

```
#### 迁移填充数据库

```
php artisan migrate 
php artisan db:seed
```
#### 配置

```
php artisaan  passport:install

```
把生成的客户端id和secret配置到.env中

```

CLIENT_ID=xxx
CLIENT_SECRET=xxxx

```
把APP_URL 修改成你的虚拟域名

```
APP_URL=
```

#### 前端安装

```
npm install
```
#### 打包

```
npm run dev
```

打包成功后访问你的域名
