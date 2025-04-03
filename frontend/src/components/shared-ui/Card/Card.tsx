import styles from './Card.module.scss';
import React, {FC, ReactNode} from "react";
import {mergeClassNames} from "@helpers";
import Typography from "@components/shared-ui/Typography/Typography";
import {ArrowOutward} from "@mui/icons-material";

interface CardProps {
    className?: string;
    prefix?: ReactNode;
    title?: ReactNode | string;
    subtitle?: ReactNode | string;
    description?: string;
    footer?: ReactNode;
}

const Card: FC<CardProps> = ({
    className = '',
    prefix,
    title,
    subtitle,
    description,
    footer
}) => {
    const renderPrefix = () => {
        if (prefix) {
            return (
                <Typography component="p" className={styles['card__prefix']}>
                    {prefix}
                </Typography>
            )
        }

        return null;
    }

    const renderTitle = () => {
        if(React.isValidElement(title)) {
            return title;
        }

        let titleText = title;

        if(typeof subtitle === 'string') {
            titleText = `${title} - ${subtitle}`;

            return (
                <Typography component="h4" className={styles['card__title']}>
                    {titleText} <ArrowOutward className={styles['card__link']} fontSize="small" />
                </Typography>
            )
        }

        if (typeof title === 'string') {
            return (
                <Typography component="h2" className={styles['card__title']}>
                    {title} <ArrowOutward className={styles['card__link']} fontSize="small" />
                </Typography>
            )
        }

        return null;
    }

    const renderDescription = () => {
        if (description) {
            return (
                <Typography component="p" className={styles['card__description']}>
                    {description}
                </Typography>
            )
        }

        return null;
    }


    return (
        <div className={mergeClassNames(className, styles['card'])}>
            <div className={styles['card__hover-effect']}></div>
            <div className={styles['card__header']}>
                {renderPrefix()}
                {renderTitle()}
            </div>
            {renderDescription()}
            {footer}
        </div>
    )
}

export default Card;