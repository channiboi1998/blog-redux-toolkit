import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gorest from "../../apis/gorest";

/***
 * Initial State of Post Slice Reducer.
 */
const initialState = {
    posts: [],
    status: "idle",
    selected_post: null,
};

/***
 * Function for fetching posts via API.
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
 * Function for fetching a single post by id on the apis database.
 */
export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (id) => {
    const response = await gorest.get("posts", {
        params: {
            id: id
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
    reducers: {
        updateSelectedPostState(state, action) {
            state.selected_post = action.payload
        },
        setPostsDefault(state) {
            state.posts = [];
        },
        setSelectedPostDefault(state) {
            state.selected_post = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            /***
             * Fires when the `fetchPosts` function is pending.
             * - Set state status to `pending`.
             */
            state.status = "pending";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            /***
             * Fires when the `fetchPosts` function is fulfilled.
             * - Mutate the `posts` state.
             */
            state.posts = action.payload;
            state.status = "fulfilled";
        })
        .addCase(fetchPosts.rejected, (state) => {
            /***
             * Fires when the `fetchPosts` function is rejected.
             * - Set state status to `rejected`.
             */
            state.status = "rejected";
        })
        .addCase(fetchPostById.pending, (state) => {
            /***
             * Fires when the `fetchPostById` function is pending.
             * - Set selected_post to `null` and the status to `searching`.
             */
            state.selected_post = null;
            state.status = "searching";
        })
        .addCase(fetchPostById.fulfilled, (state, action) => {
            /***
             * Fires when the `fetchPostById` function is fulfilled.
             * - Update the state status to `fulfilled`.
             */
            if (action.payload.length !== 0) {
                /***
                 * Means that the result from the backend is not empty.
                 * - Set `selected_post` state to the first object in array response from the backend.
                 */
                state.selected_post = action.payload[0];
            }
            state.status = "fulfilled";
        })
    }
});

/***
 * Slice Reducer Actions
 */
export const { updateSelectedPostState, setPostsDefault, setSelectedPostDefault } = postsSlice.actions;

/***
 * State fetchers and/or functions.
 */
export const getPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsSelectedPosts = (state) => state.posts.selected_post;

export default postsSlice.reducer;