const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development', 
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        //new BundleAnalyzerPlugin()
    ],
    // devServer: {
    //     contentBase: path.join(__dirname, 'public'),
    //     port: 8080
    // }
}