import { lesson } from "@/types/lesson";

export const lessons: lesson[] = [
    {
        id: "1",
        sectionId: "1",
        title: "Тег head, служебная информация о странице",
        order: 1,
        isCompleted: true,
        theory: `
# Заголовок H1
## Заголовок H2
### Заголовок H3

Это обычный абзац текста. Здесь можно использовать **жирный шрифт**, *курсив* или ~~зачеркивание~~.

---

### 1. Списки

**Маркированный:**
* Элемент 1
* Элемент 2
  * Вложенный пункт
* Элемент 3

**Нумерованный:**
1. Первый пункт
2. Второй пункт

**Чек-лист:**
- [x] Сделано
- [ ] Нужно сделать

---

### 2. Ссылки и изображения

[Название ссылки](https://google.com)

![Альтернативный текст](https://via.placeholder.com/150)

---

### 3. Таблица

| ID | Название | Статус |
| :--- | :--- | :--- |
| 1 | Тема | Готово |
| 2 | Стриминг | В процессе |
| 3 | База данных | Ожидание |

---

### 4. Код

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

Инлайновый код: ${"`const a = 5;`"}

Блок кода (TypeScript):

`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
            {
                id: 2,
                title: `Затем тегу ${"`<link>`"} добавьте атрибут ${"`rel`"} со значением ${"`stylesheet`"}`,
                isCompleted: false,
            },
            {
                id: 3,
                title: `и атрибут ${"`href`"} со значением ${"`style.css`"}`,
                isCompleted: false,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "2",
        sectionId: "1",
        title: "2 lesson Тег",
        order: 1,
        isCompleted: true,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
            {
                id: 2,
                title: `Затем тегу ${"`<link>`"} добавьте атрибут ${"`rel`"} со значением ${"`stylesheet`"}`,
                isCompleted: false,
            },
            {
                id: 3,
                title: `и атрибут ${"`href`"} со значением ${"`style.css`"}`,
                isCompleted: false,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "3",
        sectionId: "1",
        title: "Структура папок",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "4",
        sectionId: "4",
        title: "HTML-ге кіріспе және алғашқы құжат құрылымы",
        order: 1,
        isCompleted: true,
        theory: `
### HTML дегеніміз не?

**HTML** (HyperText Markup Language) — бұл веб-беттерді белгілеу тілі. Егер веб-сайтты үй деп елестетсек, HTML — оның қабырғалары, шатыры мен есіктері, яғни **қаңқасы**. 

Браузер (Chrome, Safari, Edge) HTML кодын оқып, оны біз көріп жүрген веб-бетке айналдырады.

---

### Тегтер: HTML-дің негізгі құрылыс материалы

HTML-дегі барлық нәрсе **тегтерден** тұрады. Тегтер бұрыштық жақшалардың ${"`< >`"} ішіне жазылады. Әдетте тегтер жұп болып келеді:

1. **Ашушы тег:** ${"`<tagname>`"} — элементтің басталғанын білдіреді.
2. **Жабушы тег:** ${"`</tagname>`"} — элементтің аяқталғанын білдіреді.

**Мысалы:**
${"`<h1>Сәлем, әлем!</h1>`"} — мұнда ${"`<h1>`"} тақырыпты бастайды, ал ${"`</h1>`"} оны аяқтайды.

---

### HTML құжатының негізгі құрылымы

Кез келген HTML файлының стандартты қаңқасы болады. Төмендегі кодты кез келген веб-жобаның "іргетасы" деп атауға болады:

~~~html
<!DOCTYPE html>
<html lang="kk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Менің алғашқы сайтым</title>
</head>
<body>
    <h1>Менің веб-парақшама қош келдіңіз!</h1>
    <p>Бұл HTML тілінде жазылған алғашқы сөйлемім.</p>
</body>
</html>
~~~
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
            {
                id: 2,
                title: `Затем тегу ${"`<link>`"} добавьте атрибут ${"`rel`"} со значением ${"`stylesheet`"}`,
                isCompleted: false,
            },
            {
                id: 3,
                title: `и атрибут ${"`href`"} со значением ${"`style.css`"}`,
                isCompleted: false,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Менің веб-парақшама қош келдіңіз!</h1>
    <p>Бұл HTML тілінде жазылған алғашқы сөйлемім.</p>
</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
     {
        id: "5",
        sectionId: "4",
        title: "Мәтіндік тегтер: Тақырыптар мен параграфтар",
        order: 1,
        isCompleted: true,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "6",
        sectionId: "4",
        title: "Тізімдермен жұмыс: Таңбаланған және нөмірленген тізімдер",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "7",
        sectionId: "4",
        title: "Сілтемелер және навигация құру",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "8",
        sectionId: "4",
        title: "Мультимедиа: Суреттер, аудио және видео қосу",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "9",
        sectionId: "4",
        title: "Кестелер және олардың құрылымы",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "10",
        sectionId: "4",
        title: "Формалар: Мәліметтерді енгізу өрістері мен батырмалар",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "11",
        sectionId: "4",
        title: "Семантикалық тегтер және сайттың дұрыс архитектурасы",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "12",
        sectionId: "4",
        title: "CSS-ке кіріспе: Селекторлар және синтаксис",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "13",
        sectionId: "4",
        title: "Түстер және фондық қасиеттер",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "14",
        sectionId: "4",
        title: "Мәтін стильдері және қаріптер (Fonts)",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
    {
        id: "15",
        sectionId: "4",
        title: "JS теория",
        order: 1,
        isCompleted: false,
        theory: `
Тег ${"`<head>`"} предназначен для хранения служебной информации о странице. Он располагается первым в теге ${"`<html>`"}, сразу перед ${"`<body>`"}.

Внутри ${"`<head>`"} обычно содержится заголовок, ключевые слова, описание страницы и другие служебные данные. Также внутри него подключаются внешние ресурсы, например, стили. Содержимое этого тега не отображается на странице напрямую.

Помните, [в первой части](http://a.com) стартового тренажёра мы уже пробовали менять содержимое тега ${"`<head>`"}? Тогда мы с помощью тега ${"`<link>`"} подключали к документу разные CSS-файлы:

~~~html
<head>
    <link href="адрес_файла_стилей.css" rel="stylesheet">
</head> 
~~~

У ${"`<link>`"} в атрибуте ${"`href`"} задаётся адрес стилевого файла, а атрибут ${"`rel`"} со значением ${"`stylesheet`"} говорит браузеру, что мы подключаем именно стили, а не что-то другое.

До этого мы подключали полностью готовые стили дизайна, теперь же подключим специальные стили для прототипирования. Они «проявят» крупные блоки и немного изменят оформление текста. С этими стилями нам будет удобнее проектировать сайт, так как будет видна структура всей страницы.
`,
        tasks: [
            {
                id: 1,
                title: `Добавьте тег ${"`<link>`"} в тег ${"`<head>`"} [в первой части](http://a.com)`,
                isCompleted: true,
            },
        ],
        fileTree: [
            {
                type: "file",
                title: "index.html",
                extension: 'html',
                path: "./index.html",
                code: `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css">
    <title>Web Window</title>
</head>
<body>
    <h1>Hello World!</h1>

</body>
</html>`
            },
        ],
        tabs: [
            {
                title: "index.html",
                extension: "html",
                path: "./index.html",
            },
        ],
        activeTab: "./index.html",
        selectedItem: {
            type: "folder",
            path: "."
        },
        compiledCode: "",
        filePath: "./index.html",
    },
];