import {FC} from "react";
import styles from "./Files.module.scss";
import DescriptionIcon from "@mui/icons-material/Description";

interface FilesProps {
    files:  File[];  
}

const Files: FC<FilesProps> = ({ files }) => {
    if (!files || files.length === 0) {
        return null;
    }

    return (
        <div className={styles['files']}>
            {files.map((file) => (
                <a key={file.machine_name} href={file.url} target="_blank" className={styles['files--item']}>
                    <DescriptionIcon /> {file.name}
                </a>
            ))}
        </div>
    );
};

export default Files;
