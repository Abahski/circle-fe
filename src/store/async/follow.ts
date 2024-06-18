import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFollowings } from "../../lib/api/call/folllow";

export const getFollowingById = createAsyncThunk(
    "follow/getFollowingById",
    async () => {
        try {
            const {data} = await getFollowings()

            return data.data
        } catch (error) {
            console.log(error);
            
        }
    }
)