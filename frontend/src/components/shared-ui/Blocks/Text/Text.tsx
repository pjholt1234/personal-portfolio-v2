import styles from './Text.module.scss';
import { FC } from "react";

interface TextProps extends Block {
    content?: TrustedHTML;
}

const Text: FC<TextProps> = ({ content }) => {
    if(!content) {
        return null;
    }

    return <div className={styles.text} dangerouslySetInnerHTML={{__html: content}}></div>;
};

export default Text;