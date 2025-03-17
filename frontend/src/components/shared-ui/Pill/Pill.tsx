import {FC, ReactNode} from "react";
import {combineClassNames} from "@helpers";
import styles from './Pill.module.scss';

interface PillProps {
    className?: string;
    children: ReactNode;
}

const Pill: FC<PillProps> = ({ className, children }) => {
    return (
        <div className={combineClassNames(className, styles.pill)}>
            {children}
        </div>
    )
}

export default Pill;