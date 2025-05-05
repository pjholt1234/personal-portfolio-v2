import { FC, useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import {getEvent} from "@api";
import {PageLayout} from "@global";
import {EventContent} from "@event";

interface EventProps {
}

const Event: FC<EventProps> = () => {
    let { slug } = useParams();
    const [event, setEvent] = useState<CareerEvent | null>(null);


    if(!slug) {
        return <div>Project not found</div>;
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


    return (
        <PageLayout>
            <EventContent event={event} />
        </PageLayout>
    );
};

export default Event;