import {useEffect, useState} from "react";
import {getProjects} from "@/api";
import styles from "@components/home/ProjectPanel/ProjectPanel.module.scss";
import Filters from "@components/shared-ui/Filters/Filters";
import ProjectCard from "@components/home/ProjectCard/ProjectCard";
import AnimatedCard from "@components/shared-ui/AnimatedCard/AnimatedCard";
import {usePanel} from "@/hooks/PanelContext";

const ProjectPanel = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState({ type: "", title: "" });
    const { currentPanel } = usePanel();
    const isVisible = currentPanel === "projects";

    const allFilters: Filter[] = [
        {
            name: "type",
            type: "select",
            placeholder: "Select project type",
            options: [
                { value: "", label: "All" },
                { value: "PERSONAL", label: "Personal" },
                { value: "PROFESSIONAL", label: "Professional" },
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
        <>
            <h1>Projects</h1>
            <Filters filterState={filter} filters={allFilters} setFilter={setFilter} />
            <div className={styles['project-panel--cards']}>
                {filteredProjects?.length > 0 ? (
                    filteredProjects?.map((project, index: number) => (
                        <AnimatedCard key={index} index={index} isVisible={isVisible}>
                            <ProjectCard project={project} />
                        </AnimatedCard>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>
        </>
    );
}

export default ProjectPanel;