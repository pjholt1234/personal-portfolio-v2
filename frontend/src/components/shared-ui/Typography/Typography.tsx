import { createElement, type FC } from 'react';
import { mergeClassNames } from '@helpers';
import styles from './Typography.module.scss';

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    component?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
    variant?: 'eyebrow' | 'body' | 'heading' | 'subheading';
}

const Typography: FC<TypographyProps> = ({
    children,
    className,
    component = 'div',
    variant = 'body'
}) => {
    return createElement(
        component,
        { className: mergeClassNames(styles[variant], className) },
        children
    );
}

export default Typography;