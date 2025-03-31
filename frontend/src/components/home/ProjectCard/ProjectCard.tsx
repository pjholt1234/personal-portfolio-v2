import Card from "@components/shared-ui/Card/Card";
import Typography from "@components/shared-ui/Typography/Typography";
import {FC} from "react";
import styles from './ProjectCard.module.scss';
import {formatDateTime} from "@helpers";
import Pill from "@components/shared-ui/Pill/Pill";
import { ArrowOutward } from '@mui/icons-material';

interface ProjectCard {
    project: Project;
}

const ProjectCard: FC<ProjectCard> = ({
    project
}) => {
    return (
        <Card className={styles['project-card']}>
            <div className={styles['project-card__hover-effect']}></div>
            <div className={styles['project-card__header']}>
                <Typography component="p" className={styles['project-card__date']}>
                    {project.start_date ? formatDateTime(project.start_date) : 'Unknown'} - {project.end_date ? formatDateTime(project.end_date) : 'Present'}
                </Typography>
                <Typography component="h3" className={styles['project-card__title']}>
                    {project.title}  <ArrowOutward className={styles['project-card__link']} fontSize="small" />
                </Typography>
            </div>
            <Typography component="p" className={styles['project-card__subtitle']}>
                {project.description}
            </Typography>
            <div className={styles['project-card__pills']}>
                {project.technologies.map((technology: string) => (
                    <Pill key={technology} className={styles['project-card__pill']}>
                        {technology}
                    </Pill>
                ))}
            </div>
        </Card>
    )
}

export default ProjectCard;