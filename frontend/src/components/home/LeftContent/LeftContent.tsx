import {FC, ReactNode} from "react";
import Card from "@components/shared-ui/Card/Card";
import Typography from "@components/shared-ui/Typography/Typography";
import {mergeClassNames} from "@helpers";
import styles from './LeftContent.module.scss';
import Navigation from "@components/home/Navigation/Navigation";

interface LeftContentProps {
    className?: string;
    children?: ReactNode;
}

const LeftContent:FC<LeftContentProps> = ({
    className,
    children,
}) => {
    return (
        <div className={mergeClassNames(className, styles.content)}>
            <Card className={styles.content__card}>
                <Typography component="h1">
                    PJ Holt
                </Typography>
                <Typography component="h2">
                    Full stack developer
                </Typography>
            </Card>
            <Card>
                <Navigation />
            </Card>
            {children}
        </div>
    )
}

export default LeftContent;