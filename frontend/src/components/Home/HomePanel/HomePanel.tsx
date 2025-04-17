import {FC, useEffect, useState} from "react";
import { getBlocks } from "@api"
import { BlockRenderer } from "@utils";
import {usePanel} from "@/hooks/PanelContext";
import styles from "./HomePanel.module.scss";

interface HomePanelProps {

}

const HomePanel: FC<HomePanelProps> = ({}) => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const { currentPanel } = usePanel();
    const isVisible = currentPanel === "home";

    useEffect(() => {
        getBlocks("page", "home")
            .then((response) => {
                setBlocks(response.blocks ?? []);
            })
            .catch((error) => console.error("Error fetching home page blocks:", error));
    }, []);

    useEffect(() => {}, [blocks]);
    return (
        <div className={styles['home-panel']}>
            <div className={styles['home-panel--cards']}>
                <BlockRenderer blocks={blocks} isVisible={isVisible} />
            </div>
        </div>
    );
};

export default HomePanel;

