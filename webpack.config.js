const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    watch: true,

    entry: './src/animatedHeadline.es6',

    output: {
        filename: 'build/animatedHeadline.js',
        libraryTarget: "umd"
    },


    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin("/build/animatedHeadline.css")
    ],

    module: {

        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },

            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: NODE_ENV == 'development',
                                minimize: NODE_ENV == 'production'
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: NODE_ENV == 'development'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['last 4 version']
                                    })
                                ],
                                sourceMap: 'inline'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: NODE_ENV == 'development'
                            }
                        }
                    ]
                })

            },

            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=100000'
            }

        ]
    },

    devtool: NODE_ENV == 'development' ? "source-map" : false

};


if (NODE_ENV == 'production') {

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}