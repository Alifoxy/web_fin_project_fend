import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {recordService} from "../../services";
import {INewRecord} from "../../interfaces";

interface IState {
    newNewRecord: INewRecord|null,
    isNewError: boolean,
    isNewSuccess: boolean,
    isNewLoading: boolean,
    new_message: unknown|string

    // moviesByTitle:IMovie[],

}

const initialState: IState = {
    newNewRecord:null,
    isNewError: false,
    isNewSuccess: false,
    isNewLoading: false,
    new_message:''


}

// recordData:{client:{name: '', surname: '', email: '', phone: ''} , devices: [{model: '', equipment: '', break_info:'' }]}
// {client:{name: '', surname: '', email: '', phone: ''} , devices: [{model: '', equipment: '', break_info:'' }]}


const createNew = createAsyncThunk<INewRecord, INewRecord>(
    'newSlice/createNewRecord',
    async (body, thunkAPI ) => {
        try {
            const {data} = await recordService.createNew(body);
            return data// The resolved value will be the payload of the fulfilled action
        } catch (error:any) {
            const message =  error.message
            // Use the error message from the backend if available, otherwise a generic message
            return thunkAPI.rejectWithValue(message)

        }
    }
);


// const selectRecordState = (state:IState) => state;

const createNewSlice = createSlice({
    name: 'newSlice',
    initialState,
    reducers: {
        resetNew: (state) => {
            state.newNewRecord = null;
            state.isNewLoading = false;
            state.isNewSuccess = false;
            state.isNewError = false;
            state.new_message = '';
        },
    },
    extraReducers: builder =>
        builder
            .addCase(createNew.pending, (state) => {
                state.isNewLoading = true;
            })
            .addCase(createNew.fulfilled, (state, action) => {
                state.isNewLoading = false;
                state.isNewSuccess = true;
                state.newNewRecord = action.payload;
                state.new_message = 'New record created successfully!'
            })
            .addCase(createNew.rejected, (state, action) => {
                state.isNewLoading = false;
                state.isNewError = true;
                state.new_message = 'Oopsie, something went wrong!'; // The error message from thunkAPI.rejectWithValue
            })

    // .addCase(getMoviesByTitle.fulfilled, (state, action) => {
    //     const {results} = action.payload;
    //     state.moviesByTitle = results
    // })
    // .addMatcher(!isFulfilled(getMoviesByTitle), (state) => {
    //     state.error = 'Movies not found'
    // })


})

const {reducer: createNewReducer, actions} = createNewSlice

export const { resetNew } = createNewSlice.actions;

const createNewActions = {
    ...actions,
    createNew,
}


export {
    createNewReducer,
    createNewActions
}