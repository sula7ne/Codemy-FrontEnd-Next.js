import { lesson as lessonType } from "@/types/lesson";

export const lesson: lessonType = {
    id: "1",
    sectionId: "1",
    title: "Тег head, служебная информация о странице",
    order: 1,
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
        {
            type: "folder",
            title: "styles",
            path: "./styles",
            children: [
                {
                    type: "file",
                    title: "style.css",
                    path: "./styles/style.css",
                    extension: "css",
                    code: ``
                }
            ]
        }
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
};