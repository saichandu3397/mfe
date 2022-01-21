const {merge} = require('webpack-merge'); // used to merge common webpack configuration into dev configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson= require('../package.json');
const devConfig={
    mode:'development',
    devServer:{
        port: 5000,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap'
            },
            shared:packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}


module.exports=merge(commonConfig,devConfig);