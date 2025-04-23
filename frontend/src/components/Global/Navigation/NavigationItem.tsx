import styles from './Navigation.module.scss';
import { Typography } from "@shared-ui";
import { FC } from "react";
import { mergeClassNames } from "@helpers";
import { getBlocks, getEvents, getProjects } from "@/api";
import {useLocation, useNavigate} from "react-router-dom";

interface NavigationItemProps {
    title: string;
    location: string;
}

const NavigationItem:FC<NavigationItemProps> = ({ title, location }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    let isActive = pathname.includes(location);
    if(location === "/") {
        isActive = pathname === "/";
    }

    const handleMouseEnter = () => {
        if (location === "/projects") {
            getProjects()
                .catch((error) => console.error("Error prefetching projects:", error));
        }

        if (location === "/experience") {
            getEvents()
                .catch((error) => console.error("Error prefetching events:", error));
        }

        if (location === "/") {
            getBlocks("page", "home", true)
                .catch((error) => console.error("Error prefetching home blocks:", error));
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
                onClick={() => navigate(location)}
            >
                <Typography component="h3" className={isActive ? styles.active : ""}>
                    {title}
                </Typography>
            </button>
        </li>
    )
}

export default NavigationItem;