import { Typography } from '@shared-ui';
import type { Block } from '@/types';
import styles from "./Image.module.scss";

interface ImageProps {
    eyebrow?: string;
    type: string;
    image: string;
    image_alt?: string;
}

const Image: React.FC<ImageProps> = ({ eyebrow, type, image, image_alt }) => {
    return (
        <div className={styles.image}>
            {eyebrow && <Typography variant="eyebrow">{eyebrow}</Typography>}
            <img src={image} alt={image_alt || ''} className={styles.img} />
        </div>
    );
};

export default Image;