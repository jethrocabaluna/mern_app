import webpack from 'webpack'
import path from 'path'

const parentDir = path.join(__dirname, '../')

export default {
    mode: 'development',
    entry: [
        path.join(__dirname, '../client/index.tsx')
    ],
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            Components: path.resolve('../client/src/components/'),
            Pages: path.resolve('../client/src/pages/'),
            Styles: path.resolve('../client/src/styles'),
            Helpers: path.resolve('../client/src/helpers')
        },
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/src/public/js/'),
        filename: 'bundle.js',
        publicPath: 'src/public/js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}