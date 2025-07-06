import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import styles from './Socials.module.scss';
import { getCV } from '@/Services/CVService';

const CV_FILENAME = 'pj-holt-cv.pdf';

const Socials = () => {
    const handleCVDownload = async () => {
        try {
            const blobUrl = await getCV();
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', CV_FILENAME);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // Clean up the blob URL
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading CV:', error);
        }
    };

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
            <button className={styles.link} onClick={handleCVDownload}>
                <DescriptionIcon fontSize="large" />
            </button>
        </div>
    )
}

export default Socials;