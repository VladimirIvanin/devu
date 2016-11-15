const fs = require('fs');
const path = require('path');
const createFile = require('create-file');
const _ = require('lodash');
const beautify = require('json-pretty');

const make = {};
make.template = function (names, root, config) {
  if (!names) {
    return;
  }

  _.forEach(names, function (name) {
    let content = {};

    createFile(root + '/templates/' + name + '.liquid', '', function (err) {
      if (err) {
        console.log('Шаблон уже существует');
      }
    });

  })
}

make.snippets = function (snippetsName, root, config) {
  if (!snippetsName) {
    return;
  }
  _.forEach(snippetsName, function (name) {
    createFile(root + '/snippets/' + name + '.liquid', '', function (err) {
      if (err) {
        console.log('Сниппет уже существует');
      }
      if (config.notstyle) {
        console.log('Сниппет создан');
      }
    });
    if (!config.notstyle) {
      createFile(root + '/media/' + config.scss.prefix + name + '.' + config.scss.extension, '', function (err) {
        if (err) {
          console.log('Файл стилей уже существует');
        }
      });
      if (config.scss.import) {
        let importFile = root + '/media/' + config.scss.importFile
        let incSrting = config.scss.derective + ' ' + config.scss.prefix + name + ';\n';
        fs.readFile(importFile,  (err, data) => {
            if (err) {
              createFile(importFile, incSrting, function (err) {
                if (err) {
                  console.log('Файл не может быть создан', importFile);
                }
              });
            }else{
              if (_.includes(data, incSrting)) {
                return;
              }else{
                data += data + incSrting;
                createFile(importFile, data, function (err) {
                  if (err) {
                    console.log('Файл не может быть создан', importFile);
                  }
                });
              }
            }
            console.log('Сниппет создан');
        })
      }
    }
  })
}

module.exports = make;
