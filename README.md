## Установка

`npm i -g devu`

| Установка только глобально!

## Команды

`devu --make --snippets logo,cart_widget,nav` - создаст сниппеты

`devu --make --snippets logo,cart_widget,nav --notstyle` - создаст сниппеты

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
