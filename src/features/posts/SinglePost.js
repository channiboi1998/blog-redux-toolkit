import { useDispatch, useSelector } from "react-redux";
import { getPostsSelectedPosts, setSelectedPostDefault } from "./PostsSlice";
import { Container, Skeleton, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById } from "./PostsSlice";
import { useEffect } from "react";
import { getPostsStatus } from "./PostsSlice";
import { Link } from "react-router-dom";
import { fetchUserDetailsById, getSelectedUserDetails, getSubmitPostStatus, getUsersStatus, setActionsSubmitPostStatusDefault, setSelectedUserDefault, submitPost } from "../users/UsersSlice";

const SinglePost = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postsStatus = useSelector(getPostsStatus);
    const usersStatus = useSelector(getUsersStatus);
    const submitStatus = useSelector(getSubmitPostStatus);
    const selectedPost = useSelector(getPostsSelectedPosts);
    const selectedUser = useSelector(getSelectedUserDetails);

    useEffect(() => {
        /***
         * useEffect hook for the initialization of this component.
         * - dispatch `fetchPostById` is for fetching the post on the backend, given the supplied `id` on the url.
         */
        dispatch(fetchPostById(id));
        dispatch(fetchUserDetailsById(id));
        return () => {
            /***
             * Adding this return statement for the unmounting event of this component.
             * - dispatch `setSelectedPostDefault` is for setting back the `selected post` state on `postSlice` back to null or empty as by default.
             * - dispatch `setSelectedUserDefault` is for setting back the `selected user` state on `userSlice` back to null or empty as by default. 
             */
            dispatch(setSelectedPostDefault());
            dispatch(setSelectedUserDefault());
            dispatch(setActionsSubmitPostStatusDefault())
        }
    }, [dispatch, id]);

    const handleDeletePost = (id) => {
        let data = {
            submitType: "delete",
            id: id,
        };
        dispatch(submitPost(data));
    }

    useEffect(() => {
        if (submitStatus === "submitting") {
        } else if (submitStatus === "success") {
            alert("Post #" + id + " has been successfuly deleted on the database.");
            navigate("/");
        } else if (submitStatus === "rejected") {
            alert("There has been an issue processing your request, try again later.");
        }
    }, [submitStatus]);

    if (postsStatus === "searching" || usersStatus === "finding_user") {
        return (
            <Container>
                <Typography gutterBottom variant="h2" component="h2">
                    <Skeleton />
                </Typography>
                <Typography gutterBottom variant="h5" component="h5">
                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ paddingTop: '200px' }} />
                    </Skeleton>
                </Typography>
            </Container>
        )
    } else if (postsStatus === "fulfilled" && usersStatus === "fulfilled" && selectedPost !== null && selectedUser !== null) {
        return (
            <Container>
                <Typography gutterBottom variant="h2" component="h2">
                    {selectedPost.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h5">
                    {selectedUser.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    {selectedPost.body}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    <Link to={"edit"}>Edit</Link> <Link onClick={() => handleDeletePost(selectedPost.id)}>Delete</Link>
                </Typography>
            </Container>
        )
    } else if (selectedPost === null) {
        return (
            <Container>
                <Typography gutterBottom variant="h2" component="h2">
                    We cannot find what you are looking for.
                </Typography>
                <Typography gutterBottom variant="h5" component="h5">
                    The post might have been deleted by the site owner.
                </Typography>
            </Container>
        )
    }

}

export default SinglePost