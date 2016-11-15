var fs = require('fs');
var path = require('path');
var createFile = require('create-file');
var writeFile = require('write');
var _ = require('lodash');
var beautify = require('json-pretty');

var make = {};
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
          console.log('Шаблон не может быть создан');
        }
    })
  })
}

make.snippets = function (snippetsName, root, config) {
  if (!snippetsName) {
    return;
  }
  _.forEach(snippetsName, function (name) {
    name = _.trim(name)
    createFile(root + '/snippets/' + name + '.liquid', '', function (err) {
      if (err) {
        console.log('Сниппет '+name+' не может быть создан');
      }else{
        console.log('Сниппет '+name+' создан');
      }
    });
    if (!config.notstyle) {
      createFile(root + '/media/' + config.scss.prefix + name + '.' + config.scss.extension, '', function (err) {
        if (err) {
          console.log('Файл стилей уже существует');

        }
      });
    }
  })

  if (!config.notstyle && config.scss.import) {
    var importFile = root + '/media/' + config.scss.importFile;

    fs.readFile(importFile,  (err, data) => {
        if (err) {
          var newData = '';
          var mainInc = '';
          _.forEach(snippetsName, function (name) {
            var incSrting = config.scss.derective + ' ' + config.scss.prefix + name + ';\n';
            var incName = config.scss.derective + ' ' + config.scss.prefix + name;
            if (!_.includes(newData, incName)) {
              mainInc += incSrting;
            }
          })

          newData = newData + mainInc;
          createFile(importFile, incSrting, function (err) {
            if (err) {
              console.log('Файл не может быть создан', importFile);
            }
          });
        }else{
          var newData = data.toString('utf8');
          var mainInc = '';
          _.forEach(snippetsName, function (name) {
            var incSrting = config.scss.derective + ' ' + config.scss.prefix + name + ';\n';
            var incName = config.scss.derective + ' ' + config.scss.prefix + name;
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
