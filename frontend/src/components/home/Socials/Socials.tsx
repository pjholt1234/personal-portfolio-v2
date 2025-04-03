import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import styles from './Socials.module.scss';

const Socials = () => {
    return (
        <div className={styles.socials}>
            <a className={styles.link} href="https://www.linkedin.com/in/devpj" target="_blank">
                <LinkedInIcon fontSize="large" />
            </a>
            <a className={styles.link} href="https://github.com/pjholt1234" target="_blank">
                <GitHubIcon fontSize="large" />
            </a>
            <a className={styles.link} href="mailto:pjholt1234@gmail.com" target="_blank">
                <EmailIcon fontSize="large" />
            </a>
        </div>
    )
}

export default Socials;