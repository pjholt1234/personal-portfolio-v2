import styles from './Text.module.scss';
import {FC} from "react";

interface TextProps extends Block {
    content?: string;
}

const Text: FC<TextProps> = ({ content }) => {
    return <p className={styles.text}>{content}</p>;
};

export default Text;