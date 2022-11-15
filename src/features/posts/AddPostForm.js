import { useEffect, useState } from "react";
//import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, submitPost, getSubmitPostStatus, setUsersDefault } from "../users/UsersSlice";
import { fetchUsers, setActionsSubmitPostStatusDefault } from "../users/UsersSlice";
import { Container, Box, TextField, 
            Button, InputLabel, MenuItem, 
            FormControl, Select, Backdrop, 
            CircularProgress } from "@mui/material";

const AddPostForm = () => {

    const dispatch = useDispatch();
    //const navigate = useNavigate();

    const users = useSelector(getUsers);
    const submitPostStatus = useSelector(getSubmitPostStatus);

    const [backdrop, setBackdrop] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postAuthorId, setPostAuthorId] = useState("");

    /***
     * UseEffect on initial component mount.
     */
    useEffect(() => {
        /***
         * Dispatch event for fetching the users on the database, to be inserted on the dropdown.
         */
        dispatch(fetchUsers());
        /***
         * Adding a return for unmount event of the component
         */
        return () => {
            /***
             * Adding a return statement to run functions when this component dismounted.
             * - Dispatch `setUsersDefault` is for setting the usersSlice `users` state back to empty.
             * - Dispatch `setActionsSubmitPostStatusDefault` for setting the `actions > submitPost > status` Users State back to "idle".
             */
            dispatch(setUsersDefault());
            dispatch(setActionsSubmitPostStatusDefault());
        }
    }, [dispatch]);

    /***
     * UseEffect that handles when the `actions > submitPost > status` Users State changed.
     */
    useEffect(() => {
        if (submitPostStatus === "submitting") {
            /***
             * Means that site is submitting the entry to the database, run the backdrop with loader and return.
             */
            return setBackdrop(true);
        }
        /***
         * The `submitPostStatus` is not equal to "submitting"
         */
        setBackdrop(false);
        if (submitPostStatus === "success") {
            /***
             * Means that the response from the backend is success, run an alert success message and clear all form states within this component.
             */
            setPostTitle("");
            setPostContent("");
            setPostAuthorId("");
            alert("post is successfully added to the database");
        } else if (submitPostStatus === "rejected") {
            /***
             * Means that the response from the backend is success, run an alert error message.
             */
            alert("there has been a problem submitting your post");
        }
    }, [submitPostStatus]);

    /***
     * Function that handles when the user submits a post
     */
    const handleAddPostFormSubmit = (e) => {
        e.preventDefault();
        if (postTitle && postContent && postAuthorId) {
            /***
             * Means all fields are filled out, prepare the data.
             */
            let data = {
                submitType: "add",
                title: postTitle,
                body: postContent,
                user_id: postAuthorId
            };
            /***
             * Dispatch event for submitting the post to the database.
             */
            dispatch(submitPost(data));
        } else {
            /***
             * Means that some fields are nort filled up, run an alert error message.
             */
            alert("missing fields are required!");
        }
    }

    return (
        <Container className="container post-form">
            <Box component="form" autoComplete="off" onSubmit={(e) => handleAddPostFormSubmit(e)}>
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
                <Button type="submit" variant="contained">Add Post</Button>
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

export default AddPostForm