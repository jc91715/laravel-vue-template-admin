## Laravel 适配 vue-admin-template

### 这是什么
每次写前端或后端的时候，都需要重头开始写，或者从老项目中`ctrl+c`或者`ctrl+v`进行项目初始化的登录模块或者前端的打包配置，使用laravel的同学一般是前后端一起写的，假如前后端分离的话，还要重新开个前端目录，很难受
查阅了相关资料，把[Laravel Passwort](https://learnku.com/docs/laravel/5.8/passport/3907)和[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)结合在一起，可以使用laravel-mix 进行前后端分离,提高生产效率。

### 资料

[手摸手系列](https://juejin.im/post/59097cd7a22b9d0065fb61d2)

[Vue 工程化最佳实践](https://learnku.com/articles/21099)
 
[Laravel Passport 应用一刻社区前端](https://github.com/overtrue/yike.io)

### 体验地址

[地址]()

### 开始使用

#### 下载安装
```
git clone xxxx project
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


##### 适配过程中学到的知识或遇到的坑

###### 1加载.env中的配置
webpack.mix.js 中加入
```
require('dotenv').config();
```
必须以MIX 开头，比如
```
MIX_APP_URL="${APP_URL}"
MIX_TOKEN_KEY="${TOKEN_KEY}"
MIX_CLIENT_ID="${CLIENT_ID}"
MIX_CLIENT_SECRET="${CLIENT_SECRET}"
```
`${APP_URL}`表示加载APP_URL的配置，也可直接设置值
``` 
MIX_APP_URL=xxxx
```

###### 2 `svg` 坑

laravel-mix 已经有对`svg`的loader，需要更改下，要不会使用不了 [detail](https://github.com/JeffreyWay/laravel-mix/issues/1423#issuecomment-360731352)

```
Mix.listen('configReady', webpackConfig => {
    // Add "svg" to image loader test
    const imageLoaderConfig = webpackConfig.module.rules.find(
        rule =>
            String(rule.test) ===
            String(/\.(woff2?|ttf|eot|svg|otf)$/)
    );
    imageLoaderConfig.exclude = resolve('icons');
});
```
``` 
rules: [
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
        ]
```

###### 3退出登录

退出的时候，调用
```
axios.delete(`oauth/tokens/${process.env.MIX_CLIENT_ID}`)
```
不起作用，发现这个路由经过了中间件 `web``auth`中间件，最后简单粗暴的通过清除token的方式退出登录
```
 logout({ commit, state }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
 }
```
###### 4动态路由权限
这个是前端权限判断收获比较大的一点
可以看下 [手摸手，带你用vue撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)

