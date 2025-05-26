import { FC, useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import {getEvent} from "@api";
import {MobilePageLayout, PageLayout} from "@global";
import {EventContent} from "@event";
import useIsMobile from '@/Hooks/IsMobile';

interface EventProps {
}

const Event: FC<EventProps> = () => {
    let { slug } = useParams();
    const [event, setEvent] = useState<CareerEvent | null>(null);
    const isMobile = useIsMobile();

    if(!slug) {
        return <div>Event not found</div>;
    }

    useEffect(() => {
        getEvent(slug)
            .then((data) => {
                setEvent(data.data);
            })
            .catch((error) => {
                console.error('Error fetching project:', error);
            });
    }, []);

    if (!event) {
        return <div>Loading...</div>;
    }

    if (isMobile) {
        return (
            <MobilePageLayout>
                <EventContent event={event} />
            </MobilePageLayout>
        )
    }

    return (
        <PageLayout>
            <EventContent event={event} />
        </PageLayout>
    );
};

export default Event;