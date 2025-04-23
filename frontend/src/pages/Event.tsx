import { FC } from "react";
import {useParams} from "react-router-dom";

interface EventProps {
}

const Event: FC<EventProps> = () => {
    let params = useParams();

    console.log(params);
    return (
        <div>
            <h1>Event Page</h1>
            <p>This is the event page.</p>
        </div>
    );
};

export default Event;