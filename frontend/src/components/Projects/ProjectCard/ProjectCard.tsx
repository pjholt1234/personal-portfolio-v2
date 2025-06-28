import {FC} from "react";
import styles from './ProjectCard.module.scss';
import {formatDateTime, preloadProject, formatProjectType } from "@helpers";
import {Pill, Card, CardHeading, PrefetchLink, Typography} from "@shared-ui";
import {getProject} from "@api";
import useIsMobile from '@/Hooks/IsMobile';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    const isMobile = useIsMobile();
    const renderPrefix = () => {
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

    const renderFooter = () => {
        return (
            <div className={styles['project-card__pills']}>
                {project.technologies.map((technology: string) => (
                    <Pill key={technology} className={styles['project-card__pill']}>
                        {technology}
                    </Pill>
                ))}
            </div>
        )
    }

    const renderTitle = () => {
        return (
            <PrefetchLink
                to={`/projects/${project.slug}`}
                onHover={() => {
                    preloadProject();
                    getProject(project.slug);
                }}
            >
                <CardHeading title={project.title} subtitle={project.subtitle} />
            </PrefetchLink>
        );
    }


    return <Card
        prefix={renderPrefix()}
        title={renderTitle()}
        description={project.description}
        visibleDescription={!isMobile}
        footer={renderFooter()}
    />;
}

export default ProjectCard;