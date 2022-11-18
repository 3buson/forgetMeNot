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
        path: path.join(__dirname, "dist/js"),
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
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                "*.css",
                "*.html",
            ],
            options: {},
        }),
    ],
}
