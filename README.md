## Установка

`npm i devu -g`

> Установка только глобально!

## Команды

> Команды запускать в корневой папке темы где ваши media, snippets, templates

`devu --make --snippets logo,cart_widget,nav` - создаст сниппеты, `список обязательно без пробелов`

`devu --make --snippets logo,cart_widget,nav --notstyle` - создаст сниппеты без стилей

`devu --make --template index` - создаст шаблон

`devu --make --spider` - создаст файл библиотеки spider.css в папке media 

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
  "spider": {
    "breakpoints": {
      "lg": "1200px",   // large
      "md": "1024px",   // medium
      "sm": "768px",    // small
      "xs": "480px",    // extra small
      "mc": "380px"     // micro
    },
    "grid": {
      "breakpoint":       "sm",
      "type":             "flexbox",  // flexbox , float
      "columns":          12,       // number of columns
      "gutter_width":     "40px",     // number in px / em / rem / etc
      "container_width":  "1220px",   // number or 'auto',
      "container_type":   "stretchy", // static or stretchy
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

### spider

Список настроек библиотеки spider.css
