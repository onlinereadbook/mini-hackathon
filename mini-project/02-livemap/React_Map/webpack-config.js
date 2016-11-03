var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    csswring = require('csswring'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {

    var outputpath = options.outputpath,
        entry = {
            bundle: null
        },
        loaders = [],
        resolve = {
            alias: {},
            extensions: ['', '.css', '.scss', '.js']
        },
        plugins = [
            new webpack.HotModuleReplacementPlugin()
        ];

    switch (options.status) {
        case 'dev':

            entry.bundle = [
                'webpack-dev-server/client?http://localhost:8888',
                'webpack/hot/only-dev-server',
                './app/src/main'
            ];

            loaders.push(
                { test: /\.scss$/, loader: 'style!css!postcss!sass?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib') },
                { test: /\.css$/, loader: 'style!css' },
                { test: /\.(jpg|png|gif)$/, loader: 'url-loader' },
                { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.(js|jsx)$/, loader: 'babel', include: path.join(__dirname, 'app/src'), query: { presets: ['es2015', 'react', 'stage-2'] } }
            );

            break;
        case 'deploy':

            entry.bundle = './app/src/main';

            loaders.push(
                { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')) },
                { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
                { test: /\.(jpg|png|gif)$/, loader: 'url-loader' },
                { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
                { test: /\.(js|jsx)$/, loader: 'babel', include: path.join(__dirname, 'app/src'), query: { presets: ['es2015', 'react', 'stage-2'] } }
            );

            plugins.push(
                // new HtmlWebpackPlugin({
                //     filename : 'index.html',
                //     template : 'app/index.html',
                //     //favicon : 'app/favicon.ico'
                // }),
                new ExtractTextPlugin('assets/styles/[name].css'),
                new webpack.optimize.UglifyJsPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.NoErrorsPlugin()
            )

            break;
    }


    return {
        entry: entry,
        output: {
            path: outputpath,
            filename: 'js/[name].js',
            sourceMapFilename: "app.js.map"
        },
        module: {
            loaders: loaders,
            preLoaders: [{ test: /\.js$/, loaders: ['source-map'] }]
        },
        postcss: [autoprefixer, csswring],
        resolve: resolve,
        plugins: plugins,
        devtool: 'cheap-eval-source-map'

    }
}
