const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path').resolve;

module.exports = {
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.module\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local',
              },
            },
          },
          {
            loader: 'saas-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss)$/,
        exclude: /\.module\.(s(a|c)ss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:6].css',
      chunkFilename: 'style.[contenthash:6].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path(__dirname, '..', 'public', 'assets'),
          to: path(__dirname, '..', 'build', 'assets'),
        },
      ],
    }),
  ],
};
