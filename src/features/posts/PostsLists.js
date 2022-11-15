import { useEffect } from "react";
import { Container } from "@mui/material";
import PostListEntry from "./PostListEntry";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, setPostsDefault } from "./PostsSlice";
import { fetchPosts } from "./PostsSlice";
import { fetchUsers, setUsersDefault } from "../users/UsersSlice";

const PostsLists = () => {

    const dispatch = useDispatch();
    
    const posts = useSelector(getPosts);

    useEffect(() => {
        /***
         * useEffect hook for the initialization of this component, using `dispatch` as bench.
         * - dispatch `fetchUsers` is for fetching the updated list of users on the backend and save it on the state.
         * - dispatch `fetchPosts` is for fetching the updated list of post on the backend and save it on the state.
         */
        dispatch(fetchUsers());
        dispatch(fetchPosts());
        return () => {
            /***
             * Adding a return statement for the event that this component dismounted.
             * - dispatch `setUsersDefault` is for setting back the users back to empty array.
             * - dispatch `setPostsDefault` is for setting back the posts back to empty array.
             */
            dispatch(setUsersDefault());
            dispatch(setPostsDefault());
        }
    }, [dispatch]);

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