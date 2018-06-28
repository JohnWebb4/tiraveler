const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve('client/dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        include: path.resolve('client/src'),
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },

<<<<<<< HEAD
  externals: {
    react: 'React',
    'react-router-dom': 'ReactRouterDOM',
    'react-dom': 'ReactDOM',
    'semantic-ui-react': 'semanticUIReact',
    'prop-types': 'PropTypes',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
=======
 externals: {
   react: 'React',
   'react-router-dom': 'ReactRouterDOM',
   'react-dom': 'ReactDOM',
   'semantic-ui-react': 'semanticUIReact',
   'prop-types': 'PropTypes',
   'jquery': 'jQuery'
 },  resolve: {
   extensions: ['.js', '.jsx'],
 },
};
>>>>>>> Build search page
