import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {recordService} from "../../services";
import {INewRecord} from "../../interfaces";

interface IState {
    newJoinRecord: INewRecord|null,
    isJoinError: boolean,
    isJoinSuccess: boolean,
    isJoinLoading: boolean,
    join_message: unknown|string

    // moviesByTitle:IMovie[],

}

const initialState: IState = {
    newJoinRecord:null,
    isJoinError: false,
    isJoinSuccess: false,
    isJoinLoading: false,
    join_message:''


}

// recordData:{client:{name: '', surname: '', email: '', phone: ''} , devices: [{model: '', equipment: '', break_info:'' }]}
// {client:{name: '', surname: '', email: '', phone: ''} , devices: [{model: '', equipment: '', break_info:'' }]}


const joinOld = createAsyncThunk<INewRecord, INewRecord>(
    'joinOldSlice/joinOldRecord',
    async (body, thunkAPI ) => {
        try {
            const {data} = await recordService.joinOld(body);
            return data// The resolved value will be the payload of the fulfilled action
        } catch (error:any) {
            // Use the error message from the backend if available, otherwise a generic message
            return thunkAPI.rejectWithValue(error.response.data)

        }
    }
);


// const selectRecordState = (state:IState) => state;

const joinOldSlice = createSlice({
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
                state.join_message = 'Oopsie, something went wrong!'; // The error message from thunkAPI.rejectWithValue
            })

    // .addCase(getMoviesByTitle.fulfilled, (state, action) => {
    //     const {results} = action.payload;
    //     state.moviesByTitle = results
    // })
    // .addMatcher(!isFulfilled(getMoviesByTitle), (state) => {
    //     state.error = 'Movies not found'
    // })


})

const {reducer: joinOldReducer, actions} = joinOldSlice

export const { resetJoin } = joinOldSlice.actions;

const joinOldActions = {
    ...actions,
    joinOld,
}


export {
    joinOldReducer,
    joinOldActions
}