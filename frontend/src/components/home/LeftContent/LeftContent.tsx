import { FC } from "react";
import Typography from "@components/shared-ui/Typography/Typography";
import {mergeClassNames} from "@helpers";
import styles from './LeftContent.module.scss';
import Navigation from "@components/home/Navigation/Navigation";
import Socials from "@components/home/Socials/Socials";

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
                <Typography component="h2">
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