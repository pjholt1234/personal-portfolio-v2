import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject } from "@api";
import { MobilePageLayout, PageLayout } from "@global";
import { ProjectContent } from "@project";
import useIsMobile from '@/Hooks/IsMobile';

interface ProjectProps {
}

const Project: FC<ProjectProps> = () => {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const isMobile = useIsMobile();

    if(!slug) {
        return <div>Project not found</div>;
    }

    useEffect(() => {
        getProject(slug)
            .then((data) => {
                setProject(data.data);
            })
            .catch((error) => {
                console.error('Error fetching project:', error);
            });
    }, []);

    if (!project) {
        return <div>Loading...</div>;
    }

    if (isMobile) {
        return (
            <MobilePageLayout>
                <ProjectContent project={project} />
            </MobilePageLayout>
        )
    }

    return (
        <PageLayout>
            <ProjectContent project={project} />
        </PageLayout>
    );
};

export default Project;