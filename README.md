<p align="center">
  <a target="_blank" href="https://www.npmjs.com/package/devu">
    <img src="https://cdn.rawgit.com/VladimirIvanin/devu/master/devu.png">
  </a>
</p>

## Установка

`npm i devu -g`

> Установка только глобально!

## Обновление

`npm i devu@latest -g`

## Команды

> Команды запускать в корневой папке темы где ваши media, snippets, templates

`devu` - запускает скачивание темы, затем стрим файлов в insales-uploader

`devu start` - запускает скачивание темы, затем стрим файлов в insales-uploader

`devu stream` - запускает стрим файлов в insales-uploader

`devu download` - запускает скачивание темы

`devu push` - загрузка темы на сервер с полным обновлением файлов.

`devu pull` - загрузка темы на компьютер. Перед началом загрузки, все локальные файлы удаляются

`devu assets` - сортировать ассеты

`devu --css` - флаг `--css` включает postcss плагины.

## Пример файла настроек `devufile.json`
```
{
  "uploader": {
    "usePostCss": false,
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
  }
}
```
## Настройки

### uploader

Настройки для [insales-uploader](https://github.com/VladimirIvanin/insales-uploader)

В `devu` предустановлены postcss плагины, для их активации нужно прописать свойство `"usePostCss": true`.
