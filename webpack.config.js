const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        'bundle.css': [
            path.resolve(__dirname, 'src/styles/style.css'),
        ],
        'builded.js': [
            path.resolve(__dirname, 'src/index.ts'),
        ]
    },
    // entry: './src/index.ts',
    module: {
        rules: [
            { 
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"], 
                include: [path.resolve(__dirname, 'src')],
            },           
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'public') //absolute path
    },
    resolve: {
        extensions: ['.ts', '.js'] //for module import/export
    },
    devtool: 'eval-source-map',
    mode: 'development',
    // mode: 'production',
}