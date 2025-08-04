import { FC } from "react";
import styles from "./Links.module.scss";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "@/types";

interface LinksProps {
    links: Link[];
}

const Links: FC<LinksProps> = ({ links }) => {
    if (!links || links.length === 0) {
        return null;
    }

    return (
        <div className={styles['links']}>
            {links.map((link) => (
                <a key={link.id} href={link.link} target="_blank" rel="noopener noreferrer" className={styles['links--item']}>
                    <LinkIcon /> {link.name}
                </a>
            ))}
        </div>
    );
};

export default Links; 