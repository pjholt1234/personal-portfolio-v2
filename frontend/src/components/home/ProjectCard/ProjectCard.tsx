import Card from "@components/shared-ui/Card/Card";
import {FC} from "react";
import styles from './ProjectCard.module.scss';
import {formatDateTime} from "@helpers";
import Pill from "@components/shared-ui/Pill/Pill";

interface ProjectCard {
    project: Project;
}

const ProjectCard: FC<ProjectCard> = ({
    project
}) => {

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


    return <Card prefix={renderPrefix()} title={project.title} description={project.description} footer={renderFooter()} />
}

export default ProjectCard;