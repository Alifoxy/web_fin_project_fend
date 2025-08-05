import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordService} from "../../services";
import {IRecordDetails, IRecords} from "../../interfaces";

interface IState {
    records: IRecordDetails[],
    recordById: IRecordDetails|null,
    total:number,
    current_page:number,
}

const initialState: IState = {
    records: [],
    recordById: null,
    total: 0,
    current_page:0,
}

const getAllRecords = createAsyncThunk<IRecords, {page:string|undefined}>(
    'recordSlice/getAll',
    async ({page},thunkAPI) => {
        try {
            const {data} = await recordService.getAll(page);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
const getById = createAsyncThunk<IRecordDetails, {id:string}>(
    'recordSlice/getRecordById',
    async ({id}, thunkAPI) => {
        try {
            const {data} = await recordService.getById(id);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const getRecordsByNumber = createAsyncThunk<IRecords, {rec_num:string|undefined}>(
    'recordSlice/getByNumber',
    async ({rec_num}, thunkAPI) => {
        try {
            const {data} = await recordService.getRecordsByNumber(rec_num);
            return data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const selectRecordState = (state:any) => state;

const recordSlice = createSlice({
    name: 'recordSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllRecords.fulfilled, (state, action) => {
                const {page, data, total} = action.payload;
                state.current_page = +page
                state.records = data;
                state.total = total;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.recordById = action.payload
            })
            .addCase(getRecordsByNumber.fulfilled, (state, action) => {
                const {data} = action.payload;
                state.records = data
        })
})

const {reducer: recordsReducer, actions} = recordSlice

const recordsActions = {
    ...actions,
    selectRecordState,
    getAllRecords,
    getById,
    getRecordsByNumber,
}

export {
    recordsReducer,
    recordsActions
}