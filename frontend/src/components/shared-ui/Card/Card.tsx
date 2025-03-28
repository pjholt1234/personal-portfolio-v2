import styles from './Card.module.scss';
import {FC, ReactNode} from "react";
import {mergeClassNames} from "@helpers";

interface CardProps {
    className?: string;
    children?: ReactNode
}

const Card: FC<CardProps> = ({
    className = '',
    children
}) => {
    return (
        <div className={mergeClassNames(className, styles.card)}>
            {children}
        </div>
    )
}

export default Card;