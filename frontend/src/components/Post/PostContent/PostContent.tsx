import { FC } from "react";
import { BlockRenderer } from "@utils";
import { mergeClassNames } from "@helpers";
import styles from "./PostContent.module.scss";
import { Typography, PrefetchLink } from "@shared-ui";
import { Post } from "@/types";

interface PostContentProps {
    post: Post;
}

const PostContent: FC<PostContentProps> = ({ post }) => {

    const renderDate = () => {
        if (post.published_at) {
            return new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return null;
    }

    const renderNavigation = () => {
        if (!post.previous_post && !post.next_post) {
            return null;
        }

        return (
            <div className={styles['navigation']}>
                {post.previous_post && (
                    <PrefetchLink
                        to={`/projects/${post.project_slug}/posts/${post.previous_post.slug}`}
                        className={styles['nav-button']}
                    >
                        <Typography component="span" className={styles['nav-button__label']}>Previous</Typography>
                    </PrefetchLink>
                )}
                {post.next_post && (
                    <PrefetchLink
                        to={`/projects/${post.project_slug}/posts/${post.next_post.slug}`}
                        className={mergeClassNames(styles['nav-button'], styles['nav-button--next'])}
                    >
                        <Typography component="span" className={styles['nav-button__label']}>Next</Typography>
                    </PrefetchLink>
                )}
            </div>
        );
    }

    return (
        <div className="headed-layout">
            <div className={mergeClassNames("headed-layout__header")}>
                <div>
                    <div className={styles['header--container']}>
                        <Typography component="h2" className="headed-layout__header--title">{post.title}</Typography>
                    </div>
                    {post.excerpt && (
                        <div className={styles['header--container']}>
                            <Typography component="p" className="headed-layout__header--subtitle">{post.excerpt}</Typography>
                        </div>
                    )}
                    {post.published_at && (
                        <div className={styles['header--container']}>
                            <Typography component="p" className="headed-layout__header--date">{renderDate()}</Typography>
                        </div>
                    )}
                </div>
            </div>
            <div className="headed-layout--content">
                <BlockRenderer blocks={post.blocks || []} />
                {renderNavigation()}
            </div>
        </div>
    );
};

export default PostContent;

