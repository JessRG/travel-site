const path = require('path');

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
];

module.exports = {
  entry: './app/assets/scripts/app.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app') // absolute path for output
  },
  devServer: {
    before: function(app, server) {
      server._watch('./app/**/*.html');
    },
    contentBase: path.join(__dirname, 'app'), // contentBase -> points to the app folder
    hot: true, // hot module replacement -> allows webpack to inject the css and javascript into the browsers memory on the fly w/o refresh
    port: 3000,
    host: '0.0.0.0' // This allows devices on the same network to access the webpack-dev-server from local computer
  },
  mode: 'development',
  // watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader?url=false',
          { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }
        ]
      }
    ]
  }
};
