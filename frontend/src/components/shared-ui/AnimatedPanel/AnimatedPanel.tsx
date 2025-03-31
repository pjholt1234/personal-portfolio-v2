import { FC, ReactNode } from "react";
import styles from "./AnimatedPanel.module.scss";

interface AnimatedPanelProps {
    children: ReactNode;
    isVisible: boolean;
}

const AnimatedPanel: FC<AnimatedPanelProps> = ({ children, isVisible }) => {
    return (
        <div className={`${styles.panel} ${isVisible ? styles.visible : styles.hidden}`}>
            {children}
        </div>
    );
};

export default AnimatedPanel; 