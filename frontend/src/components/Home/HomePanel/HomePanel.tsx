import {FC, useEffect, useState} from "react";
import { getBlocks } from "@api"
import { BlockRenderer } from "@utils";

interface HomePanelProps {
    isVisible: boolean;
}

const HomePanel: FC<HomePanelProps> = ({isVisible}) => {
    const [blocks, setBlocks] = useState<Block[]>([]);

    useEffect(() => {
        getBlocks("page", "home")
            .then((response) => {
                setBlocks(response.blocks ?? []);
            })
            .catch((error) => console.error("Error fetching home page blocks:", error));
    }, []);

    useEffect(() => {}, [blocks]);

    return (
        <div className="headed-layout">
            <div className="headed-layout--content">
                <BlockRenderer blocks={blocks} isVisible={isVisible} />
            </div>
        </div>
    );
};

export default HomePanel;

