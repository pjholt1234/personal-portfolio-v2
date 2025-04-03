import styles from './Navigation.module.scss';
import NavigationItem from "@components/home/Navigation/NavigationItem";

const Navigation = () => {
    return (
        <div>
            <nav className={styles.nav}>
                <ul className={styles.nav__items}>
                    <NavigationItem title="Home" location="home" />
                    <NavigationItem title="Experience" location="experience" />
                    <NavigationItem title="Projects" location="projects" />
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;