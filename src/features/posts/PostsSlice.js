import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gorest from "../../apis/gorest";

/***
 * Initial State of Post Slice Reducer
 */
const initialState = {
    posts: [],
    status: "idle",
};

/***
 * Function for fetching posts via API
 */
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await gorest.get("posts", {
        params: {
            page: 1,
            per_page: 6
        }
    });
    return response.data;
});

/***
 * Post Slice Reducer
 */
const postsSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducer: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = "fulfilled";
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = "rejected";
        })
    }
});

/***
 * State fetchers
 */
export const getPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;

export default postsSlice.reducer;