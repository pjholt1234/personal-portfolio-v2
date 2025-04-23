import styles from "./CardHeading.module.scss";
import { Typography } from "@shared-ui";
import { FC } from "react";
import {ArrowOutward} from "@mui/icons-material";


interface CardHeadingProps {
    title: string;
    subtitle?: string;
}

const CardHeading: FC<CardHeadingProps> = ({ title, subtitle }) => {
    let titleText = title;

    if(subtitle){
        titleText = `${title} - ${subtitle}`;
    }

    return (
        <Typography
            component="h4"
            className={styles.heading}
        >
            {titleText} <ArrowOutward className={styles['heading__icon']} fontSize="small" />
        </Typography>
    )

}

export default CardHeading;