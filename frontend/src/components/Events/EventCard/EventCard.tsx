import { Card } from "@shared-ui";
import { FC } from "react";
import { formatDateTime } from "@helpers";
import styles from './EventCard.module.scss';
import CardHeading from "@components/shared-ui/CardHeading/CardHeading";

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

    const renderTitle = () => {
        return <CardHeading title={event.title} subtitle={event.subtitle} link={`/events/${event.slug}`} />;
    }

    return(
        <Card className={styles.eventCard} prefix={renderPrefix()} title={renderTitle()} description={event.description} />
    )
}

export default EventCard;