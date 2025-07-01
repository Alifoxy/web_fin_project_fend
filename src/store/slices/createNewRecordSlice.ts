import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordService} from "../../services";
import {INewRecord} from "../../interfaces";

interface IState {
    newNewRecord: INewRecord|null,
    isNewError: boolean,
    isNewSuccess: boolean,
    isNewLoading: boolean,
    new_message: unknown|string
}

const initialState: IState = {
    newNewRecord:null,
    isNewError: false,
    isNewSuccess: false,
    isNewLoading: false,
    new_message:''
}

const createNew = createAsyncThunk<INewRecord, INewRecord>(
    'newSlice/createNewRecord',
    async (body, thunkAPI ) => {
        try {
            const {data} = await recordService.createNew(body);
            return data
        } catch (error:any) {
            const message =  error.message
            return thunkAPI.rejectWithValue(message)
        }
    }
);

const createNewRecordSlice = createSlice({
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
                state.new_message = 'Oops, something went wrong!';
            })
})

const {reducer: createNewReducer, actions} = createNewRecordSlice

export const { resetNew } = createNewRecordSlice.actions;

const createNewActions = {
    ...actions,
    createNew,
}

export {
    createNewReducer,
    createNewActions
}