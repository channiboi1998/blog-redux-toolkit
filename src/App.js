import { Routes, Route } from "react-router-dom";
import Layout from "./templates/Layout";
import PostsLists from "./features/posts/PostsLists";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePost from "./features/posts/SinglePost";
import EditPostForm from "./features/posts/EditPostForm";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsLists />}></Route>
                <Route path="post">
                    <Route index element={<AddPostForm />}></Route>
                    <Route path=":id" element={<SinglePost />}></Route>
                    <Route path=":id/edit" element={<EditPostForm />}></Route>
                </Route>
            </Route>
        </Routes>
    );

}

export default App;