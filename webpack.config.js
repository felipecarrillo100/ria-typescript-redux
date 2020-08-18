'use strict';

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

module.exports = (env, argv) => {
  const mode = argv.mode || process.env.NODE_ENV;
  console.log("Mode: " + mode);
  return {
    entry: ['./src/license/index.ts', './src/index.tsx'],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: 'index.js'
    },
    devtool: mode === 'production' ? undefined : "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          include: /src/,               /* (1) This line is important with LuciadRIA */
          use: [
            {
              loader: "eslint-loader",
              options: {
                fix: true
              }
            }
          ]
        },
        {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
        }
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }, {
          test: /\.(css|scss|sass)$/,
          loader: [
            mode === 'production' ?  MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ],
      }, {
        test: /\.(jpe?g|png|gif|xml|svg)$/i,
        use: [{
          //data-url if file size is below 5kb
          loader: 'url-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]',
            limit: 5000
          }
        }]
      }, {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {minimize: true}}
        ]
      }, {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      }, {
        // embed RIA license as b64-encoded string in release
        test: /\.txt$/,
        use: [{loader: './webpack/base64-loader'}],
        include: path.resolve(__dirname, "src/license")
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: /src/,               /* (1) This line is important with LuciadRIA */
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }]
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.scss',
        '.css',
        '.svg',
        '.eof',
        '.woff',
        '.woff2',
        '.ttf',
        '.txt',
        '.xml'
      ]
    },
    plugins: [
      ...(mode === "production" ? [new MiniCssExtractPlugin({filename: "index.css"})] : []),
      new ForkTsCheckerWebpackPlugin({
        async: false
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new webpack.DefinePlugin({
        'PRODUCTION': JSON.stringify((mode.toLowerCase() === "production") ? "production" : undefined),
        'DEVELOPMENT': JSON.stringify((mode.toLowerCase() === "development") ? "development" : undefined),
        'MODE': JSON.stringify(mode.toLowerCase())
      }),
      new CopyWebpackPlugin({
        patterns:[
            {
              from: './static',
              globOptions: {
                ignore: [ '**/static/readme.txt' ]
              }
            }
          ]
      }),
    ],
    devServer: {
      port:3000,
      overlay: {
        warnings: false,
        errors: true
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              unused: false
            }
          }
        })
      ]
    }
  };
};
