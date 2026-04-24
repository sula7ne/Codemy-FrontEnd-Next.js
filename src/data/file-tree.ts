import { fileTree as fileTreeType } from "@/types/fileTree";

export const fileTree: fileTreeType = [
    {
        type: "folder",
        title: "component",
        path: "./component",
        children: [
            {
                type: "file",
                title: "component.js",
                extension: 'js',
                path: "./component/component.js",
                code: `component`
            },
            {
                type: "folder",
                title: "s",
                path: "./component/s",
                children: []
            }
        ]
    },
    {
        type: "file",
        title: "index.js",
        extension: 'js',
        path: "./index.js",
        code: `console.log("Hello World!");`
    },
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
        type: "file",
        title: "style.css",
        extension: 'css',
        path: "./style.css",
        code: `h1 {
  color: red;
}`
    },
];