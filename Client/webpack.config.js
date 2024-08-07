const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.(js|ts)x?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
    },
    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, './dist')
      },
      port: 3030,
      historyApiFallback: true,
      proxy: {
        '/api': {
             target: 'http://localhost:3030',
             router: () => 'http://localhost:3001',
             logLevel: 'debug' /*optional*/
        }
     }
    }
}

// module.exports = {
//     entry: './src/index.jsx',
//     mode: 'development',
//     module: {
//         rules: [
//             {
//                 test: /\.[jt]sx?$/, // сопоставляет файлы .js, .ts, и .tsx
//                 use: { loader: 'babel-loader' }, // использует для указанных типов файлов загрузчик babel-loader (ts-loader не требуется).
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.css$/, // сопоставляет только файлы .css (т.е. не .scss и др.)
//                 use: ['style-loader', 'css-loader'],
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js', 'jsx'],
//     },
//     output: {
//         filename: 'bundle.js', // выходной бандл
//     },
//     devServer: {
//         static: {
//             directory: path.join(__dirname, 'public'),
//         },
//         open: true,
//         port: 3000,
//         hot: true
//     },
//     plugins: [new webpack.HotModuleReplacementPlugin()], // used for hot reloading when developing
//     devtool: 'eval-source-map', // создает высококачественные карты кода
// }
