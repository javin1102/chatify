import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserType {
  name: string | undefined | null;
  userId: string;
  friends?: [];
}
const initialState: UserType = {
  name: "",
  userId: "",
  friends: [],
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
    },
  },
});

export const { setUserCredentials, reset } = UserSlice.actions;
export default UserSlice.reducer;
