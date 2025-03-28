import { FC, ReactNode } from "react";
import {mergeClassNames} from "@helpers";
import styles from "./RightContent.module.scss";
import {usePanel} from "@/hooks/PanelContext";
import ProjectPanel from "@components/home/ProjectPanel/ProjectPanel";

interface RightContentProps {
    className?: string;
}

const RightContent: FC<RightContentProps> = ({ className }) => {
    const { currentPanel } = usePanel();

    const renderPanel = (): ReactNode => {
        switch (currentPanel) {
            case "home":
                return <h1>Home</h1>;
            case "projects":
                return <ProjectPanel />;
            case "experience":
                return <h1>Experience</h1>;
            default:
                return <h1>Home</h1>;
        }
    }

    return (
        <div className={mergeClassNames(className, styles.content)}>
            {renderPanel()}
        </div>
    );
};

export default RightContent;
