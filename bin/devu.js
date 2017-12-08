#!/usr/bin/env node
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var InsalesUploader = require('insales-uploader');
var Promise = require('promise');

var devu = new Liftoff({
  name: 'devu',
  moduleName: 'devu',
  configName: 'devufile',
  extensions: {
    '.js': null,
    '.json': null,
    '.coffee': 'coffee-script/register'
  },
  v8flags: ['--harmony']
}).on('require', function (name, module) {
  console.log('Loading:',name);
}).on('requireFail', function (name, err) {
  console.log('Unable to load:', name, err);
}).on('respawn', function (flags, child) {
  console.log('Detected node flags:', flags);
  console.log('Respawned to PID:', child.pid);
});

var invoke = function (env) {
  var config =  {};
  if (env.configPath) {
    config = require(env.configPath);
  }
  if (!config.uploader) {
    console.log('Нет настроек для insales-uploader')
    return;
  }

  if (config.uploader.usePostCss) {
    if (!config.uploader.tools) {
      config.uploader.tools = {};
    }
    config.uploader.tools.postCssPlugins = postCssPlugins;
  }

  var uploader = new InsalesUploader(config.uploader);

  var methods = [];
  if (argv['_'].length == 0) {
    methods.push(uploader.start)
  }else {
    for (var i = 0; i < argv['_'].length; i++) {
      var method = argv['_'][i];
      if (alias[method]) {
        methods.push(uploader[alias[method]]());
      }
    }
  }

  Promise.all[methods];
};

devu.launch({
  cwd: argv.cwd,
  configPath: argv.myappfile,
  require: argv.require,
  completion: argv.completion
}, invoke);

var postCssPlugins = [
  require('postcss-nested')(),
  require('postcss-flexbugs-fixes')(),
  require('postcss-discard-duplicates')(),
  require('postcss-discard-empty')(),
  require('postcss-ordered-values')(),
  require('postcss-combine-duplicated-selectors')(),
  require('stylefmt')()
]

var alias = {
  start: 'start',
  stream: 'stream',
  download: 'download',
  upload: 'upload',
  pull: 'pullTheme',
  assets: 'initAssets',
  push: 'pushTheme'
}
