import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.scss";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownViewerProps {
    markdown: string
}

const MarkdownViewer = ({ markdown }: MarkdownViewerProps) => {
    return (
        <div className={styles['markdown-viewer']}>
            <Markdown
                children={markdown}
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        const {children, className, ...rest} = props
                        const match = /language-(\w+)/.exec(className || '')
                        
                        return match ? 
                            <SyntaxHighlighter
                                {...rest}
                                language={match[1]}
                                showLineNumbers={true}
                                style={vscDarkPlus}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                            :
                            <code {...rest} className={className}>
                                {children}
                            </code>
                    }
                }}
            />
        </div>
    )
}

export default MarkdownViewer;