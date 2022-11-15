import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, submitPost, getSubmitPostStatus, fetchUsers, setActionsSubmitPostStatusDefault, setUsersDefault } from "../users/UsersSlice";
import {
    Container, Box, TextField,
    Button, InputLabel, MenuItem,
    FormControl, Select, Backdrop,
    CircularProgress
} from "@mui/material";
import { fetchPostById, getPostsSelectedPosts, getPostsStatus, updateSelectedPostState } from "./PostsSlice";

const EditPostForm = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const users = useSelector(getUsers);
    const postStatus = useSelector(getPostsStatus);
    const post = useSelector(getPostsSelectedPosts);
    const submitPostStatus = useSelector(getSubmitPostStatus);

    const [backdrop, setBackdrop] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postAuthorId, setPostAuthorId] = useState("");

    useEffect(() => {
        /***
         * UseEffect hook for initialization of the component, constant variable `id` as the bench.
         * - dispatch `fetchUsers` fetches the users on the backend via api and save it on the redux global state.
         * - dispatch `fetchPostById` fetches the post on the backend via api and save it on the redux global state.
         */
        dispatch(fetchUsers());
        dispatch(fetchPostById(id));
        return () => {
            /***
             * Adding a return to this useEffect on the event of dismounting
             * - dispatch `setActionsSubmitPostStatusDefault` is for setting back the `actions > submit > postStatus` to the default value.
             * - dispatch `setUsersDefault` is for setting back the `users` state into it's default empty array value.
             */
            dispatch(setActionsSubmitPostStatusDefault());
            dispatch(setUsersDefault());
        }
    }, [id]);

    useEffect(() => {
        /***
         * useEffect for searching of the post on the database. We are using `postStatus` from `postsSlice` as bench.
         */
        if (postStatus === "searching") {
            /***
             * Means that the site is `searching` the post to the database.
             * - display the backdrop effect and loader.
             */
            return setBackdrop(true);
        } else if (postStatus === "fulfilled") {
            /***
             * Means that the site recieves success status from the backend.
             * - check if the received data on the backend is not empty, populate the inclusive sate of this component.
             */
            if (post !== null) {
                setPostTitle(post.title);
                setPostContent(post.body);
                setPostAuthorId(post.user_id);
            }
        }
        /***
         * Means that the site is done searching, remove the backdrop effect.
         */
        setBackdrop(false);
    }, [postStatus]);

    useEffect(() => {
        /***
         * useEffect for submitting or updating the post on the database, We are using `submitPostStatus` from `usersSlice` as bench.
         */
        if (submitPostStatus === "submitting") {
            /***
             * Means that the site is `submitting` the updated post to the database.
             */
            return setBackdrop(true);
        } else if (submitPostStatus === "success") {
            /***
             * Means that the post has been successfully updated on the backend
             * - dispatch `updateSelectedPostState` is just a reducer function on postSlice just to update the `selected_post` state, nothing to do with backed api.
             */
            let data = {
                id: Number(id),
                user_id: postAuthorId,
                title: postTitle,
                body: postContent,
            };
            dispatch(updateSelectedPostState(data));
            alert("successfully updated the post on the database");
        }
        /***
         * Means that the site is done with the process, remove the backdrop effect.
         */
        return setBackdrop(false);
    }, [submitPostStatus]);

    const handleEditPostFormSubmit = (e) => {
        e.preventDefault();
        if (postTitle && postContent && postAuthorId) {
            /***
             * Means all fields are filled out, prepare the data.
             */
            let data = {
                submitType: "update",
                post_id: id,
                title: postTitle,
                body: postContent,
                user_id: postAuthorId
            };
            /***
             * Dispatch event for submitting the post to the database.
             */
            dispatch(submitPost(data));
        } else {
            alert("There are required fields that has no value!");
        }
    }

    return (
        <Container className="container post-form">
            <Box component="form" autoComplete="off" onSubmit={(e) => handleEditPostFormSubmit(e)}>
                <TextField
                    className="field"
                    fullWidth
                    id="post-title"
                    label="Insert post title here"
                    variant="standard"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <FormControl variant="standard" fullWidth className="field">
                    <InputLabel id="post-author">Select author</InputLabel>
                    <Select
                        labelId="post-author"
                        label="Post Author"
                        value={postAuthorId}
                        onChange={(e) => setPostAuthorId(e.target.value)}
                    >
                        {users.map(user => {
                            return (
                                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <TextField
                    className="field textarea"
                    id="post-content"
                    label="Insert post content here"
                    multiline
                    fullWidth
                    variant="standard"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <Button type="submit" variant="contained">Edit Post</Button>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default EditPostForm