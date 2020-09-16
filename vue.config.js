const path = require('path');
const { resolve } = require('path');
// const webpack = require('webpack')
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        performance: {
            hints: false
        },
        resolve: {
            alias: {
              'vue$': 'vue/dist/vue.esm.js' ,
              'public': path.resolve(__dirname,'../public')
            }
        }    
    },
    chainWebpack: config=> {  //配置css通用变量
        config.module.rule('less').oneOf('vue').use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/variabel.less'),//这个是自己文件的路径
            ],
        })
        // config.plugin('provide').use(webpack.ProvidePlugin, [{
        //     'window.Quill': 'quill/dist/quill.js',
        //     'Quill': 'quill/dist/quill.js'
        // }]);

    },
    css:{//配置css通用变量
            loaderOptions: {
                 less: {
                     javascriptEnabled: true
                }
            }
    },
    devServer: {
        port:80,
        // proxy: {
        //     '/api':{
        //         target:'https://pre-dmagic.amap.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '^/api':''
        //         }
        //     }
        // }
    }
};
