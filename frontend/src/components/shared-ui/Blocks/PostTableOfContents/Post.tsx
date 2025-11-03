import { FC } from "react";
import { PrefetchLink, Typography } from "@shared-ui";
import styles from "./PostTableOfContents.module.scss";
import { Post } from "@/types";

interface PostProps {
    post: Post;
}

const PostItem: FC<PostProps> = ({ post }) => {
    const formatDate = (dateString?: string): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formattedDate = formatDate(post.published_at);
    const displayText = formattedDate ? `${formattedDate} - ${post.title}` : post.title;

    return (
        <li className={styles['post-item']}>
            <PrefetchLink
                to={`/projects/${post.project_slug}/posts/${post.slug}`}
                className={styles['post-link']}
            >
                <Typography component="span">{displayText}</Typography>
            </PrefetchLink>
        </li>
    );
};

export default PostItem;

