import gorest from "../../apis/gorest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selected_user: null,
    status: "idle",
    actions: {
        submitPost: {
            status: "idle"
        }
    }
};

/***
 * Function for fetching a specific user
 */
export const fetchUserDetailsById = createAsyncThunk("users/fetchUserDetailsById", async (id) => {
    const response = await gorest.get("users/" + id);
    return response.data;
});


/***
 * Function for fetching users on the apis database.
 */
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await gorest.get("users/");
    return response.data;
});

/***
 * Function for posting post on the API.
 */
export const submitPost = createAsyncThunk("posts/submitPost", async (data) => {
    let response;
    if (data.submitType === "update") {
        response = await gorest.put("posts/" + data.post_id, {
            title: data.title,
            body: data.body,
            user_id: data.user_id
        });
    } else if (data.submitType === "add") {
        response = await gorest.post("users/" + data.user_id + "/posts", {
            title: data.title,
            body: data.body
        });
    } else if (data.submitType === "delete") {
        response = await gorest.delete("posts/" + data.id);
    }
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setSelectedUserDefault(state) {
            state.selected_user = null;
        },
        setUsersDefault(state) {
            state.users = [];
        },
        setActionsSubmitPostStatusDefault(state) {
            /***
             * reducer for setting back the `state > actions > submitPost > status` users state to idle.
             */
            state.actions.submitPost.status = "idle";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            /***
             * Fires when `fetchUsers` method is pending
             * - Set the state's status to `pending`.
             */
            state.status = "pending";
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                /***
                 * Fires when `fetchUsers` method is success or fulfilled.
                 * - Update the `users` state from the response of the backend- database.
                 * - Update the state's status to `fulfilled`.
                 */
                state.users = action.payload;
                state.status = "fulfilled";
            })
            .addCase(fetchUsers.rejected, (state) => {
                /***
                 * Fires when `fetchUsers` method is rejected or failed.
                 * - Update the state's status to `rejected`.
                 */
                state.status = "rejected";
            })
            .addCase(fetchUserDetailsById.pending, (state) => {
                state.status = "finding_user";
            })
            .addCase(fetchUserDetailsById.fulfilled, (state, action) => {
                state.selected_user = action.payload;
                state.status = "fulfilled";
            })
            .addCase(fetchUserDetailsById.rejected, (state) => {
                state.status = "rejected";
            })
            .addCase(submitPost.pending, (state) => {
                state.actions.submitPost.status = "submitting";
            })
            .addCase(submitPost.fulfilled, (state) => {
                state.actions.submitPost.status = "success";
            })
            .addCase(submitPost.rejected, (state) => {
                state.action.submitPost.status = "rejected";
            })
    }
});

/***
 * The reducers functions inside slice.
 */
export const { setSelectedUserDefault, setUsersDefault, setActionsSubmitPostStatusDefault } = usersSlice.actions;

/***
 * State fetchers and/or functions.
 */
export const getUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getSubmitPostStatus = (state) => state.users.actions.submitPost.status;
export const getSelectedUserDetails = (state) => state.users.selected_user;
export const getUserNameById = (id) => (state) => {
    let user = state.users.users.find(user => user.id === id);
    if (user) {
        return user.name;
    }
    return "";
}

export default usersSlice.reducer;