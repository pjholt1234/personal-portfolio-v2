import styles from './Text.module.scss';
import { FC } from "react";
import { Typography } from '@shared-ui';
import type { Block } from '@/types';

interface TextProps {
    eyebrow?: string;
    type: string;
    content: string;
}

const Text: FC<TextProps> = ({ eyebrow, type, content }) => {
    if(!content) {
        return null;
    }

    return <div className={styles.text} dangerouslySetInnerHTML={{__html: content}}></div>;
};

export default Text;