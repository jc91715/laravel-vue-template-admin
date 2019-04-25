// const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//    .sass('resources/sass/app.scss', 'public/css');

const mix = require('laravel-mix')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
require('dotenv').config();

function resolve(dir) {
    return path.join(
        __dirname,
        '/resources/js/admin',
        dir
    );
}
//加载svg
//https://github.com/JeffreyWay/laravel-mix/issues/1423#issuecomment-360731352
Mix.listen('configReady', webpackConfig => {
    // Add "svg" to image loader test
    const imageLoaderConfig = webpackConfig.module.rules.find(
        rule =>
            String(rule.test) ===
            String(/\.(woff2?|ttf|eot|svg|otf)$/)
    );
    imageLoaderConfig.exclude = resolve('icons');
});

mix.webpackConfig({
    plugins: [
        new HtmlWebpackPlugin({
            template: 'resources/js/admin/index.html',
            filename: 'index.html',
            inject: true
        }),
        new SpriteLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': __dirname + '/resources/js/admin'
        },
    },
    module: {
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
    }
});



mix.config.webpackConfig.output = {
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/build/admin/'
};

mix.version()
mix.js('resources/js/admin/bootstrap.js', 'js/bootstrap.js')
    .js('resources/js/admin/app.js', 'js/admin.js')
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery']
    })
    .sass('resources/js/admin/styles/index.scss', 'css/admin.css') // 打包后台css
    .extract(['vue', 'vue-router', 'axios','jquery','lodash','element-ui',]) // 提取依赖库
    .setResourceRoot('/build/admin/') // 设置资源目录
    .setPublicPath('./public/build/admin') // 设置 mix-manifest.json 目录
