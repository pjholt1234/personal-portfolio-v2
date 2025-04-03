import Card from "@components/shared-ui/Card/Card";
import {FC} from "react";
import {formatDateTime} from "@helpers";

interface EventCard {
    event: CareerEvent;
}

const EventCard: FC<EventCard> = ({ event }) => {
    const renderPrefix = () => {
        let startDate = 'Unknown';

        if(event.start_date) {
            startDate = formatDateTime(event.start_date)
        }

        let endDate = 'Present';
        if(event.end_date) {
            endDate = formatDateTime(event.end_date)
        }

        return `${startDate} - ${endDate}`;
    }

    return(
        <Card prefix={renderPrefix()} title={event.title} subtitle={event.subtitle} description={event.description} />
    )
}

export default EventCard;