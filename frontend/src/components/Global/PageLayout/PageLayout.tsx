import {FC, ReactNode} from "react";
import styles from './PageLayout.module.scss'
import { mergeClassNames } from "@helpers";
import {LeftContent} from "@components/Global";


interface PageLayoutProps {
    children: ReactNode;
}


const PageLayout: FC<PageLayoutProps> = ({
    children
}) => {
    return (
        <div className={styles.layout}>
            <div className={mergeClassNames(styles.column, styles.column__left)}>
                <LeftContent />
            </div>
            <div className={mergeClassNames(styles.column, styles.column__right)}>
                {children}
            </div>
        </div>
    )
}

export default PageLayout;