const path = require('path');
const webpack = require("webpack");
module.exports = {
    name : "wordrelay-setting",
    mode : "development",
    devtool : "eval",
    resolve : {
        extensions : ['.js','.jsx']
    },

    entry : {
        app : ['./client'],
    },

    module : {
        rules : [{
            test : /|.jsx?$/,
            loader : 'babel-loader',
            options : {
                presets : [
                    ['@babel/preset-env',{
                    targets : {
                        browsers : ['> 1% in KR','last 2 chrome versions'],
                    },
                    debug : true,
                }],
                '@babel/preset-react',
                ],
                plugins : ["@babel/plugin-proposal-class-properties"],
            },
        }],
    },
    
    output : {
        path : path.join(__dirname,'dist'),
        filename : 'app.js',
    },
};