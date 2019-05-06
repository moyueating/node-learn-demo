function a(){
    console.log('aaaa')
}
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const uglifyJsPlugin = {
    cache: false,
    parallel: true,
    uglifyOptions: {
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: false
        },
        ie8: true,
        ecma: 5,
        mangle: true,
        keep_classnames: true,
        keep_fnames: true
    },
    extractComments: false,
    sourceMap: true
}

module.exports = {
    //source-map配置
    devtool: 'source-map',
    //入口文件
    entry: {
        'smart/smart': [
            'smartdb/client/framework/polyfill/index.js',
            'preact-compat',
            'fastclick'
        ],
        'index': [
            'smartdb/client/styles/common/common.scss',
            'smartdb/client/styles/reset/reset.scss']
    },
    //出口文件
    output: {
        path: path.resolve(__dirname, '../dist/'),
        chunkFilename: '[name].js'
    },
    //缩写
    resolve: {
        extensions: ['.js', '.jsx', '.css', 'scss', 'sass', '.ts'],
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    //插件
    plugins: [
        new UglifyJsPlugin(uglifyJsPlugin),
        new webpack.ProvidePlugin({
            'React': 'preact-compat',
            'react': 'preact-compat',
            'Fastclick': 'fastclick'
        })
    ],
    //拆分
    optimization: {
        minimizer: [
            new UglifyJsPlugin(uglifyJsPlugin)
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(.[\\\/]client[\\\/]framework[\\\/])|node_modules[\\\/](preact|fastclick)/,
                    name: 'smart/smart',
                    priority: 10,
                    chunks: 'all'
                },
                vendors: false,
                default: false
            }
        }
    },
    // 管道配置
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2'
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'font/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|ttf|svg|eot)$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'font/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};

