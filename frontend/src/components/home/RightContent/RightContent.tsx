import { FC } from "react";
import {mergeClassNames} from "@helpers";
import styles from "./RightContent.module.scss";
import {usePanel} from "@/hooks/PanelContext";
import ProjectPanel from "@components/home/ProjectPanel/ProjectPanel";
import AnimatedPanel from "@components/shared-ui/AnimatedPanel/AnimatedPanel";
import ExperiencePanel from "@components/home/ExperiencePanel/ExperiencePanel";

interface RightContentProps {
    className?: string;
}

const RightContent: FC<RightContentProps> = ({ className }) => {
    const { currentPanel } = usePanel();

    return (
        <div className={mergeClassNames(className, styles.content)}>
            <AnimatedPanel isVisible={currentPanel === "home"}>
                <h1>Home</h1>
            </AnimatedPanel>
            <AnimatedPanel isVisible={currentPanel === "projects"}>
                <ProjectPanel />
            </AnimatedPanel>
            <AnimatedPanel isVisible={currentPanel === "experience"}>
                <ExperiencePanel />
            </AnimatedPanel>
        </div>
    );
};

export default RightContent;
