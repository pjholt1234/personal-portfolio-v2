import styles from './Card.module.scss';
import { FC, ReactNode } from "react";
import { mergeClassNames } from "@helpers";
import Typography from "@components/shared-ui/Typography/Typography";

interface CardProps {
    className?: string;
    prefix?: ReactNode;
    title?: ReactNode | string;
    description?: string;
    footer?: ReactNode;
    children?: ReactNode;
}

const Card: FC<CardProps> = ({
    className = '',
    prefix,
    title,
    description,
    footer,
    children
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

    const renderBody = () => {
        if(children) {
            return children
        }

        return (
            <>
                <div className={styles['card__header']}>
                    {renderPrefix()}
                    {title}
                </div>
                {renderDescription()}
                {footer}
            </>
        )
    }

    return (
        <div className={mergeClassNames(className, styles['card'])}>
            <div className={styles['card__hover-effect']}></div>
            {renderBody()}
        </div>
    )
}

export default Card;