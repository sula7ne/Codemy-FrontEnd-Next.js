import Markdown from "react-markdown";
import clsx from "clsx";
import { defaultSchema } from "rehype-sanitize";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import styles from "./Markdown.module.scss";

const schema = {
    ...defaultSchema,
    tagNames: [ "p", "strong", "em", "code", "a" ]
};    

interface MarkdownTaskProps {
    markdown: string,
    isCompleated: boolean
}

const MarkdownTask = ({ markdown, isCompleated }: MarkdownTaskProps) => {
    return (
        <div className={clsx(styles['markdown-task'], isCompleated && styles.complete)}>
            <Markdown
                children={markdown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSanitize, schema]]}
            />
        </div>
    )
}

export default MarkdownTask;