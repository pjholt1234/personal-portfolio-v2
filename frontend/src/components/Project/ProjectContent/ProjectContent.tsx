import {FC} from "react";
import {BlockRenderer} from "@utils";
import {formatDateTime, mergeClassNames} from "@helpers";
import styles from "./ProjectContent.module.scss";
import {Pill} from "@shared-ui";

interface ProjectContentProps {
    project: Project;
}

const ProjectContent: FC<ProjectContentProps> = ({ project }) => {
    const renderDate = () => {
        let startDate = 'Unknown';

        if(project.start_date) {
            startDate = formatDateTime(project.start_date)
        }

        let endDate = 'Present';
        if(project.end_date) {
            endDate = formatDateTime(project.end_date)
        }

        return `${startDate} - ${endDate}`;
    }

    const renderTechnologyPills = () => {
        return (
            <div className={styles.technologies}>
                {project.technologies.map((technology: string) => (
                    <Pill key={technology} className={styles['project-card__pill']}>
                        {technology}
                    </Pill>
                ))}
            </div>
        )
    }

    return (
        <div className="headed-layout">
            <div className={mergeClassNames("headed-layout--header")}>
                <div className={styles.header}>
                    <h1 className={styles['header--title']}>{project.title}</h1>
                    <div className={styles['header--subtitle-container']}>
                        <h2 className={styles['header--subtitle']}>{project.subtitle}</h2>
                        <h3 className={styles['header--date']}>{renderDate()}</h3>
                    </div>
                </div>
                {renderTechnologyPills()}
            </div>
            <div className="headed-layout--content">
                <BlockRenderer blocks={project.blocks} />
            </div>
        </div>
    );
};

export default ProjectContent;