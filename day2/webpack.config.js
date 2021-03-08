const { Module, ModuleFilenameHelpers } = require("webpack");
const path = require("path");

Module.exports = {
    name : "word-relay-setting",
    mode : 'development', //실서비스 production
    devtool : "eval",
    resolve : {
        extensions : [".js",".jsx"]
    },

    entry : {
        app: './client',
    },  //입력
    output : {
        filename : "app.js",
        path : path.join(__dirname,"dist"),
    },  //출력
};