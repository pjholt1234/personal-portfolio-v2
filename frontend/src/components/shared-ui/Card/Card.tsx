import styles from './Card.module.scss';
import {FC, ReactNode} from "react";
import {combineClassNames} from "@helpers";

interface CardProps {
    className?: string;
    children?: ReactNode
}

const Card: FC<CardProps> = ({
    className = '',
    children
}) => {
    return (
        <div className={combineClassNames(className, styles.card)}>
            {children}
        </div>
    )
}

export default Card;