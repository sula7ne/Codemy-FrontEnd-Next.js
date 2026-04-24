import * as monaco from "monaco-editor";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import Tabs from "@/components/Lesson/CodeEditor/Tabs/Tabs";
import { defineLanguage } from "@/utils/defineLanguage";
import { findFile } from "@/utils/findFile";
import styles from './Editor.module.scss';
import { updateCode } from "@/state/slices/activeLessonSlice";

const MonacoEditor = () => {
    const { activeTab, fileTree } = useAppSelector(state => state.activeLesson);
    const dispatch = useAppDispatch();
    
    const file = findFile(fileTree, activeTab);
    const defaultCode = file?.type === "file" ? file.code : "";
    const extension = file?.type === "file" ? file.extension : "";
    
    const [code, setCode] = useState(defaultCode);

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        setCode(defaultCode);
    }, [defaultCode]); // activeTab стоял

    const handleChange = (value: string | undefined) => {
        if(value !== undefined) {
            setCode(value);
            dispatch(updateCode(value));   
        }
    }

    return (
        <div className={styles['monaco-editor']}>
            {activeTab && 
                <>
                    <Tabs />

                    <Editor
                        width="100%"
                        height="100%"
                        language={defineLanguage(extension)}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false }, 
                            scrollbar: {
                                verticalScrollbarSize: 6, 
                                horizontalScrollbarSize: 6, 
                                useShadows: false,
                            }, 
                            fontSize: 14,
                        }}
                        value={code}
                        onMount={(editor) => {
                            editorRef.current = editor;
                        }}
                        onChange={handleChange}
                    />
                </>
            }
            
        </div>
    );
}

export default MonacoEditor;


// import { loader } from "@monaco-editor/react";

// // you can change the source of the monaco files
// loader.config({ paths: { vs: "..." } });

// // you can configure the locales
// loader.config({ "vs/nls": { availableLanguages: { "*": "de" } } });                options={{minimap: {enabled: false}, scrollbar: {horizontal: 'visible'}}}

// // or
// loader.config({
//   paths: {
//     vs: "...",
//   },
//   "vs/nls": {
//     availableLanguages: {
//       "*": "de",
//     },
//   },
// });

// function App() {
//   return "Hello World";
// }

// export default App;`








// import React, { useEffect, useRef, useState } from "react";

//     const editorRef = useRef(null);
//     const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
//     const [mode, setMode] = useState("arrow"); // "arrow" | "text"

//     // Движение курсора (примерный сценарий)
//     useEffect(() => {
//         const steps = [
//         { x: 150, y: 80, mode: "arrow", delay: 1000 },
//         { x: 200, y: 120, mode: "arrow", delay: 1500 },
//         { x: 210, y: 130, mode: "text", delay: 2000 },
//         { x: 250, y: 130, mode: "text", delay: 2200 },
//         { x: 300, y: 130, mode: "text", delay: 2400 },
//         { x: 350, y: 130, mode: "arrow", delay: 4000 },
//         ];

//         steps.forEach((step) => {
//         setTimeout(() => {
//             setCursorPos({ x: step.x, y: step.y });
//             setMode(step.mode);
//         }, step.delay);
//         });
//     }, []);

//     return (
//         <div style={{ display: "flex", gap: "10px" }}>
//         {/* Левый редактор */}
//         <div style={{ position: "relative", flex: 1 }}>
//             <Editor
//             height="400px"
//             defaultLanguage="javascript"
//             theme="vs-dark"
//             value={`function greet(name) {
//     console.log("Hello, " + name);
//     }

//     greet("World");`}
//             onMount={(editor) => {
//                 editorRef.current = editor;
//             }}
//             />

//             {/* Курсор */}
//             <div
//             style={{
//                 position: "absolute",
//                 top: cursorPos.y,
//                 left: cursorPos.x,
//                 transition: "top 0.3s linear, left 0.3s linear",
//                 pointerEvents: "none",
//             }}
//             >
//             {mode === "arrow" ? (
//                 <div
//                 style={{
//                     width: 0,
//                     height: 0,
//                     borderTop: "10px solid transparent",
//                     borderBottom: "10px solid transparent",
//                     borderLeft: "15px solid white",
//                     transform: "rotate(-30deg)",
//                 }}
//                 />
//             ) : (
//                 <div
//                 style={{
//                     width: "2px",
//                     height: "20px",
//                     background: "white",
//                     animation: "blink 1s step-start infinite",
//                 }}
//                 />
//             )}
//             </div>
//         </div>

//         {/* Справа мини-сайт */}
//         <iframe
//             title="preview"
//             sandbox="allow-scripts"
//             style={{ flex: 1, border: "1px solid #555", height: "400px" }}
//             srcDoc={`<html>
//     <body style="background:#111;color:#0f0;font-family:monospace">
//         <h2>Hello from Preview</h2>
//         <script>console.log("iframe running")</script>
//     </body>
//     </html>`}
//         />

//         <style>{`
//             @keyframes blink {
//             50% { background: transparent; }
//             }
//         `}</style>
//     </div>
//     );