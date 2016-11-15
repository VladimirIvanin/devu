## Установка

`npm i devu -g`

> Установка только глобально!

## Команды

> Команды запускать в корневой папке темы где ваши media, snippets, templates

`devu --make --snippets logo,cart_widget,nav` - создаст сниппеты

`devu --make --snippets logo,cart_widget,nav --notstyle` - создаст сниппеты без стилей

`devu --make --template index` - создаст шаблон

Пример файла настроек `devufile.json`
```
{
  "scss":{
    "extension": "scss",
    "prefix": "_",
    "import": "true",
    "importFile": "style.scss",
    "derective": "@import"
  }
}
```
## Настройки

### scss

`extension` расширение создаваемых стилей

`prefix` префикс для файла

`import` добавлять стоку подключения в файл стилей?

`importFile` файл для подстановки символа

`derective` деректива для импорта
