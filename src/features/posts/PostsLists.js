import { useEffect } from "react";
import { Container } from "@mui/material";
import PostListEntry from "./PostListEntry";
import { useSelector } from "react-redux";
import { getPosts } from "./PostsSlice";

const PostsLists = () => {

    const posts = useSelector(getPosts);
    
    return (
        <Container className="container postslist">
            {posts.map(post => {
                return (
                    <PostListEntry key={post.id} post={post} />
                )
            })}
        </Container>
    )
}

export default PostsLists