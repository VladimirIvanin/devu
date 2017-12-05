#!/usr/bin/env node
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var InsalesUploader = require('insales-uploader');

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

/**
 * devu --make --template index
 * devu --make --snippets logo,cart_widget,nav
 */
var invoke = function (env) {
  var config =  {};
  if (env.configPath) {
    config = require(env.configPath);
  }
  var _root = env.cwd;

  if (argv.stream || argv.download || argv.upload || argv.pull || argv.push || argv.start) {
    if (!config.uploader) {
      console.log('Нет настроек для insales-uploader')
      return;
    }
    if (config.uploader.usePostCss) {
      if (!config.uploader.tools) {
        config.uploader.tools = {};
      }

      config.uploader.tools.postCssPlugins = [
        require('postcss-nested')(),
        require('postcss-flexbugs-fixes')(),
        require('postcss-discard-duplicates')(),
        require('postcss-discard-empty')(),
        require('postcss-ordered-values')(),
        require('postcss-combine-duplicated-selectors')(),
        require('stylefmt')()
      ]
    }
    var uploader = new InsalesUploader(config.uploader);
    if (argv.start) {
      uploader.start()
    }
    if (argv.stream) {
      uploader.stream()
    }
    if (argv.download) {
      uploader.download()
    }
    if (argv.upload) {
      uploader.upload()
    }
    if (argv.pull) {
      uploader.pullTheme()
    }
    if (argv.push) {
      uploader.pushTheme()
    }
  }
};

devu.launch({
  cwd: argv.cwd,
  configPath: argv.myappfile,
  require: argv.require,
  completion: argv.completion
}, invoke);
