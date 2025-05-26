import { FC, ReactNode } from "react";
import styles from "./AnimatedCard.module.scss";

interface AnimatedCardProps {
    children: ReactNode;
    index: number;
    isVisible: boolean;
    className?: string;
}

const AnimatedCard: FC<AnimatedCardProps> = ({ children, index, isVisible, className }) => {
    const delay = index * 0.1;

    return (
        <div 
            className={`${styles.card} ${isVisible ? styles.visible : styles.hidden} ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
};

export default AnimatedCard; 