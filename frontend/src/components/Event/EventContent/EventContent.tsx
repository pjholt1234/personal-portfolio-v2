import {FC} from "react";
import {BlockRenderer} from "@utils";
import {formatDateTime, mergeClassNames} from "@helpers";
import styles from "./EventContent.module.scss";
import {Typography} from "@shared-ui";

interface EventContentProps {
    event: CareerEvent;
}

const EventContent: FC<EventContentProps> = ({ event }) => {
    const renderDate = () => {
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

    return (
        <div className="headed-layout">
            <div className={mergeClassNames("headed-layout--header")}>
                <div className={styles.header}>
                    <Typography component="h2" className={styles['header--title']}>
                        {event.title}
                    </Typography>
                    <div className={styles['header--subtitle-container']}>
                        <Typography component="h3" className={styles['header--subtitle']}>{event.subtitle}</Typography>
                        <Typography component="h3" className={styles['header--date']}>{renderDate()}</Typography>
                    </div>
                </div>
            </div>
            <div className="headed-layout--content">
                <BlockRenderer blocks={event.blocks} />
            </div>
        </div>
    );
};

export default EventContent;