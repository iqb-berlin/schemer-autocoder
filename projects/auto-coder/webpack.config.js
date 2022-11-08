// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'production',
  output: {
    filename: 'auto-coder@0.9.js',
    path: path.resolve(__dirname, '../../dist'),
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
};
