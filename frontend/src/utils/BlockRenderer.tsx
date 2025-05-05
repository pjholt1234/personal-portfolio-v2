import { BlockTypes } from "@enums";
import {FC} from "react";
import {Text, Card, AnimatedCard, Snippet, Image, Set, Gallery, Projects, Typography} from "@shared-ui";

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
                return <Set eyebrow={block.eyebrow} type={block.type} set={block.set} pills={block.pills} />;
            case BlockTypes.IMAGE:
                return <Image eyebrow={block.eyebrow} type={block.type} image={block.image} />;
            case BlockTypes.GALLERY:
                return <Gallery eyebrow={block.eyebrow} type={block.type} images={block.images} autoScroll={true} />;
            case BlockTypes.PROJECTS:
                return <Projects eyebrow={block.eyebrow} type={block.type} projects={block.projects} />;
            default:
                console.error(`Unknown block type: ${block.type}`);
                return null;
        }
    }

    return blocks.map((block, index) => (
        <AnimatedCard index={index} isVisible={isVisible} key={index}>
            <Card>
                {block.eyebrow && <Typography component="h3">{block.eyebrow}</Typography>}
                {renderBlock(block)}
            </Card>
        </AnimatedCard>
    ));
}

export default BlockRenderer;