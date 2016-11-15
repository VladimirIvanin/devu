#!/usr/bin/env node
var Liftoff = require('liftoff');
var make = require('../make/make.js');
var argv = require('minimist')(process.argv.slice(2));
var _ = require('lodash');

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
  if (argv['make']) {
    var _root = env.cwd;
    var config =  {};
    if (env.configPath) {
      config = require(env.configPath);
    }
    config['notstyle'] = argv.notstyle
    config = patchConfig(config);
    if (argv['template']) {
      make.template(argv['template'], _root, config)
    }
    if (argv['snippets']) {
      make.snippets(argv['snippets'].split(','), _root, config)
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
    }
  }
  if (config.usePrefix) {
    config.scss.prefix = "_"
  }else{
    config.scss.prefix = ""
  }
  var result = _.merge(options, config)
  return result;
}
