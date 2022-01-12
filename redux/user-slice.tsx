import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../utils/structure";

const initialState: UserType = {
	name: "",
	userId: "",
	friends: [],
	isAuth: false,
};

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: () => initialState,
		setUserCredentials: (state: UserType, action: PayloadAction<UserType>) => {
			const { payload } = action;
			state.name = payload.name;
			state.userId = payload.userId;
			state.isAuth = payload.isAuth;
		},
	},
});

export const { setUserCredentials, reset } = UserSlice.actions;
export default UserSlice.reducer;
