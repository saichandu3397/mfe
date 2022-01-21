const {merge} = require('webpack-merge'); // used to merge common webpack configuration into dev configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const devConfig={
    mode:'development',
    devServer:{
        port: 5001,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name:"container",
            remotes:{
                marketing:"marketing@http://localhost:5000/remoteEntry.js"
            },
            shared:packageJson.dependencies

        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}


module.exports=merge(commonConfig,devConfig);