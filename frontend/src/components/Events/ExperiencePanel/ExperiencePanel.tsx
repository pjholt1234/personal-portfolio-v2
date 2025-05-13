import { useEffect, useState } from "react";
import { getEvents } from "@api";
import { AnimatedCard } from "@shared-ui";
import { EventCard } from "@events";
import {useLocation} from "react-router-dom";

const ExperiencePanel = () => {
    const { pathname } = useLocation();

    const [events, setEvents] = useState<CareerEvent[]>([]);

    const isVisible = pathname === "/experience";


    useEffect(() => {
        getEvents()
            .then((response) => {
                setEvents(response.data ?? []);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <div className="headed-layout">
            <div className="headed-layout__header">
                <h1>Experience</h1>
            </div>
            <div className="headed-layout--content">
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
        </div>
    )
}

export default ExperiencePanel;