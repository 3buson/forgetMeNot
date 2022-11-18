/* eslint-env node */
const path = require("path")
const srcDir = path.join(__dirname, "src")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const filesToCopy = [
    { source: "src/nagging/nagging.css", dest: "nagging" },
    { source: "src/nagging/nagging.html", dest: "nagging" },
    { source: "src/options/options.css", dest: "options" },
    { source: "src/options/options.html", dest: "options" },
    { source: "src/popup/popup.css", dest: "popup" },
    { source: "src/popup/popup.html", dest: "popup" },
    { source: "src/shared/common.css", dest: "shared" },
]
const copyWebpackPluginPatterns = filesToCopy.map(fileToCopy => {
    return { from: fileToCopy.source, to: fileToCopy.dest }
})

module.exports = {
    mode: "production",
    entry: {
        "popup/popup": path.join(srcDir, "popup/popup.ts"),
        "options/options": path.join(srcDir, "options/options.ts"),
        "background/background": path.join(srcDir, "background/background.ts"),
        "nagging/nagging": path.join(srcDir, "nagging/nagging.ts"),
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
                test: /\.(css|html)$/i,
                loader: "file-loader",
                options: {
                    name: "[path]/[name].[ext]",
                },
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: [".ts", ".js", ".css", ".html"],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: copyWebpackPluginPatterns,
        }),
    ],
}
