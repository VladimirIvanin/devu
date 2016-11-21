var fs = require('fs');
var path = require('path');
var createFile = require('create-file');
var writeFile = require('write');
var _ = require('lodash');
var beautify = require('json-pretty');
var gulp = require('gulp');
var sassVars = require('gulp-sass-vars');
var rootbeer = require('rootbeer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var appRoot = require('app-root-path');
var spiderPath = '';
if (_.includes(appRoot.path, 'devu')) {
  spiderPath = path.normalize(appRoot.path + '/spider/src/spider.scss');
  starterPath = path.normalize(appRoot.path + '/starter/');
}else{
  spiderPath = path.normalize(appRoot.path + '/node_modules/devu/spider/src/spider.scss');
  starterPath = path.normalize(appRoot.path + '/node_modules/devu/starter/');
}

var make = {};

make.spider = function (root, config) {
  var breakpoints = '\n$grid-breakpoints: ' + rootbeer.convertJs(config.spider.breakpoints)+ ';' + '\n$grid: ' + rootbeer.convertJs(config.spider.grid) + ';\n';

  breakpoints = breakpoints.replace(/\x22+/g, '');
  breakpoints = breakpoints.replace(/_/g, '-');

  var strVar = '@import "variables";\n @import "variables-default";\n@import "mixins";\n@import "core/mixins";\n@import "core/scaffolding";\n@import "core/elements";\n@import "core/grid";'
  var res = breakpoints + strVar;

  if (config.debugMode) {
    console.log(appRoot);
    console.log(spiderPath);
    console.log(breakpoints);
    console.log(res);
  }
  writeFile(spiderPath, res, function () {
     gulp.src(spiderPath)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
      .pipe(gulp.dest(path.normalize(root + '/media/')))
  })

}

make.starter = function (root, config) {
    gulp.src(starterPath + '*/*.*')
      .pipe(gulp.dest(path.normalize(root)))
}
make.template = function (names, root, config) {
  if (!names) {
    return;
  }

  _.forEach(names, function (name) {
    name = _.trim(name);
    var templateName = root + '/templates/' + name + '.liquid';
    fs.readFile(templateName,  (err, data) => {
        if (err) {
          createFile(root + '/templates/' + name + '.liquid', '', function (err) {
            if (err) {
              console.log('Шаблон не может быть создан');
            }
          });
        }else{
          console.log('Шаблон '+ name +' уже создан');
        }
    })
  })
}

make.snippets = function (snippetsName, root, config) {
  if (!snippetsName) {
    return;
  }
  _.forEach(snippetsName, function (name) {
    name = _.trim(name);
    var snippetPath = root + '/snippets/' + name + '.liquid';
    fs.readFile(snippetPath,  (err, data) => {
      if (err) {
        createFile(snippetPath, '', function (err) {
          if (err) {
            console.log('Сниппет '+name+' не может быть создан');
          }else{
            console.log('Сниппет '+name+' создан');
          }
        });
      }else{
        console.log('Сниппет '+name+' уже создан');
      }
    });
    if (!config.notstyle) {
      if (config.scss.makeSnippetStyle) {
        createFile(root + '/media/' + config.scss.prefix + name + '.' + config.scss.extension, '', function (err) {
          if (err) {
            console.log('Файл стилей уже существует');
          }
        });
      }
    }
  })

  if (!config.notstyle && config.scss.import && config.scss.makeSnippetStyle) {
    var importFile = root + '/media/' + config.scss.importFile;

    fs.readFile(importFile,  (err, data) => {
        if (err) {
          var newData = '';
          var mainInc = '';
          _.forEach(snippetsName, function (name) {
            var incSrting = config.scss.directive + ' "' + name + '";\n';
            var incName = config.scss.directive + ' "' + name;
            if (!_.includes(newData, incName)) {
              mainInc += incSrting;
            }
          })

          newData = newData + mainInc;
          createFile(importFile, newData, function (err) {
            if (err) {
              console.log('Файл не может быть создан', importFile);
            }
          });
        }else{
          var newData = data.toString('utf8');
          var mainInc = '';
          _.forEach(snippetsName, function (name) {
            var incSrting = config.scss.directive + ' "' + name + '";\n';
            var incName = config.scss.directive + ' "' + name;
            if (!_.includes(newData, incName)) {
              mainInc += incSrting;
            }
          })

          newData = newData + mainInc;

          writeFile(importFile, newData, function (err) {
            if (err) {
              console.log('Файл не может быть создан', importFile);
            }
          });
        }
    })
  }
}

module.exports = make;
