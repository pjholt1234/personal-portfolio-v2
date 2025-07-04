import {FC} from "react";
import {BlockRenderer} from "@utils";
import {formatDateTime, mergeClassNames} from "@helpers";
import {Files, Typography, Card} from "@shared-ui";
import { useParams } from 'react-router-dom';
import type { CareerEvent } from '@/types';

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
            <div className={mergeClassNames("headed-layout__header")}>
                <div>
                    <Typography component="h2" className="headed-layout__header--title">
                        {event.title}
                    </Typography>
                    <div className="headed-layout__header--subtitle-container">
                        <Typography component="h3" className="headed-layout__header--subtitle">{event.subtitle}</Typography>
                        <Typography component="h3" className="headed-layout__header--date" >{renderDate()}</Typography>
                    </div>
                    <Files files={event.files ?? []} />
                </div>
            </div>
            <div className="headed-layout--content">
                <BlockRenderer blocks={event.blocks} />
            </div>
        </div>
    );
};

export default EventContent;