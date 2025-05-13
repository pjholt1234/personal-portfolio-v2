import {FC} from "react";
import styles from "./YoutubeEmbed.module.scss";
interface YoutubeEmbedProps extends Block {
    url: string;
}

const YoutubeEmbed: FC<YoutubeEmbedProps> = ({ url }) => {
    console.log(url);
    return (
        <div className={styles.youtubeEmbed}>
            <iframe
                src={url}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default YoutubeEmbed;