import {FC} from "react";
import styles from "./Image.module.scss";
import { Typography } from "@shared-ui";


interface ImageProps extends Block {
    image: Image;
}

const Image: FC<ImageProps> = ({ image }) => {
    const renderDescription = () => {
        if(!image.description) {
            return null;
        }

        return (
            <Typography className={styles['image--description']} component="p">
                {image.description}
            </Typography>
        );
    }
    
    return (
        <div className={styles['image--container']}>
            <img src={image.image_url} alt={image.alt} className={styles.image}/>
            {renderDescription()}
        </div>
    );
};

export default Image;