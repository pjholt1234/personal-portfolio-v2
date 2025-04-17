import { Card } from "@shared-ui";
import { FC } from "react";
import { formatDateTime } from "@helpers";
import styles from './EventCard.module.scss';

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
        <Card className={styles.eventCard} prefix={renderPrefix()} title={event.title} subtitle={event.subtitle} description={event.description} />
    )
}

export default EventCard;