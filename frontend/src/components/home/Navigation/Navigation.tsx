import styles from './Navigation.module.scss';
import NavigationItem from "@components/home/Navigation/NavigationItem";

const Navigation = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__items}>
                <NavigationItem title="Home" location="home" />
                <NavigationItem title="Experience" location="experience" />
                <NavigationItem title="Projects" location="projects" />
            </ul>
        </nav>
    );
}

export default Navigation;