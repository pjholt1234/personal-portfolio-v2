import {Card, PrefetchLink} from "@shared-ui";
import { FC } from "react";
import {formatDateTime, preloadEvent} from "@helpers";
import styles from './EventCard.module.scss';
import CardHeading from "@components/shared-ui/CardHeading/CardHeading";
import {getEvent} from "@api";

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
        return (
            <PrefetchLink
                to={`/experience/${event.slug}`}
                onHover={() => {
                    preloadEvent();
                    getEvent(event.slug);
                }}
            >
                <CardHeading title={event.title} subtitle={event.subtitle} />
            </PrefetchLink>
        );
    }

    return(
        <Card className={styles.eventCard} prefix={renderPrefix()} title={renderTitle()} description={event.description} />
    )
}

export default EventCard;