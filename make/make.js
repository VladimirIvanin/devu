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
              console.log('Шаблон уже существует');
            }
          });
        }else{
          console.log('Шаблон уже существует');
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
        console.log('Сниппет уже существует');
      }
      if (config.notstyle) {
        console.log('Сниппет '+name+' создан');
      }
    });
    if (!config.notstyle) {
      createFile(root + '/media/' + config.scss.prefix + name + '.' + config.scss.extension, '', function (err) {
        if (err) {
          console.log('Файл стилей уже существует');
        }
      });

      if (config.scss.import) {
        var importFile = root + '/media/' + config.scss.importFile
        var incSrting = config.scss.derective + ' ' + config.scss.prefix + name + ';\n';
        fs.readFile(importFile,  (err, data) => {
            if (err) {
              createFile(importFile, incSrting, function (err) {
                if (err) {
                  console.log('Файл не может быть создан', importFile);
                }
              });
            }else{
              if (_.includes(data.toString('utf8'), incSrting)) {
                return;
              }else{
                data += data + incSrting;
                writeFile(importFile, data, function (err) {
                  if (err) {
                    console.log('Файл не может быть создан', importFile);
                  }
                });
              }
            }
            console.log('Сниппет '+name+' создан');
        })
      }
    }
  })
}

module.exports = make;
