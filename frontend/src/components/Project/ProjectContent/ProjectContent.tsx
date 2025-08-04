import { FC } from "react";
import { BlockRenderer } from "@utils";
import { formatDateTime, formatProjectType, mergeClassNames } from "@helpers";
import styles from "./ProjectContent.module.scss";
import { Files, Links, Pill, Typography } from "@shared-ui";
import GitHubIcon from "@mui/icons-material/GitHub";
import isMobile from "@/Hooks/IsMobile";
import { Project } from "@/types";

interface ProjectContentProps {
    project: Project;
}

const ProjectContent: FC<ProjectContentProps> = ({ project }) => {
    const renderDate = () => {
        let startDate = 'Unknown';

        if (project.start_date) {
            startDate = formatDateTime(project.start_date)
        }

        let endDate = 'Present';
        if (project.end_date) {
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
            <div className={mergeClassNames("headed-layout__header")}>
                <div>
                    <div className={styles['header--container']}>
                        <Typography component="h2" className="headed-layout__header--title">{project.title}</Typography>
                        {project.github_link && (
                            <a className={styles['github-link']} href={project.github_link} target="_blank">
                                <GitHubIcon fontSize="large" />
                            </a>
                        )}
                    </div>
                    <div className={styles['header--container']}>
                        <Typography component="h3" className="headed-layout__header--subtitle">
                            {project.subtitle ? project.subtitle : renderDate()}
                        </Typography>
                        {!isMobile() && project.subtitle && (
                            <Typography component="h3" className="headed-layout__header--date">{renderDate()}</Typography>
                        )}
                    </div>
                    {isMobile() && project.subtitle && (
                        <div className={styles['header--container']}>
                            <Typography component="h4" className="headed-layout__header--date">{renderDate()}</Typography>
                        </div>
                    )}
                    <div className={styles['header--container']}>
                        <Typography component="p" className="headed-layout__header--type">{formatProjectType(project.type)}</Typography>
                    </div>
                </div>
                <Files files={project.files ?? []} />
                <Links links={project.links ?? []} />
                {renderTechnologyPills()}
            </div>
            <div className="headed-layout--content">
                <BlockRenderer blocks={project.blocks} />
            </div>
        </div>
    );
};

export default ProjectContent;