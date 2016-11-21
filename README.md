<p align="center">
  <a target="_blank" href="https://www.npmjs.com/package/devu">
    <img src="https://cdn.rawgit.com/VladimirIvanin/devu/master/devu.png">
  </a>
</p>

## Установка

`npm i devu -g`

> Установка только глобально!

## Команды

> Команды запускать в корневой папке темы где ваши media, snippets, templates

`devu --make --snippets logo,cart_widget,nav` - создаст сниппеты, `список обязательно без пробелов`

`devu --make --snippets logo,cart_widget,nav --notstyle` - создаст сниппеты без стилей

`devu --make --template index` - создаст шаблон

`devu --make --spider` - создаст файл фреймворка spider.css в папке media

`devu --stream` - запускает стрим файлов в insales-uploader

`devu --download` - запускает скачивание темы

Пример файла настроек `devufile.json`
```
{
  "scss":{
    "makeSnippetStyle": true,
    "extension": "scss",
    "usePrefix": true,
    "import": true,
    "importFile": "style.scss",
    "directive": "@import"
  },
  "uploader": {
    "account": {
      "id": "4054as6d540a6sd4064065406",
      "token": "012494098076131064684066",
      "url": "shop-0123456.myinsales.ru",
      "http": false
    },
    "theme": {
      "id": "0123456",
      "root": "./",
      "update": true,
      "startBackup": true
    },
    "tools":{
      "openBrowser": {
        "start": true
      },
      "browserSync": {
        "start": true,
        "reloadDebounce": 5000,
        "reloadDelay": 2000
      }
    }
  },
  "spider":{
    "breakpoints": {
      "lg": "1200px",
      "md": "1024px",
      "sm": "768px",
      "xs": "480px",
      "mc": "380px"
    },
    "grid":{
      "breakpoint": "sm",
      "type": "flexbox",
      "columns": 12,
      "gutter_width": "40px",
      "container_width": "1220px",
      "container_type": "stretchy"
    }
  }
}
```
## Настройки

### scss

`makeSnippetStyle` создавать стиль для сниппета?

`extension` расширение создаваемых стилей

`usePrefix` подставлять `_` в название файла? Например `_core.css`

`import` добавлять стоку подключения в файл стилей?

`importFile` файл для подстановки символа

`directive` деректива для импорта

### uploader

Настройки для [insales-uploader](https://github.com/VladimirIvanin/insales-uploader)

### spider

Список настроек фреймворка spider.css
