import { FC } from "react";
import {mergeClassNames} from "@helpers";
import styles from "./HomeContent.module.scss";
import { ProjectPanel } from "@projects";
import { AnimatedPanel } from "@shared-ui";
import { ExperiencePanel } from "@events";
import { HomePanel } from "@home";
import {useLocation} from "react-router-dom";

interface HomeContentProps {
    className?: string;
}

const HomeContent: FC<HomeContentProps> = ({ className }) => {
    const { pathname } = useLocation();

    return (
        <div className={mergeClassNames(className, styles.content)}>
            <AnimatedPanel isVisible={pathname === "/"}>
                <HomePanel />
            </AnimatedPanel>
            <AnimatedPanel isVisible={pathname.includes( "projects")}>
                <ProjectPanel />
            </AnimatedPanel>
            <AnimatedPanel isVisible={pathname.includes( "experience")}>
                <ExperiencePanel />
            </AnimatedPanel>
        </div>
    );
};

export default HomeContent;
