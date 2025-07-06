import { FC } from "react";
import { Typography } from "@shared-ui";
import {mergeClassNames} from "@helpers";
import styles from './LeftContent.module.scss';
import { Navigation, Socials } from "@global";

interface LeftContentProps {
    className?: string;
}

const LeftContent:FC<LeftContentProps> = ({
    className,
}) => {
    return (
        <div className={mergeClassNames(className, styles.content)}>
            <div className={styles.content__card}>
                <Typography component="h1">
                    PJ Holt
                </Typography>
                <Typography component="h2" className={styles.subtitle}>
                    Full stack developer
                </Typography>
            </div>
            <Navigation />
            <div className={styles.socials}>
                <Socials />
            </div>
        </div>
    )
}

export default LeftContent;