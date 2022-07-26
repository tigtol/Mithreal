const path = require('path');

const serverConfig = {
    target: ['node'],
    mode: 'development',
    devtool: 'source-map',
    entry: './src/server/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    watch: true,
};

const clientConfig = {
    target: ['web'],
    mode: 'development',
    devtool: 'source-map',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    watch: true,
};
module.exports = [serverConfig, clientConfig];
