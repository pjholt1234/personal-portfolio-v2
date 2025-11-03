import { FC } from "react";
import { default as PostItem } from "./Post";
import styles from "./PostTableOfContents.module.scss";
import { Block, Post } from "@/types";

interface PostTableOfContentsProps extends Block {
    posts: Post[];
    project_slug?: string;
}

const PostTableOfContents: FC<PostTableOfContentsProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <ul className={styles['posts-list']}>
            {posts.map((post, index) => (
                <PostItem key={post.id || index} post={post} />
            ))}
        </ul>
    );
};

export default PostTableOfContents;

