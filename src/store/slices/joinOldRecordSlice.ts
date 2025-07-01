import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordService} from "../../services";
import {INewRecord} from "../../interfaces";

interface IState {
    newJoinRecord: INewRecord|null,
    isJoinError: boolean,
    isJoinSuccess: boolean,
    isJoinLoading: boolean,
    join_message: unknown|string
}

const initialState: IState = {
    newJoinRecord:null,
    isJoinError: false,
    isJoinSuccess: false,
    isJoinLoading: false,
    join_message:''
}

const joinOld = createAsyncThunk<INewRecord, INewRecord>(
    'joinOldSlice/joinOldRecord',
    async (body, thunkAPI ) => {
        try {
            const {data} = await recordService.joinOld(body);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

const joinOldRecordSlice = createSlice({
    name: 'joinOldSlice',
    initialState,
    reducers: {
        resetJoin: (state) => {
            state.newJoinRecord = null;
            state.isJoinLoading = false;
            state.isJoinSuccess = false;
            state.isJoinError = false;
            state.join_message = '';
        },
    },
    extraReducers: builder =>
        builder
            .addCase(joinOld.pending, (state) => {
                state.isJoinLoading = true;
            })
            .addCase(joinOld.fulfilled, (state, action) => {
                state.isJoinLoading = false;
                state.isJoinSuccess = true;
                state.newJoinRecord = action.payload;
                state.join_message = 'Record was joined successfully!'
            })
            .addCase(joinOld.rejected, (state, action) => {
                state.isJoinLoading = false;
                state.isJoinError = true;
                state.join_message = 'Oops, something went wrong!';
            })
})

const {reducer: joinOldReducer, actions} = joinOldRecordSlice

export const { resetJoin } = joinOldRecordSlice.actions;

const joinOldActions = {
    ...actions,
    joinOld,
}

export {
    joinOldReducer,
    joinOldActions
}