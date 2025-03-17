import {FC, ReactNode} from "react";
import styles from './PageLayout.module.scss'
import {combineClassNames} from "@helpers";


interface PageLayoutProps {
    leftContent: ReactNode;
    rightContent: ReactNode;
}


const PageLayout: FC<PageLayoutProps> = ({
    leftContent,
    rightContent
}) => {
    return (
        <div className={styles.layout}>
            <div className={combineClassNames(styles.column, styles.column__left)}>{leftContent}</div>
            <div className={combineClassNames(styles.column, styles.column__right)}>{rightContent}</div>
        </div>
    )
}

export default PageLayout;