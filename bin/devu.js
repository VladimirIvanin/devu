#!/usr/bin/env node
var Liftoff = require('liftoff');
var make = require('../make/make.js');
var argv = require('minimist')(process.argv.slice(2));
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
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
  config['notstyle'] = argv.notstyle
  config = patchConfig(config);
  var _root = env.cwd;
  if (argv['make']) {
    if (argv['template']) {
      make.template(argv['template'], _root, config)
    }
    if (argv['snippets']) {
      make.snippets(argv['snippets'].split(','), _root, config)
    }
    if (argv['spider']) {
      make.spider(_root, config)
    }
  }

  if (argv.stream || argv.download || argv.upload || argv.pull || argv.push) {
    if (!config.uploader) {
      console.log('Нет настроек для insales-uploader')
      return;
    }
    var uploader = new InsalesUploader(config.uploader);
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

function patchConfig(config) {
  var options = {
    scss:{
      makeSnippetStyle: true,
      extension: "scss",
      usePrefix: true,
      prefix: "_",
      import: false,
      importFile: "style.scss",
      directive: "@import"
    },
    spider: {
      breakpoints: {
        lg: "1200px",   // large
        md: "1024px",   // medium
        sm: "768px",    // small
        xs: "480px",    // extra small
        mc: "380px"     // micro
      }
      ,
      grid: {
        breakpoint:       "sm",
        type:             "flexbox",  // flexbox , float
        columns:          12,       // number of columns
        gutter_width:     "40px",     // number in px / em / rem / etc
        container_width:  "1220px",   // number or 'auto',
        container_type:   "stretchy", // static or stretchy
      }
    }
  }
  var result = _.merge(options, config);
  if (result.scss.usePrefix) {
    result.scss.prefix = "_"
  }else{
    result.scss.prefix = ""
  }
  return result;
}
