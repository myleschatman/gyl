module.exports = function() {
  var views = './views/';
  var config = {
    alljs: [
      './public/js**/*.js',
      './routes**/*.js',
      './*.js'
    ],
    views: views,
    index: views + 'index.ejs',
    css: [
      './public/css**/*.css'
    ],
    js: [
      './public/js**/*.js'
    ],
    bower: {
      json: require('./bower.json'),
      directory: './public/lib',
      ignorePath: '../public'
    }
  };

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };
  return config;
};
