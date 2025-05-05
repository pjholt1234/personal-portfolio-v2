import {FC} from "react";
import {default as ProjectEl} from "./Project";

interface ProjectsProps extends Block {
    projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
    return (
        <div>
            {projects.map((project, index) => (
                <ProjectEl key={index} project={project} />
            ))}
        </div>
    );
};

export default Projects;