import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordService} from "../../services";
import {IError, INewRecord, IRecordDetails} from "../../interfaces";

interface IState {
    newRecord: IRecordDetails|null,
    isError: boolean,
    isNewError: boolean,
    isJoinError: boolean,
    isSuccess: boolean,
    isNewSuccess: boolean,
    isJoinSuccess: boolean,
    isLoading: boolean,
    message: string|unknown,
    new_message: string|unknown,
    join_message: string|unknown,
    error: IError|undefined
    body: IRecordDetails|null,
}

const initialState: IState = {
    newRecord:null,
    body:null,
    isError: false,
    isNewError: false,
    isJoinError: false,
    isSuccess: false,
    isNewSuccess: false,
    isJoinSuccess: false,
    isLoading: false,
    message:'',
    new_message:'',
    join_message:'',
    error: undefined
}

const createRecord = createAsyncThunk<IRecordDetails, INewRecord>(
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

const createNew = createAsyncThunk<IRecordDetails, INewRecord>(
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

const joinOld = createAsyncThunk<IRecordDetails, INewRecord>(
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

const createRecordSlice = createSlice({
    name: 'recordSlice',
    initialState,
    reducers: {
        resetCR: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isNewSuccess = false;
            state.isJoinSuccess = false;
            state.isError = false;
            state.isNewError = false;
            state.isJoinError = false;
            state.message = '';
            state.new_message= '';
            state.join_message= '';
            state.error= undefined;
        },
        setCli: (state, action) => {
            state.body = action.payload ;
        },
        resetRec: (state) => {
            state.newRecord = null;
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
            .addCase(createNew.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNew.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isNewSuccess = true;
                state.newRecord = action.payload;
                console.log(state.newRecord)
                state.new_message = 'New record created successfully!'
            })
            .addCase(createNew.rejected, (state, action) => {
                state.isLoading = false;
                state.isNewError = true;
                state.new_message = 'Oops, something went wrong!';
            })
            .addCase(joinOld.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(joinOld.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isJoinSuccess = true;
                state.newRecord = action.payload;
                state.join_message = 'Record was joined successfully!'
            })
            .addCase(joinOld.rejected, (state, action) => {
                state.isLoading = false;
                state.isJoinError = true;
                state.join_message = 'Oops, something went wrong!';
            })
})

const {reducer: createRecordReducer, actions} = createRecordSlice

export const { resetCR, setCli, resetRec } = createRecordSlice.actions;

const createRecordActions = {
    ...actions,
    createRecord,
    createNew,
    joinOld,
}

export {
    createRecordReducer,
    createRecordActions
}