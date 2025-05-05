import {FC} from "react";
import {CardHeading, Pill, PrefetchLink, Typography} from "@shared-ui";
import styles from "./Projects.module.scss";
import {preloadProject} from "@helpers";
import {getProject} from "@api";

interface ProjectProps {
    project: Project
}

const Project: FC<ProjectProps> = ({ project }) => {
    console.log(project);
    const renderPills = () => (
        project.technologies.map((technology: string, index: number) => (
            <Pill key={index}>{technology}</Pill>
        ))
    );

    const renderHeader = () => {
        if(project.hidden){
            return <Typography component="h4" className={styles['project--title']}>{project.title}</Typography>;
        }

        return (
            <PrefetchLink
                to={`/projects/${project.slug}`}
                onHover={() => {
                    preloadProject();
                    getProject(project.slug);
                }}
            >
                <CardHeading title={project.title} />
            </PrefetchLink>
        )
    }

    return (
        <div className={styles['project']}>
            {renderHeader()}
            <Typography component="p">{project.description}</Typography>
            <div className={styles['project--pills-wrapper']}>
                {renderPills()}
            </div>
        </div>
    )
}

export default Project;