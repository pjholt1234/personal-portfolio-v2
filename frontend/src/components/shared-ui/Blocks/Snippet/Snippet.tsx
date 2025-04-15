import styles from "./Snippet.module.scss";
import { FC } from "react";
import { Copy } from "lucide-react";

interface SnippetProps extends Block {
    content?: string;
}

const Snippet: FC<SnippetProps> = ({ content }) => {
    const handleCopy = () => {
        if (content) {
            navigator.clipboard.writeText(content);
            alert("Snippet copied to clipboard!");
        }
    };

    return (
        <div className={styles['snippet--container']}>
            <pre className={styles['snippet--content']}>
                <code>{content}</code>
            </pre>
            <button className={styles['copy-button']} onClick={handleCopy} aria-label="Copy Snippet">
                <Copy size={16} />
            </button>
        </div>
    );
};

export default Snippet;
