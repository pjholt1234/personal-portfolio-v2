import {BlockTypes} from "@/enums/BlockTypes";
import {FC} from "react";
import Text from "@components/shared-ui/Blocks/Text/Text";
import Card from "@components/shared-ui/Card/Card";
import AnimatedCard from "@components/shared-ui/AnimatedCard/AnimatedCard";
import Snippet from "@components/shared-ui/Blocks/Snippet/Snippet";
import Image from "@components/shared-ui/Blocks/Image/Image";
import Set from "@components/shared-ui/Blocks/Set/Set";
import Gallery from "@components/shared-ui/Blocks/Gallery/Gallery";

interface BlockRendererProps {
    blocks: Block[]
    isVisible?: boolean
}

const BlockRenderer:FC<BlockRendererProps> = ({ blocks, isVisible = true }) => {
    if (!blocks || blocks.length === 0) {
        return null;
    }

    const renderBlock = (block: any) => {
        switch (block.type) {
            case BlockTypes.TEXT:
                return <Text eyebrow={block.eyebrow} type={block.type} content={block.content} />;
            case BlockTypes.SNIPPET:
                return <Snippet eyebrow={block.eyebrow} type={block.type} content={block.content} />;
            case BlockTypes.SET:
                return <Set eyebrow={block.eyebrow} type={block.type} set={block.set} pills={block.pills}/>;
            case BlockTypes.IMAGE:
                return <Image eyebrow={block.eyebrow} type={block.type} image={block.image} />;
            case BlockTypes.GALLERY:
                return <Gallery eyebrow={block.eyebrow} type={block.type} images={block.images} autoScroll={true}/>;
            default:
                console.error(`Unknown block type: ${block.type}`);
                return null;
        }
    }

    return blocks.map((block, index) => (
        <AnimatedCard index={index} isVisible={isVisible} key={index}>
            <Card>
                {renderBlock(block)}
            </Card>
        </AnimatedCard>
    ));
}

export default BlockRenderer;