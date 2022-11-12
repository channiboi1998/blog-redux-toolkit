import gorest from "../../apis/gorest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await gorest.get("users/");
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = "fulfilled";
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = "rejected";
        })
    }
});


export const getUsersStatus = (state) => state.users.status;

export const getUserNameById = (id) => (state) => {
    let user = state.users.users.find(user => user.id === id);
    if (user) {
        return user.name;
    }
    return "Unknown Author";
}


export default usersSlice.reducer;