import { FC, ReactNode } from "react";
import styles from "./AnimatedCard.module.scss";

interface AnimatedCardProps {
    children: ReactNode;
    index: number;
    isVisible: boolean;
}

const AnimatedCard: FC<AnimatedCardProps> = ({ children, index, isVisible }) => {
    const delay = index * 0.1; // 100ms delay between each card

    return (
        <div 
            className={`${styles.card} ${isVisible ? styles.visible : styles.hidden}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
};

export default AnimatedCard; 