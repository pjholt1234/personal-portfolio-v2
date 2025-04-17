import styles from "./Set.module.scss";
import { FC } from "react";
import { Pill } from "@shared-ui";

interface SetProps extends Block {
    set: any[];
    pills?: boolean;
}

const Set: FC<SetProps> = ({ set, pills = false }) => {
    const renderSetPills = () => {
        return set.map((item: string, index: number) => (
            <Pill className={styles['set__pills--item']} key={index}>
                {item}
            </Pill>
        ));
    }

    if(pills){
        return (
            <div className={styles['set__pills']}>
                {renderSetPills()}
            </div>
        )
    }


    const renderSetItems = () => {
        return set.map((item: string, index: number) => (
            <li key={index} className={styles['set--item']}>
                {item}
            </li>
        ));
    }

    return (
        <ul className={styles['set']}>
            {renderSetItems()}
        </ul>
    );
}

export default Set;