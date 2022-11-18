/* eslint-env node */
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const srcDir = path.join(__dirname, "src")

module.exports = {
    mode: "production",
    entry: {
        popup: path.join(srcDir, "popup/popup.ts"),
        options: path.join(srcDir, "options/options.ts"),
        background: path.join(srcDir, "background/background.ts"),
        nagging: path.join(srcDir, "nagging/nagging.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                use: "html-loader",
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: [".ts", ".js", ".html"],
    },
    plugins: [],
}
