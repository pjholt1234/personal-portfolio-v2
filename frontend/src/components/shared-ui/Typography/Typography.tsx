import styles from "./Typography.module.scss";
import { createElement, FC, ReactNode } from "react";
import { mergeClassNames } from "@helpers";



interface TypographyProps {
    className?: string;
    component?: "p" | "h1" | "h2" | "h3" | "h4";
    children?: ReactNode
}

const Typography: FC<TypographyProps> = ({
    className = '',
    component = '',
    children = ''
}) => {

    const attributes = {
        className: mergeClassNames(className, styles[component]),
    }

    return createElement(component, attributes, children);
}

export default Typography;