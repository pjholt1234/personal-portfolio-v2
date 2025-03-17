import {FC, ReactNode} from "react";
import Card from "@components/shared-ui/Card/Card";
import Typography from "@components/shared-ui/Typography/Typography";
import {combineClassNames} from "@helpers";
import styles from './LeftContent.module.scss';

interface LeftContentProps {
    className?: string;
    children?: ReactNode;
}

const LeftContent:FC<LeftContentProps> = ({
    className,
    children,
}) => {
    return (
        <div className={combineClassNames(className, styles.content)}>
            <Card className={styles.content__card}>
                <Typography component="h1">
                    PJ Holt
                </Typography>
                <Typography component="h2">
                    Full stack developer
                </Typography>
            </Card>
            {children}
        </div>
    )
}

export default LeftContent;