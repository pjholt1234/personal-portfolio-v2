import styles from "./Typography.module.scss";
import {createElement, FC, ReactNode} from "react";
import {combineClassNames} from "@helpers";



interface TypographyProps {
    classNames?: string;
    component?: "p" | "h1" | "h2" | "h3" | "h4";
    children?: ReactNode
}

const Typography: FC<TypographyProps> = ({
    classNames = '',
    component = '',
    children = ''
}) => {

    const attributes = {
        className: combineClassNames(classNames, styles[component]),
    }

    return createElement(component, attributes, children);
}

export default Typography;