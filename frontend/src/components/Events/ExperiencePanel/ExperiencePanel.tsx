import { useEffect, useState } from "react";
import { getEvents } from "@api";
import { AnimatedCard } from "@shared-ui";
import { EventCard } from "@events";
import useTypewriter from '../../../Hooks/useTypewriter';
import useIsMobile from '../../../Hooks/IsMobile';

interface ExperiencePanelProps {
  isVisible: boolean;
}

const ExperiencePanel = ({ isVisible }: ExperiencePanelProps) => {
    const [events, setEvents] = useState<CareerEvent[]>([]);
    const isMobile = useIsMobile();
    const { displayed: typedHeader } = useTypewriter('Experience', 120, isVisible && isMobile);

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
                <h1>{isMobile ? typedHeader : 'Experience'}</h1>
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