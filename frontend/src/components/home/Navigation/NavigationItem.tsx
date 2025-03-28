import styles from './Navigation.module.scss';
import Typography from "@components/shared-ui/Typography/Typography";
import {FC} from "react";
import {usePanel} from "@/hooks/PanelContext";
import {mergeClassNames} from "@helpers";
import {getEvents, getProjects} from "@/api";

interface NavigationItemProps {
    title: string;
    location: string;
}

const NavigationItem:FC<NavigationItemProps> = ({ title, location }) => {
    const {currentPanel, setCurrentPanel} = usePanel();
    const isActive = location === currentPanel;

    const handleMouseEnter = () => {
        if (location === "projects") {
            getProjects().catch((error) => console.error("Error prefetching projects:", error));
        }

        if (location === "experience") {
            getEvents().catch((error) => console.error("Error prefetching projects:", error));
        }
    };

    return (
        <li className={styles['nav-item']} onMouseEnter={handleMouseEnter}>
            <hr className={mergeClassNames(
                styles['nav-item__hr'],
                isActive ? styles['nav-item__hr--active'] : ""
            )}/>
            <button
                className={mergeClassNames(
                    styles['nav-item__button'],
                    isActive ? styles['nav-item__button--active'] : ""
                )}
                onClick={() => setCurrentPanel(location)}
            >
                <Typography component="h3" className={isActive ? styles.active : ""}>
                    {title}
                </Typography>
            </button>
        </li>
    )
}

export default NavigationItem;