import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordService} from "../../services";
import {IError, INewRecord} from "../../interfaces";

interface IState {
    newRecord: INewRecord|null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string|unknown
    error: IError|undefined
    body: string|unknown,
}

const initialState: IState = {
    newRecord:null,
    body:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:'',
    error: undefined
}

const createRecord = createAsyncThunk<INewRecord, INewRecord>(
    'recordSlice/createRecord',
    async (body, thunkAPI) => {
        try {
            const {data} = await recordService.createRecord(body);
            return data
        } catch (error:any) {
            const message =  error.message
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
);

const createRecordSlice = createSlice({
    name: 'recordSlice',
    initialState,
    reducers: {
        reset: (state) => {
            state.newRecord = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
            state.error= undefined;
        },
        setCli: (state, action) => {
            state.body = action.payload ;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(createRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.newRecord = action.payload;
                state.message = 'Record created successfully'
            })
            .addCase(createRecord.rejected, (state, action ) => {
                state.isLoading = false;
                state.isError = true
                state.message = action.payload;
                console.log(action.payload)
            })
})

const {reducer: createRecordReducer, actions} = createRecordSlice

export const { reset, setCli } = createRecordSlice.actions;

const createRecordActions = {
    ...actions,
    createRecord,
}

export {
    createRecordReducer,
    createRecordActions
}