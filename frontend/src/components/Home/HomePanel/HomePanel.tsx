import {FC, useEffect, useState} from "react";
import { getBlocks } from "@api"
import { BlockRenderer } from "@utils";
import {useLocation} from "react-router-dom";

interface HomePanelProps {}

const HomePanel: FC<HomePanelProps> = ({}) => {
    const { pathname } = useLocation();

    const [blocks, setBlocks] = useState<Block[]>([]);

    const isVisible = pathname === "/";

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

