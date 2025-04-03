import {useEffect, useState} from "react";
import {getEvents} from "@/api";
import AnimatedCard from "@components/shared-ui/AnimatedCard/AnimatedCard";
import {usePanel} from "@/hooks/PanelContext";
import EventCard from "@components/home/EventCard/EventCard";
import styles from "@components/home/ExperiencePanel/ExperiencePanel.module.scss";

const ExperiencePanel = () => {
    const [events, setEvents] = useState<CareerEvent[]>([]);
    const { currentPanel } = usePanel();
    const isVisible = currentPanel === "experience";


    useEffect(() => {
        getEvents()
            .then((response) => {
                setEvents(response.data ?? []);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <>
            <h1>Experience</h1>
            <div className={styles['experience-panel--cards']}>
                {events?.length > 0 ? (
                    events?.map((event: CareerEvent, index: number) => (
                        <AnimatedCard key={event.id} index={index} isVisible={isVisible}>
                            <EventCard event={event} />
                        </AnimatedCard>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </>
    )
}

export default ExperiencePanel;