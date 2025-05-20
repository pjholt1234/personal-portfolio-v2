import { FC } from "react";
import styles from "./TextWithImage.module.scss";

interface TextWithImageProps extends Block {
    text: string;
    image: string;
    image_position: 'left' | 'right';
    image_alt: string;
}

const TextWithImage: FC<TextWithImageProps> = ({ text, image, image_position, image_alt }) => {
    return (
        <div className={styles['text-with-image']}>
            <div className={`${styles['text-with-image__content']} ${styles[`text-with-image__content--${image_position}`]}`}>
                <div className={styles['text-with-image__text']}>
                    <div dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                <div className={styles['text-with-image__image']}>
                    <img src={image} alt={image_alt} />
                </div>
            </div>
        </div>
    );
};

export default TextWithImage; 