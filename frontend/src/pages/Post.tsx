import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "@api";
import { MobilePageLayout, PageLayout } from "@global";
import { PostContent } from "@post";
import useIsMobile from '@/Hooks/IsMobile';
import { Post } from "@/types";

interface PostPageProps {
}

const PostPage: FC<PostPageProps> = () => {
    const { projectSlug, postSlug } = useParams<{ projectSlug: string; postSlug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const isMobile = useIsMobile();

    if(!projectSlug || !postSlug) {
        return <div>Post not found</div>;
    }

    useEffect(() => {
        getPost(projectSlug, postSlug)
            .then((data) => {
                setPost({
                    ...data.data,
                    previous_post: data.previous_post || null,
                    next_post: data.next_post || null,
                });
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
    }, [projectSlug, postSlug]);

    if (!post) {
        return <div>Loading...</div>;
    }

    if (isMobile) {
        return (
            <MobilePageLayout>
                <PostContent post={post} />
            </MobilePageLayout>
        )
    }

    return (
        <PageLayout>
            <PostContent post={post} />
        </PageLayout>
    );
};

export default PostPage;

