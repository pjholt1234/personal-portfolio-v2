import styles from "./Set.module.scss";
import {FC} from "react";

interface SetProps extends Block {
    set: any[];
}

const Set: FC<SetProps> = ({ set }) => {
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