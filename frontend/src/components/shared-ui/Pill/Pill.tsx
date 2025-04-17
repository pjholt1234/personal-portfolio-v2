import { FC, ReactNode } from "react";
import { mergeClassNames } from "@helpers";
import styles from './Pill.module.scss';

interface PillProps {
    className?: string;
    children: ReactNode;
}

const Pill: FC<PillProps> = ({ className, children }) => {
    return (
        <div className={mergeClassNames(className, styles.pill)}>
            {children}
        </div>
    )
}

export default Pill;