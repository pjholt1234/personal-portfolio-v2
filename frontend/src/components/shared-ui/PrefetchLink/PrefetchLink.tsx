import {FC, MouseEvent, ReactNode} from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './PrefetchLink.module.scss';

type PrefetchLinkProps = LinkProps & {
    onHover?: () => void;
    children?: ReactNode;
};

export const PrefetchLink: FC<PrefetchLinkProps> = ({ onHover, onMouseEnter, children, ...props }) => {
    const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
        onHover?.();
        onMouseEnter?.(e);
    };

    return <Link {...props} className={styles.link} onMouseEnter={handleMouseEnter}>{children}</Link>;
};

export default PrefetchLink;
