import PostsLists from "./features/posts/PostsLists";
import { Routes, Route } from "react-router-dom";
import Layout from "./templates/Layout";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePost from "./features/posts/SinglePost";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUsersStatus } from "./features/users/UsersSlice";
import { fetchPosts, getPostsStatus } from "./features/posts/PostsSlice";

function App() {

    const dispatch = useDispatch();

    const usersStatus = useSelector(getUsersStatus);
    const postsStatus = useSelector(getPostsStatus);

    useEffect(() => {
        if (postsStatus === "idle" || usersStatus === "idle") {
            dispatch(fetchUsers());
            dispatch(fetchPosts());
        }
    }, []);


    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsLists />}></Route>
                <Route path="post">
                    <Route index element={<AddPostForm />}></Route>
                    <Route path=":id" element={<SinglePost />}></Route>
                </Route>
            </Route>
        </Routes>
    );

}

export default App;