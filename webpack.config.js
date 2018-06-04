const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js"
    },
    mode:"development",
    plugins:[
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test:/\.less$/,
                use:["style-loader","css-loader","less-loader"]
            },
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:10000
                        }
                    }
                ]
            }
        ]
    },
    devServer:{
        open: true,
        port: 8888
    }
}