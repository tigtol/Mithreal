const path = require('path');

const serverConfig = {
    target: ['node'],
    mode: 'development',
    devtool: 'source-map',
    entry: './script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    watch: true,
};

module.exports = [serverConfig];
