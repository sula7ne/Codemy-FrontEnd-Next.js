import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.scss";
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";

interface MarkdownViewerProps {
    markdown: string
}

const MarkdownViewer = ({ markdown }: MarkdownViewerProps) => {
    const { theme } = useTheme();

    return (
        <div className={styles['markdown-viewer']}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        
                        if (match) {
                            return (
                                <SyntaxHighlighter
                                    language={match[1]}
                                    PreTag="div"
                                    showLineNumbers={true}
                                    style={theme === 'dark' ? vscDarkPlus : vs}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            )
                        }

                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {markdown}
            </Markdown>
        </div>
    )
}

export default MarkdownViewer;