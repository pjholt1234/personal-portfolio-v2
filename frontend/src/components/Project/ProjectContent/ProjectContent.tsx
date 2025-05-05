import {FC} from "react";
import {BlockRenderer} from "@utils";
import {formatDateTime, mergeClassNames} from "@helpers";
import styles from "./ProjectContent.module.scss";
import {Pill, Typography} from "@shared-ui";
import GitHubIcon from "@mui/icons-material/GitHub";

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
                    <div className={styles['header--container']}>
                        <Typography component="h2" className={styles['header--title']}>{project.title}</Typography>
                        {project.github_link && (
                            <a className={styles['github-link']} href={project.github_link} target="_blank">
                                <GitHubIcon fontSize="large" />
                            </a>
                        )}
                    </div>
                    <div className={styles['header--container']}>
                        <Typography component="h3" className={styles['header--subtitle']}>{project.subtitle}</Typography>
                        <Typography component="h3" className={styles['header--date']}>{renderDate()}</Typography>
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