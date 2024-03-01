var path = require('path');
var webpack = require('webpack');

var entry = {};

if (process.env.NODE_ENV === 'production') {
  entry["react-dropdowns.min"] = './src/Dropdown.js';
} else {
  entry["react-dropdowns"] = './src/Dropdown.js';
}

module.exports = {
  externals: {
    "classnames": {
      "amd": "classnames",
      "commonjs": "classnames",
      "commonjs2": "classnames",
      "root": "classNames"
    },
    "react": {
      "amd": "react",
      "commonjs": "react",
      "commonjs2": "react",
      "root": "React"
    },
    "react-dom": {
      "amd": "react-dom",
      "commonjs": "react-dom",
      "commonjs2": "react-dom",
      "root": "ReactDOM"
    },
    "react-addons-clicked-away-mixin": {
      "amd": "react-addons-clicked-away-mixin",
      "commonjs": "react-addons-clicked-away-mixin",
      "commonjs2": "react-addons-clicked-away-mixin",
      "root": "ClickedAwayMixin"
    }
  },

  entry: entry,

  // options affecting the output.
  output: {
    // Absolute path to output our bundle file. We build into Flask default static dir.
    path: path.resolve(__dirname, 'dist'),

    // The filename of the entry chunk as relative path inside the `output.path` dir
    filename: '[name].js',

    // name of the global var: "Mondavi"
    library: 'ReactDropdowns',

    // export itself to a global var
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0'
          ],
          plugins: [
            'add-module-exports',
            'syntax-object-rest-spread'
          ]
        }
      }
    ]
  },

  resolve: {
    alias: {
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js']
    }
  }
};