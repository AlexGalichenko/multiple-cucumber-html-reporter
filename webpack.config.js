const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./vue/main.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|ttf|eot)$/,
                use: [
                    "file-loader"
                ]
            },
            {   test: /\.vue$/,
                loader: ["vue-loader"]
            },
            {
                test: /\.css$/,
                loader: [
                    "vue-style-loader",
                    "css-loader"
                ]
            },
            // {
            //     test: /\.(jpg|png)$/,
            //     use: {
            //         loader: 'url-loader',
            //     },
            // }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./vue/index1.html"
        })
    ]
};
