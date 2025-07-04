import {useEffect, useState} from "react";
import {getProjects} from "@api";
import { ProjectCard } from "@projects";
import { AnimatedCard, Filters } from "@shared-ui";
import useTypewriter from '@/Hooks/useTypewriter';
import useIsMobile from '@/Hooks/IsMobile';
import styles from './ProjectPanel.module.scss';

interface ProjectPanelProps {
  isVisible: boolean;
}

const ProjectPanel = ({ isVisible }: ProjectPanelProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState({ type: "", title: "" });
    const isMobile = useIsMobile();
    const { displayed: typedHeader } = useTypewriter('Projects', 120, isVisible && isMobile);

    const allFilters: Filter[] = [
        {
            name: "type",
            type: "select",
            placeholder: "Select project type",
            options: [
                { value: "", label: "All" },
                { value: "PERSONAL", label: "Personal" },
                { value: "PROFESSIONAL", label: "Professional" },
                { value: "ACADEMIC", label: "Academic" },
            ],
        },
        {
            name: "title",
            type: "search",
            placeholder: "Search projects",
        },
        {
            name: "date_range",
            type: "date_range",
            placeholder: "Select date range",
        },
    ];

    useEffect(() => {
        getProjects()
            .then((response) => {
                setProjects(response.data ?? []);
                setFilteredProjects(response.data);
            })
            .catch((error) => console.error("Error fetching projects:", error));
    }, []);

    useEffect(() => {
        setFilteredProjects(
            projects.filter((project) =>
                allFilters.every((filterItem) => {
                    // @ts-ignore
                    const filterValue = filter[filterItem.name];

                    if (!filterValue) return true;

                    if (filterItem.type === "search") {
                        // @ts-ignore
                        return project[filterItem.name]?.toLowerCase().includes(filterValue.toLowerCase());
                    }

                    if (filterItem.type === "select") {
                        // @ts-ignore
                        return project[filterItem.name] === filterValue;
                    }

                    if (filterItem.type === "date_range" && typeof filterValue === "object") {
                        const projectStart = new Date(project.start_date).getTime();
                        const projectEnd = new Date(project.end_date).getTime();
                        const filterStart = filterValue.start ? new Date(filterValue.start).getTime() : null;
                        const filterEnd = filterValue.end ? new Date(filterValue.end).getTime() : null;

                        return (
                            (!filterStart || projectEnd >= filterStart) &&
                            (!filterEnd || projectStart <= filterEnd)
                        );
                    }

                    return true;
                })
            )
        );
    }, [filter, projects]);

    return (
        <div className="headed-layout">
            <div className="headed-layout__header">
                <h1>{isMobile ? typedHeader : 'Projects'}</h1>
                <AnimatedCard key="project-filters" index={1} isVisible={isVisible}>
                    <Filters filterState={filter} filters={allFilters} setFilter={setFilter} />
                </AnimatedCard>
            </div>
            <div className="headed-layout--content">
                {filteredProjects?.length > 0 ? (
                    filteredProjects?.map((project, index: number) => (
                        <AnimatedCard key={index} index={index} isVisible={isVisible} className={styles['project-card--filter']}>
                            <ProjectCard project={project} />
                        </AnimatedCard>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>
        </div>
    );
}

export default ProjectPanel;